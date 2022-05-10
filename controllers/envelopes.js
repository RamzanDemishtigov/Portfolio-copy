const { db } = require("../config/index");
require(`dotenv`).config();

// @desc		Get all Envelopes
// @route		GET /api/envelopes
const getEnvelopes = (req, res) => {
  db.query(`SELECT * FROM ${process.env.DB_TABLE1} ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// @desc		Get an Envelopes
// @route		GET /api/envelopes/:id
const getEnvelopeById = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(
    `SELECT * FROM ${process.env.DB_TABLE1} WHERE id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

// @desc		Create an Envelope
// @route		POST /api/envelopes
const createEnvelope = (req, res) => {
  const { name, budget } = req.body;
  db.query(
    `INSERT INTO ${process.env.DB_TABLE1} (name, budget) VALUES ($1, $2)`,
    [name, budget],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Envelope added with ID: ${results.insertId}`);
    }
  );
};

// @desc		Update an Envelopes
// @route		PUT /api/envelopes/:id
const updateEnvelope = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, budget } = req.body;
  db.query(
    `UPDATE ${process.env.DB_TABLE1} SET name = $1, budget = $2 WHERE id = $3`,
    [name, budget, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Envelope modified with ID: ${id}`);
    }
  );
};

// @desc		Delete an Envelope
// @route		DELETE /api/envelopes/:id
const deleteEnvelope = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(`DELETE FROM ${process.env.DB_TABLE1} WHERE id = $1`, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Envelope deleted with ID: ${id}`);
  });
};

// @desc      Create a new transaction
// @route     POST /api/envelopes/:id/transactions
const transaction = (req,res) => {
  const id = parseInt(req.params.id);
  const {toId,amount} = req.body;
  const date = new Date();
  
  db.query(`UPDATE ${process.env.DB_TABLE1} SET budget = budget - $2 WHERE id = $1 RETURNING *`,[id,amount],(error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send();
  });
  db.query(`UPDATE ${process.env.DB_TABLE1} SET budget = budget + $2 WHERE id = $1 RETURNING *`,[toId,amount],(error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send();
  });
  db.query(`INSERT INTO ${process.env.DB_TABLE2} (amount,recipient,sender,date) VALUES ($1,$2,$3,$4) RETURNING *`,[amount,toId,id,date],(error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send();
  });
}

module.exports = {
  getEnvelopes,
  getEnvelopeById,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
  transaction
};