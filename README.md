# personal-budget-ii

Simple Node/Express API to manage a budget using a budget envelope strategy. Users can create, read, update, and delete envelopes as well as create transactions for each individual envelope. All data is persisted in a database using PostgreSQL.

## Running the app
To run locally, run `npm install`, then `node app.js`

You would need designed database for using this API.
Database should have 2 tables: first is for envelopes and second for transactions.
First table should include columns:id-integer(null-no),name-varchar(128)(null-no),budget-integer(null-yes).
Second table:id-integer(null-no),amount-integer(null-yes),recipient-integer(null-no),sender-integer(null-no),date-date(null-no).

Once the app is running locally, you can access the API at `http://localhost:3000/`

## Testing with Swagger
Swagger documentation and testing available at `http://localhost:3000/api/docs`

To test with Swagger:

### Envelopes:
----
 - Retrieve envelopes using `GET /api/envelopes`
 - Retrieve a single envelope using `GET /api/envelopes/{id}`
 - Create an envelope using `POST /api/envelopes`
 - Update an envelope using `PUT /api/envelopes/{id}`
 - Delete an envelope using `DELETE /api/envelopes/{id}`
 - Create an transaction using `POST /api/envelopes/{id}/transactions`