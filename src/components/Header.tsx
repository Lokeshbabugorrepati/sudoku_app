import React from 'react';

interface HeaderProps {
    difficulty: string;
    onDifficultyChange: (diff: 'Easy' | 'Medium' | 'Hard') => void;
    timer: number;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    mistakes: number;
}

const Header: React.FC<HeaderProps> = ({ difficulty, onDifficultyChange, timer, theme, toggleTheme, mistakes }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <header style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{
                    margin: 0,
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    letterSpacing: '-1.5px',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}>
                    Sudoku
                </h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className="icon-btn"
                        onClick={toggleTheme}
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        style={{ width: '42px', height: '42px', fontSize: '1.2rem' }}
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
            </div>

            <div className="glass-panel" style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 20px',
                alignItems: 'center',
                gap: '15px',
                borderRadius: '1rem'
            }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <select
                        value={difficulty}
                        onChange={(e) => onDifficultyChange(e.target.value as any)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--primary)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            outline: 'none',
                            // Using a custom focus style if needed, but simple is better here
                        }}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '20px', fontWeight: 600, fontSize: '0.95rem' }}>
                    <div style={{
                        color: mistakes >= 3 ? 'var(--cell-text-error)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <span>Mistakes:</span>
                        <span style={{ color: mistakes >= 3 ? 'var(--cell-text-error)' : 'var(--text-main)' }}>{mistakes}/3</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                        <span>Time:</span>
                        <span style={{ color: 'var(--text-main)', fontVariantNumeric: 'tabular-nums' }}>{formatTime(timer)}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
