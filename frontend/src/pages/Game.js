import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const sudokuModels = [
  // Modelo 1
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  // Modelo 2
  [
    [0, 0, 0, 0, 6, 8, 0, 0, 4],
    [3, 0, 9, 0, 0, 0, 1, 5, 0],
    [5, 0, 8, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 7, 0, 0, 0],
    [7, 5, 0, 0, 0, 0, 0, 9, 2],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 7, 0, 1],
    [0, 7, 3, 0, 0, 0, 4, 0, 5],
    [6, 0, 0, 1, 9, 0, 0, 0, 0]
  ],
  // Modelo 3
  [
    [1, 0, 0, 0, 0, 7, 0, 9, 0],
    [0, 3, 0, 0, 2, 0, 0, 0, 8],
    [0, 0, 9, 6, 0, 0, 5, 0, 0],
    [0, 0, 5, 3, 0, 0, 9, 0, 0],
    [0, 1, 0, 0, 8, 0, 0, 0, 2],
    [6, 0, 0, 0, 0, 4, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 4, 1, 0, 0, 0, 0, 0, 7],
    [0, 0, 7, 0, 0, 0, 3, 0, 0]
  ],
  // Modelo 4
  [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ],
  // Modelo 5
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 8, 5],
    [0, 0, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 7, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 1, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 7, 3],
    [0, 0, 2, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 9]
  ],
  // Modelo 6
  [
    [0, 3, 0, 0, 5, 0, 0, 4, 0],
    [0, 0, 8, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 9, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 0, 7, 0, 0],
    [0, 2, 0, 0, 0, 1, 0, 6, 0],
    [0, 0, 0, 8, 3, 0, 0, 0, 0],
    [7, 0, 0, 2, 0, 0, 6, 0, 0],
    [0, 0, 6, 0, 0, 5, 0, 0, 9],
    [0, 8, 0, 0, 9, 0, 0, 1, 0]
  ],
  // Modelo 7
  [
    [4, 0, 0, 8, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 3, 5],
    [0, 6, 0, 0, 7, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 6, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 7, 0],
    [7, 0, 0, 0, 0, 0, 5, 2, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0]
  ],
  // Modelo 8
  [
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 3, 9, 0, 5, 0, 0, 0, 0],
    [8, 0, 0, 0, 0, 7, 0, 0, 4],
    [0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 9, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 6, 0, 2, 5, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0]
  ],
  // Modelo 9
  [
    [0, 0, 0, 6, 0, 0, 4, 0, 0],
    [7, 0, 0, 0, 0, 3, 6, 0, 0],
    [0, 0, 0, 0, 9, 1, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 1, 8, 0, 0, 0, 3],
    [0, 0, 0, 3, 0, 6, 0, 4, 5],
    [0, 4, 0, 2, 0, 0, 0, 6, 0],
    [9, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 1, 0, 0]
  ],
  // Modelo 10
  [
    [2, 0, 0, 3, 0, 4, 0, 0, 0],
    [0, 4, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 5, 0, 2, 0, 4, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 5],
    [0, 3, 0, 0, 5, 0, 0, 9, 0],
    [7, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 6, 0, 7, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 2, 0, 9, 0, 0, 6]
  ],
  // Modelo 11
  [
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 3],
    [0, 6, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 7, 0, 1, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 6, 0, 0, 7, 5],
    [0, 0, 0, 2, 0, 0, 0, 3, 0],
    [1, 0, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 4, 0, 8, 0, 0, 0, 0]
  ],
  // Modelo 12
  [
    [0, 0, 0, 0, 0, 0, 0, 6, 8],
    [0, 0, 3, 0, 0, 0, 4, 0, 0],
    [0, 4, 0, 6, 0, 0, 2, 0, 1],
    [0, 0, 9, 0, 0, 8, 0, 0, 0],
    [0, 0, 7, 0, 0, 0, 0, 0, 0],
    [0, 8, 0, 1, 0, 0, 5, 0, 0],
    [5, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 3, 6, 0, 0, 0],
    [7, 6, 0, 0, 0, 0, 0, 0, 0]
  ],
  // Modelo 13
  [
    [0, 0, 0, 6, 0, 0, 0, 0, 0],
    [4, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 7, 0, 9, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 0, 2, 0, 8],
    [0, 0, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 7, 0, 0, 0],
    [3, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 2, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 7, 0]
  ],
  // Modelo 14
  [
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [6, 0, 0, 0, 7, 0, 0, 0, 9],
    [0, 9, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 7, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 2, 0, 8, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 1, 0],
    [9, 0, 0, 0, 6, 0, 0, 0, 5],
    [0, 0, 0, 4, 0, 0, 0, 0, 0]
  ],
];

