import { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import Header from './components/Header';
import { generateSudoku, copyBoard } from './utils/sudoku';
import type { Board as BoardType, Difficulty } from './utils/sudoku';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [board, setBoard] = useState<BoardType>([]);
  const [initialBoard, setInitialBoard] = useState<BoardType>([]);
  const [solution, setSolution] = useState<BoardType>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [history, setHistory] = useState<BoardType[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize errored cells state (visual feedback)
  const [errorCells, setErrorCells] = useState<boolean[][]>(
    Array(9).fill(null).map(() => Array(9).fill(false))
  );

  const startNewGame = useCallback((diff: Difficulty = difficulty) => {
    const { initial, solution: solved } = generateSudoku(diff);
    setBoard(copyBoard(initial));
    setInitialBoard(copyBoard(initial));
    setSolution(solved);
    setMistakes(0);
    setTimer(0);
    setIsGameActive(true);
    setHistory([]);
    setErrorCells(Array(9).fill(null).map(() => Array(9).fill(false)));
  }, [difficulty]);

  useEffect(() => {
    startNewGame();
  }, []); // Initial load

  useEffect(() => {
    let interval: any;
    if (isGameActive) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || !isGameActive) return;
    const [r, c] = selectedCell;

    // Cannot modify initial cells
    if (initialBoard[r][c] !== 0) return;

    // Save functionality for undo
    setHistory(prev => [...prev.slice(-20), copyBoard(board)]); // Keep last 20 moves

    const newBoard = copyBoard(board);
    newBoard[r][c] = num;
    setBoard(newBoard);

    // Validate move immediately against solution
    if (newBoard[r][c] !== solution[r][c]) {
      setMistakes(m => m + 1);
      const newErrors = errorCells.map(row => [...row]);
      newErrors[r][c] = true;
      setErrorCells(newErrors);

      // Auto-clear error after 1 second for better UX? Or keep it?
      // Let's keep it until they change it.
    } else {
      // Clear error if correct
      if (errorCells[r][c]) {
        const newErrors = errorCells.map(row => [...row]);
        newErrors[r][c] = false;
        setErrorCells(newErrors);
      }

      // Check win condition
      checkWin(newBoard);
    }
  };

  const handleDelete = () => {
    if (!selectedCell || !isGameActive) return;
    const [r, c] = selectedCell;
    if (initialBoard[r][c] !== 0) return;

    setHistory(prev => [...prev, copyBoard(board)]);

    const newBoard = copyBoard(board);
    newBoard[r][c] = 0;
    setBoard(newBoard);

    // Clear error
    const newErrors = errorCells.map(row => [...row]);
    newErrors[r][c] = false;
    setErrorCells(newErrors);
  };

  const handleUndo = () => {
    if (history.length === 0 || !isGameActive) return;
    const previousBoard = history[history.length - 1];
    setBoard(previousBoard);
    setHistory(prev => prev.slice(0, -1));
  };

  const handleSolve = () => {
    if (!isGameActive) return;
    setBoard(copyBoard(solution));
    setIsGameActive(false); // Game over (solved by computer)
  };

  const checkWin = (currentBoard: BoardType) => {
    // Simple check: no zeros and consistent with solution
    let isFull = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentBoard[r][c] === 0) {
          isFull = false;
          break;
        }
      }
    }

    if (isFull) {
      // Double check correctness
      let isCorrect = true;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (currentBoard[r][c] !== solution[r][c]) {
            isCorrect = false;
            break;
          }
        }
      }

      if (isCorrect) {
        setIsGameActive(false);
        alert(`You Won! Time: ${Math.floor(timer / 60)}m ${timer % 60}s`);
      }
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGameActive) return;

      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleDelete();
      } else if (e.key === 'ArrowUp') {
        setSelectedCell(prev => prev ? [Math.max(0, prev[0] - 1), prev[1]] : [0, 0]);
      } else if (e.key === 'ArrowDown') {
        setSelectedCell(prev => prev ? [Math.min(8, prev[0] + 1), prev[1]] : [0, 0]);
      } else if (e.key === 'ArrowLeft') {
        setSelectedCell(prev => prev ? [prev[0], Math.max(0, prev[1] - 1)] : [0, 0]);
      } else if (e.key === 'ArrowRight') {
        setSelectedCell(prev => prev ? [prev[0], Math.min(8, prev[1] + 1)] : [0, 0]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameActive, selectedCell, board]); // dependencies for closure freshness

  if (board.length === 0) return <div className="fade-in">Loading...</div>;

  return (
    <div className="fade-in">
      <Header
        difficulty={difficulty}
        onDifficultyChange={(d) => { setDifficulty(d); startNewGame(d); }}
        timer={timer}
        mistakes={mistakes}
        theme={theme}
        toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      />

      <Board
        board={board}
        initialBoard={initialBoard}
        selectedCell={selectedCell}
        onCellClick={handleCellClick}
        errorCells={errorCells}
      />

      <Controls
        onNumberClick={handleNumberInput}
        onDelete={handleDelete}
        onUndo={handleUndo}
        onNewGame={() => startNewGame()}
        onSolve={handleSolve}
      />
    </div>
  );
}

export default App;
