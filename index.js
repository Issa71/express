const express  = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const chocolates = [ {
    name: "kitkat",
    amount: 4,
    cost: 2.50
}];

app.get("/hello", (req, res) => {
    return res.send("Welcome to Chocolate World!");
});

app.post("/createChocolate", (req, res, next) => {
    console.log("BODY:", req.body);
    chocolates.push(req.body);
    return res.status(201).send(chocolates[chocolates.length - 1]);
});

app.get("/getAllChocolates", (req, res) => {
    return res.json(chocolates);
});

app.get("/getChocolate/:id", (req, res, next) => {
    console.log("PARAMS", req.params);
    const {id} = req.params;
    return res.json(chocolates[id]);
});

app.patch("/updateChocolate/:id", (req, res) => {
    console.log("PARAMS", req.params);
    console.log("QUERY:", req.query);
    const { name, cost, amount} = req.query;
    const { id } = req.params;
    const chocolateToUpdate = chocolates[req.params.id];
    
    if (name) chocolateToUpdate.name = chocolateToUpdate.name;
    if (cost !== null && cost !== undefined) chocolateToUpdate.cost = cost;
    if (amount !== null && amount !== undefined) chocolateToUpdate.amount = amount;

    return res.json(chocolates[id]);
});


app.delete("/removeChocolate/:id", (req, res) => {
    console.log("PARAMS:", req.params);
    chocolates.splice(req.params.id);
    return res.status(204).send();
});

app.use("*", (req, res, next) => next({status: 404, message: "Incorrect URL"}));

app.use((err, req, res, next) => {
    return res.status(err.status || 500).send(err.message || err);
})

const server = app.listen(4494, () => {
    console.log(`Server started on port ${server.address().port}`);
});