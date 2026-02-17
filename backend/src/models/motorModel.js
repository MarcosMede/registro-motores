const pool = require('../config/db');

function getDateWindow(date) {
  const start = new Date(`${date}T00:00:00.000Z`);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start, end };
}

async function createMotor(data) {
  const [result] = await pool.execute(
    `INSERT INTO motores (numero_motor, modelo, potencia, tensao, corrente, responsavel, observacoes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.numero_motor,
      data.modelo,
      data.potencia,
      data.tensao,
      data.corrente,
      data.responsavel,
      data.observacoes || null
    ]
  );

  return result.insertId;
}

async function getMotores(date) {
  let sql = 'SELECT * FROM motores WHERE 1=1';
  const params = [];

  if (date) {
    const { start, end } = getDateWindow(date);
    sql += ' AND data_registro >= ? AND data_registro < ?';
    params.push(start, end);
  }

  sql += ' ORDER BY data_registro DESC';

  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function getMotorById(id) {
  const [rows] = await pool.execute('SELECT * FROM motores WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function updateMotor(id, data) {
  const [result] = await pool.execute(
    `UPDATE motores
     SET numero_motor = ?, modelo = ?, potencia = ?, tensao = ?, corrente = ?, responsavel = ?, observacoes = ?
     WHERE id = ?`,
    [
      data.numero_motor,
      data.modelo,
      data.potencia,
      data.tensao,
      data.corrente,
      data.responsavel,
      data.observacoes || null,
      id
    ]
  );

  return result.affectedRows;
}

async function deleteMotor(id) {
  const [result] = await pool.execute('DELETE FROM motores WHERE id = ?', [id]);
  return result.affectedRows;
}

module.exports = {
  createMotor,
  getMotores,
  getMotorById,
  updateMotor,
  deleteMotor
};
