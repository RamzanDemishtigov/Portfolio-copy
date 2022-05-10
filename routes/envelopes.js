const express = require("express");
const router = express.Router();

const {
    getEnvelopes,
    getEnvelopeById,
    createEnvelope,
    updateEnvelope,
    deleteEnvelope,
    transaction
  } = require("../controllers/envelopes");


/**
 * @swagger
 * /api/envelopes:
 *    get:
 *      summary: Get all envelopes
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      responses:
 *        "200":
 *          description: Returns a list of all envelopes
 *
 */
router.get("/", getEnvelopes);

/**
 * @swagger
 * /api/envelopes/{id}:
 *    get:
 *      summary: Get an envelope by ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a an envelope along with its data
 */
 router.get("/:id", getEnvelopeById);

 /**
 * @swagger
 * /api/envelopes:
 *    post:
 *      summary: Creates a new envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                name: Scuba lessons
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns created envelope
 */
router.post("/", createEnvelope);

/**
 * @swagger
 * /api/envelopes/{id}:
 *    put:
 *      summary: Updates an existing envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope ID
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                name: Scuba lessons
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns updated envelope
 */
 router.put("/:id", updateEnvelope);

 /**
 * @swagger
 * /api/envelopes/{id}:
 *    delete:
 *      summary: Deletes an individual envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Envelope ID to delete
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: Envelope deleted
 */
router.delete("/:id", deleteEnvelope);

/**
 * @swagger
 * /api/envelopes/{id}/transactions:
 *    post:
 *      summary: Makes a new transaction and saves it in database.
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Data for new envelope transaction
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                toId:
 *                  type: integer
 *                amount:
 *                  type: integer
 *              example:
 *                toId: 1
 *                amount: 1500
 *      responses:
 *        "201":
 *          description: Returns created transaction
 */
 router.post('/:id/transactions', transaction);

 module.exports = router;