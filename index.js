const express = require('express');

const app = express();

// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const chocolateRoutes = require("./routes/chocolates");

app.use('/chocolates', chocolateRoutes)
app.get('/hello', (req, res) => res.send('Welcome to Chocolate World!'));

app.use('*', (req, res, next) => next({ status: 404, message: 'Incorrect URL' }));

app.use((err, req, res, next) => res.status(err.status || 500).send(err.message || err));

const server = app.listen(4494, () => {
  console.log(`Server started on port ${server.address().port}`);
});
