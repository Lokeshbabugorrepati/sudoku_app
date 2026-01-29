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
                padding: '2px', // Slight padding for outer border
                background: 'var(--grid-border)',
                gap: '1px',
                width: '100%',
                maxWidth: '500px',
                aspectRatio: '1',
                margin: '0 auto',
                userSelect: 'none',
                overflow: 'hidden',
                border: '2px solid var(--grid-border-thick)', // Outer thick border
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

                    // Border logic for 3x3 grids (thick borders)
                    const borderRight = (cIndex + 1) % 3 === 0 && cIndex !== 8 ? '2px solid var(--grid-border-thick)' : undefined;
                    const borderBottom = (rIndex + 1) % 3 === 0 && rIndex !== 8 ? '2px solid var(--grid-border-thick)' : undefined;

                    let bg = 'var(--cell-bg)';
                    if (isError) bg = 'hsla(var(--hue-error), 90%, 90%, 0.5)';
                    else if (isSelected) bg = 'var(--cell-bg-selected)';
                    else if (isSameNumber) bg = 'var(--cell-bg-highlight)';
                    else if (isRelated) bg = 'hsla(var(--hue-primary), 50%, 90%, 0.15)'; // Very subtle related highlight

                    return (
                        <div
                            key={`${rIndex}-${cIndex}`}
                            onClick={() => onCellClick(rIndex, cIndex)}
                            className={cell !== 0 ? 'pop' : ''} // Animation on value change/render
                            style={{
                                background: bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
                                fontWeight: isInitial ? 700 : 500,
                                color: isError ? 'var(--cell-text-error)' : (isInitial ? 'var(--cell-text-given)' : 'var(--cell-text-user)'),
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease, color 0.15s ease',
                                borderRight: borderRight,
                                borderBottom: borderBottom,
                                position: 'relative', // For potential future overlays
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
