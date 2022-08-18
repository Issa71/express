const router = require('express').Router();

const Chocolate = require('../db').chocolate;

router.post('/createChocolate', (req, res, next) => {
  console.log('BODY:', req.body);
  if (!req.body || Object.keys(req.body).length < 1) return next({ status: 400, message: 'No body' });

  Chocolate.create(req.body)
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

router.get('/getAllChocolates', (req, res, next) => {
  Chocolate.find().then((results) => res.json(results)).catch((err) => next(err));
});

router.get('/getChocolate/:id', (req, res, next) => {
  console.log('PARAMS', req.params);
  const { id } = req.params;
  if (id === null || id === undefined) return next({ status: 400, msg: 'Bad Request' });
  Chocolate.findById(id).then((result) => res.json(result)).catch((err) => next(err));
});

router.patch('/updateChocolate/:id', (req, res, next) => {
  console.log('PARAMS', req.params);
  console.log('QUERY:', req.query);
  const { id } = req.params;
  const rq = req.query;
  Chocolate.findByIdAndUpdate(id, rq).then((result) => res.json(result)).catch((e) => next(e));
});

router.delete('/removeChocolate/:id', (req, res, next) => {
  console.log('PARAMS:', req.params);
  const rq = req.query;
  Chocolate.findByIdAndDelete(rq.id).then(() => res.status(204).send()).catch((e) => next(e));
});
module.exports = router;
