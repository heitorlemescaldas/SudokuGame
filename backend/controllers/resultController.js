const { Result } = require('../models');

exports.submitResult = async (req, res) => {
  const { username, boardId, timeTaken } = req.body;
  try {
    const newResult = await Result.create({ username, boardId, timeTaken });
    res.status(200).send('Resultado registrado com sucesso.');
  } catch (error) {
    console.error('Erro ao registrar resultado:', error);  // Adicionado log de erro
    res.status(400).send('Dados inválidos fornecidos.');
  }
};

exports.getRanking = async (req, res) => {
  const { boardId } = req.query;
  try {
    let results = await Result.findAll(boardId ? { where: { boardId } } : {});
    results.sort((a, b) => a.timeTaken - b.timeTaken);
    res.status(200).json(results);
  } catch (error) {
    console.error('Erro ao obter ranking:', error);  // Adicionado log de erro
    res.status(404).send('Erro ao obter ranking.');
  }
};
