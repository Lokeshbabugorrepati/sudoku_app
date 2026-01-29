import React from 'react';

interface ControlsProps {
    onNumberClick: (num: number) => void;
    onDelete: () => void;
    onUndo: () => void;
    onNewGame: () => void;
    onSolve: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onNumberClick, onDelete, onUndo, onNewGame, onSolve }) => {
    const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div style={{
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignSelf: 'flex-start' /* Important for flex row alignment */
        }}>
            {/* Number Pad - Ergonomic Grid */}
            <div className="glass-panel" style={{
                padding: '15px',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)', // 5 cols: 1-5, 6-9+Del
                gap: '8px',
                borderRadius: '1.2rem'
            }}>
                {numberPad.map((num) => (
                    <button
                        key={num}
                        className="btn"
                        onClick={() => onNumberClick(num)}
                        style={{
                            fontSize: '1.4rem',
                            color: 'var(--primary)',
                            padding: '0',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.4)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: 'none'
                        }}
                    >
                        {num}
                    </button>
                ))}
                <button
                    className="btn"
                    onClick={onDelete}
                    title="Erase"
                    style={{
                        fontSize: '1.4rem',
                        color: 'var(--hue-error)',
                        padding: '0',
                        height: '50px',
                        background: 'rgba(255,50,50,0.1)'
                    }}
                >
                    ⌫
                </button>
            </div>

            {/* Action Buttons Grouped */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn" onClick={onUndo} title="Undo" style={{ flex: 1 }}>↩️ Undo</button>
                    <button className="btn" onClick={onSolve} title="Solve" style={{ flex: 1 }}>💡 Solve</button>
                </div>
                <button className="btn primary" onClick={onNewGame} style={{ width: '100%' }}>New Game</button>
            </div>
        </div>
    );
};

export default Controls;
