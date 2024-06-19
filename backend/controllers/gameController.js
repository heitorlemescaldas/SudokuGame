const { Game } = require('../models');
const { generateSudokuBoard } = require('../utils/generateSudoku');

exports.newGame = async (req, res) => {
  try {
    const initialState = generateSudokuBoard();
    const newGame = await Game.create({
      boardId: new Date().getTime().toString(),
      initialState,
      currentState: initialState
    });
    res.status(200).json({ boardId: newGame.boardId, initialState });
  } catch (error) {
    console.error('Erro ao criar o tabuleiro:', error);  // Adicionado log de erro
    res.status(500).send('Erro ao criar o tabuleiro.');
  }
};
