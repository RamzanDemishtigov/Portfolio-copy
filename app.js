
const express = require('express');
const res = require('express/lib/response');
const app = express()
const port = 3000
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
}

budgetChecker()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/envelopes',(req,res,next)=>{
  res.status(200).send(envelopes)
});

app.get('/api/envelopes/:id',(req,res,next)=>{
  const index=req.params.id
  res.send(envelopes[index-1])
})

app.use(express.json())
app.put('/api/envelopes/:id',(req,res,next)=>{
  const index=req.params.id-1;
  const {name,budget}=req.body;
  envelopes[index].name=name
  envelopes[index].budget=budget
  budgetChecker()
  res.status(201).send(envelopes[index])
})

app.use(express.json())
app.post('/api/envelopes',(req, res) => {
    try {
      const { name, budget } = req.body;
      const newId = createId(envelopes);
      const newEnvelope = {
        id: newId,
        name,
        budget,
      };
      envelopes.push(newEnvelope);
      res.status(201).send(newEnvelope);
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.delete('/api/envelopes/:id',(req,res,next)=>{
  const index=req.params.id-1;
  envelopes.splice(index,1)
  budgetChecker()
  res.status(404).send(envelopes)
})

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