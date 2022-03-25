const express = require('express');
const res = require('express/lib/response');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const db = require('./queries')
//Envelopes
const envelopes=[{
    id:1,
    name:'Food',
    budget:400, 
},
{
    id:2,
    name:'Rent',
    budget:800,
},
{
    id:3,
    name:'Internet',
    budget:100,
},];
//Budget initialization
let totalBudget=100000
const budgetChecker=()=>{
  totalBudget=100000
  for (let i=0;i<=envelopes.length-1;i++){
  totalBudget-=envelopes[i].budget
  }
  console.log(totalBudget)
};

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/api/envelopes',db.getEnvelopes);

app.get('/api/envelopes/:id',db.getEnvelopeById);

app.put('/api/envelopes/:id',db.updateEnvelope);

app.post('/api/envelopes',db.createEnvelope);

app.delete('/api/envelopes/:id',db.deleteEnvelope);

app.post('/api/envelopes/:id/transactions',db.transaction)

  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//helpers
const createId=(data)=>{
  const latestRecord = data[data.length - 1];
  const newId = latestRecord.id + 1;
  if (newId === NaN || newId < 0 || newId === undefined) {
    console.error("Invalid ID");
  }
  return newId;
};
const findById=(data, recordId)=>{
  const record = data.find((item) => item.id === parseInt(recordId));

  if (!record) {
    console.log("Record not found");
  }
  return record;
}