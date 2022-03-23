const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Envelopes',
  password: 'postgres',
  port: 5432,
});

const getEnvelopes = (request, response) => {
  pool.query('SELECT * FROM envelopes ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getEnvelopeById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    'SELECT * FROM envelopes WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const createEnvelope = (request, response) => {
  const { name, budget } = request.body;
  pool.query(
    'INSERT INTO envelopes (name, budget) VALUES ($1, $2)',
    [name, budget],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Envelope added with ID: ${result.insertId}`);
    }
  );
};
const updateEnvelope = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, budget } = request.body;
  pool.query(
    'UPDATE envelopes SET name = $1, budget = $2 WHERE id = $3',
    [name, budget, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Envelope modified with ID: ${id}`);
    }
  );
};
const deleteEnvelope = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE FROM envelopes WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Envelope deleted with ID: ${id}`);
  });
};
module.exports = {
  getEnvelopes,
  getEnvelopeById,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
};
