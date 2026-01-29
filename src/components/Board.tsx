import React from 'react';
import type { Board as BoardType } from '../utils/sudoku';

interface BoardProps {
    board: BoardType;
    initialBoard: BoardType;
    selectedCell: [number, number] | null;
    onCellClick: (row: number, col: number) => void;
    errorCells: boolean[][];
}

const Board: React.FC<BoardProps> = ({ board, initialBoard, selectedCell, onCellClick, errorCells }) => {
    return (
        <div
            className="glass-panel"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 1fr)',
                gap: '2px', // gap between cells
                padding: '10px',
                maxWidth: '500px',
                width: '100%',
                aspectRatio: '1',
                margin: '20px auto',
                userSelect: 'none',
            }}
        >
            {board.map((row, rIndex) =>
                row.map((cell, cIndex) => {
                    const isInitial = initialBoard[rIndex][cIndex] !== 0;
                    const isSelected = selectedCell?.[0] === rIndex && selectedCell?.[1] === cIndex;

                    // Check for related cells (same row, col, or box) for highlighting
                    const isRelated = selectedCell && (
                        selectedCell[0] === rIndex ||
                        selectedCell[1] === cIndex ||
                        (Math.floor(selectedCell[0] / 3) === Math.floor(rIndex / 3) &&
                            Math.floor(selectedCell[1] / 3) === Math.floor(cIndex / 3))
                    );

                    const isSameNumber = selectedCell && board[selectedCell[0]][selectedCell[1]] !== 0 && board[selectedCell[0]][selectedCell[1]] === cell;
                    const isError = errorCells[rIndex][cIndex];

                    let bg = 'var(--cell-bg)';
                    if (isSelected) bg = 'var(--cell-bg-selected)';
                    else if (isError) bg = 'rgba(255, 0, 0, 0.2)'; // Fallback error
                    else if (isSameNumber) bg = 'var(--cell-bg-highlight)';
                    else if (isRelated) bg = 'rgba(255, 255, 255, 0.4)'; // Subtle highlight for related

                    // Thicker borders for 3x3 boxes


                    return (
                        <div
                            key={`${rIndex}-${cIndex}`}
                            onClick={() => onCellClick(rIndex, cIndex)}
                            style={{
                                background: bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                                fontWeight: isInitial ? 700 : 500,
                                color: isError ? 'var(--cell-text-error)' : (isInitial ? 'var(--cell-text-given)' : 'var(--cell-text-user)'),
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.1s ease',
                                marginRight: (cIndex + 1) % 3 === 0 && cIndex !== 8 ? '4px' : '0',
                                marginBottom: (rIndex + 1) % 3 === 0 && rIndex !== 8 ? '4px' : '0',
                                boxShadow: isSelected ? 'inset 0 0 0 2px var(--primary)' : 'none',
                            }}
                        >
                            {cell !== 0 ? cell : ''}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Board;
