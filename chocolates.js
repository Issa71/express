const router = require('express').Router();

const chocolates = [{
  name: 'kitkat',
  amount: 4,
  cost: 2.50,
}];
router.post('/createChocolate', (req, res, next) => {
  console.log('BODY:', req.body);
  chocolates.push(req.body);
  return res.status(201).send(chocolates[chocolates.length - 1]);
});

router.get('/getAllChocolates', (req, res) => res.json(chocolates));

router.get('/getChocolate/:id', (req, res, next) => {
  console.log('PARAMS', req.params);
  const { id } = req.params;
  return res.json(chocolates[id]);
});

router.patch('/updateChocolate/:id', (req, res) => {
  console.log('PARAMS', req.params);
  console.log('QUERY:', req.query);
  const { name, cost, amount } = req.query;
  const { id } = req.params;
  const chocolateToUpdate = chocolates[req.params.id];

  if (name) chocolateToUpdate.name = chocolateToUpdate.name;
  if (cost !== null && cost !== undefined) chocolateToUpdate.cost = cost;
  if (amount !== null && amount !== undefined) chocolateToUpdate.amount = amount;

  return res.json(chocolates[id]);
});

router.delete('/removeChocolate/:id', (req, res) => {
  console.log('PARAMS:', req.params);
  chocolates.splice(req.params.id);
  return res.status(204).send();
});
module.exports = router;