const solvedSudoku = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const getRandomSudoku = () => {
  const randomIndex = Math.floor(Math.random() * sudokuModels.length);
  return sudokuModels[randomIndex];
};

const Game = () => {
  const { user } = useAuth();
  const [sudoku, setSudoku] = useState(getRandomSudoku());
  const [attempts, setAttempts] = useState(3);
  const [timer, setTimer] = useState(0);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer > 0 && timer % 30 === 0) {
      removeRandomNumber();
    }
  }, [timer]);

  const handleChange = (row, col, value) => {
    if (attempts <= 0) return;
    const newSudoku = [...sudoku];
    newSudoku[row][col] = value;
    setSudoku(newSudoku);
  };

  const handleKeyDown = (e, row, col) => {
    if (attempts <= 0) return;

    switch (e.key) {
      case 'ArrowUp':
        if (row > 0) inputRefs.current[(row - 1) * 9 + col].focus();
        break;
      case 'ArrowDown':
        if (row < 8) inputRefs.current[(row + 1) * 9 + col].focus();
        break;
      case 'ArrowLeft':
        if (col > 0) inputRefs.current[row * 9 + (col - 1)].focus();
        break;
      case 'ArrowRight':
        if (col < 8) inputRefs.current[row * 9 + (col + 1)].focus();
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (attempts <= 0) return;

    if (isSudokuCorrect()) {
      try {
        await saveResult();
        alert('Parabéns! Você completou o Sudoku.');
        navigate(0); // Redirecionar para um novo jogo
      } catch (error) {
        console.error('Erro ao salvar o resultado:', error);
      }
    } else {
      setIsIncorrect(true);
      setTimeout(() => setIsIncorrect(false), 500);
      setAttempts(attempts - 1);

      if (attempts - 1 <= 0) {
        alert('Você esgotou suas tentativas. Redirecionando para um novo jogo.');
        navigate(0); // Redirecionar para um novo jogo
      }
    }
  };

  const saveResult = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: user.username,
        boardId: Date.now().toString(),
        timeTaken: timer,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar o resultado');
    }
  };

  const isSudokuCorrect = () => {
    for (let row = 0; row < 9; row++) {
      const rowSet = new Set();
      for (let col = 0; col < 9; col++) {
        if (sudoku[row][col] === 0 || rowSet.has(sudoku[row][col])) {
          return false;
        }
        rowSet.add(sudoku[row][col]);
      }
    }

    for (let col = 0; col < 9; col++) {
      const colSet = new Set();
      for (let row = 0; row < 9; row++) {
        if (sudoku[row][col] === 0 || colSet.has(sudoku[row][col])) {
          return false;
        }
        colSet.add(sudoku[row][col]);
      }
    }

    return true;
  };

  const removeRandomNumber = () => {
    const nonEmptyCells = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (sudoku[row][col] !== 0) {
          nonEmptyCells.push({ row, col });
        }
      }
    }
    if (nonEmptyCells.length === 0) return;
    const randomCell = nonEmptyCells[Math.floor(Math.random() * nonEmptyCells.length)];
    const newSudoku = [...sudoku];
    newSudoku[randomCell.row][randomCell.col] = 0;
    setSudoku(newSudoku);
  };

  return (
    <div>
      <h2>Sudoku</h2>
      <div>Tempo: {timer}s</div>
      <div>Tentativas restantes: {attempts}</div>
      <div className={isIncorrect ? 'sudoku incorrect' : 'sudoku'}>
        {sudoku.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="number"
                min="1"
                max="9"
                value={cell !== 0 ? cell : ''}
                onChange={(e) => handleChange(rowIndex, colIndex, Number(e.target.value))}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                className="sudoku-cell"
                ref={el => inputRefs.current[rowIndex * 9 + colIndex] = el}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Fazer Tentativa</button>
    </div>
  );
};

export default Game;