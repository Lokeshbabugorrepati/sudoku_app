import React from 'react';

interface ControlsProps {
    onNumberClick: (num: number) => void;
    onDelete: () => void;
    onUndo: () => void;
    onNewGame: () => void;
    onSolve: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onNumberClick, onDelete, onUndo, onNewGame, onSolve }) => {
    return (
        <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Number Pad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '8px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                        key={num}
                        className="btn glass-panel"
                        onClick={() => onNumberClick(num)}
                        style={{
                            fontSize: '1.5rem',
                            color: 'var(--primary)',
                            padding: '0.5rem 0',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            aspectRatio: '1/1' // While convenient, height is safer for varying widths
                        }}
                    >
                        {num}
                    </button>
                ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <button className="btn" onClick={onUndo} title="Undo">↩️ Undo</button>
                <button className="btn" onClick={onDelete} title="Erase">⌫ Erase</button>
                <button className="btn" onClick={onSolve} title="Solve (Cheat)">💡 Solve</button>
                <button className="btn primary" onClick={onNewGame}>New Game</button>
            </div>
        </div>
    );
};

export default Controls;
