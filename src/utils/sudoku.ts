// Sudoku Logic Utilities

export type Board = number[][];
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

const BLANK = 0;

/**
 * Checks if a move is valid in the given board.
 */
export function isValidMove(board: Board, row: number, col: number, num: number): boolean {
    // Check Row
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
    }

    // Check Column
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false;
    }

    // Check 3x3 Box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }

    return true;
}

/**
 * Solves the board using backtracking.
 * Returns true if solvable, false otherwise.
 * Modifies the board in-place.
 */
export function solveSudoku(board: Board): boolean {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === BLANK) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = BLANK;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

/**
 * Generates a full valid Sudoku board.
 */
function generateFullBoard(): Board {
    const board = Array.from({ length: 9 }, () => Array(9).fill(BLANK));
    solveSudoku(board); // Since it's empty, solve will fill it validly
    // Shuffle rows/cols/numbers to randomize, or use a randomized solver. 
    // Simple randomized solver approach:
    const randomFill = (b: Board): boolean => {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (b[r][c] === BLANK) {
                    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                    for (const n of nums) {
                        if (isValidMove(b, r, c, n)) {
                            b[r][c] = n;
                            if (randomFill(b)) return true;
                            b[r][c] = BLANK;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    const newBoard = Array.from({ length: 9 }, () => Array(9).fill(BLANK));
    randomFill(newBoard);
    return newBoard;
}

/**
 * Generates a new puzzle based on difficulty.
 * Returns { initial, solution }
 */
export function generateSudoku(difficulty: Difficulty): { initial: Board, solution: Board } {
    const solution = generateFullBoard();
    // Clone solution to create initial puzzle state
    const initial = solution.map(row => [...row]);

    let attempts = difficulty === 'Easy' ? 30 : difficulty === 'Medium' ? 45 : 55;
    // This is a naive removal strategy. Real Sudoku generators ensure unique solutions.
    // For this app, we'll keep it simple but functional.

    while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        while (initial[row][col] === 0) {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        }

        initial[row][col] = BLANK;

        // Ideally we check if solution is still unique here, but skipping for performance in this demo
        // If we wanted to ensure unique solution, we'd run a solver that counts solutions.

        attempts--;
    }

    return { initial, solution };
}

export function copyBoard(board: Board): Board {
    return board.map(row => [...row]);
}
