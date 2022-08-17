const express = require('express');

const app = express();

app.listen(59296);
const server = app.listen(() => {
    console.log(`Server started successfully on port number ${server.address().port}`);
});

app.get('/', (req, res) => res.send('Hello, my name is mohamed!'));

let names = ['Mohamed', 'Daniel', 'Faizaan', 'Khaleeq'];

app.get('/getAll', (req, res) => res.send(names));

app.get('/get/:id', (req, res) => res.send(names['req.params.id']));

app.get('/delete/:id', (req, res) => {
    res.send(names.splice(req.params.id, 1));
});
app.use(express.json());    //Put BEFORE request handling

app.post('/create', (req, res) => {
    const name = req.body.name;
    names.push(name);
    res.status(201).send(`${name} added successfully`);
});

app.post('/replace/:index', (req, res) => {
    const name = req.query.name;
    const index = req.params.index;
    const old = names[index];
    names[index] = name;
    res.status(202).send(`${old} successfully replaced with ${name}`);
});