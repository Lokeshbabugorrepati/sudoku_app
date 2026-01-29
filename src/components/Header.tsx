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
            maxWidth: '600px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', background: 'linear-gradient(45deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Sudoku
                </h1>
                <button
                    className="icon-btn glass-panel"
                    onClick={toggleTheme}
                    title="Toggle Theme"
                    style={{ width: '40px', height: '40px' }}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>

            <div className="glass-panel" style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 20px',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Difficulty:</span>
                    <select
                        value={difficulty}
                        onChange={(e) => onDifficultyChange(e.target.value as any)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--primary)',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '20px', fontWeight: 600 }}>
                    <span style={{ color: mistakes >= 3 ? 'var(--cell-text-error)' : 'var(--text-main)' }}>
                        Mistakes: {mistakes}/3
                    </span>
                    <span>
                        ⏱️ {formatTime(timer)}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
