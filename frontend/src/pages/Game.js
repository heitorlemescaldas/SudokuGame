import React, { useState, useEffect } from 'react';

const initialSudoku = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const Game = () => {
  const [sudoku, setSudoku] = useState(initialSudoku);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (row, col, value) => {
    if (attempts >= 3) return;
    const newSudoku = [...sudoku];
    newSudoku[row][col] = value;
    setSudoku(newSudoku);
  };

  const handleSubmit = () => {
    if (attempts < 3) {
      setAttempts(attempts + 1);
      // Lógica para verificar e enviar o resultado do jogo
    } else {
      alert('Você atingiu o limite de tentativas.');
    }
  };

  return (
    <div>
      <h2>Sudoku</h2>
      <div>Tempo: {timer}s</div>
      <div>
        {sudoku.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="number"
                min="0"
                max="9"
                value={cell !== 0 ? cell : ''}
                onChange={(e) => handleChange(rowIndex, colIndex, Number(e.target.value))}
                disabled={cell !== 0}
                style={{ width: '40px', height: '40px', textAlign: 'center' }}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Finalizar Jogo</button>
    </div>
  );
};

export default Game;
