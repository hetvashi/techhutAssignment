const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

const db = "mongodb://localhost:27017/todo"

mongoose.connect(db, ({ useNewUrlParser: true }))
    .then(console.log("Connected to mongo database"))
    .catch(err => console.log(err))

const todoSchema = new mongoose.Schema({
    title: String,
    complete: {
        type: boolean,
        default: false
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

const Todo = mongoose.model('todo', todoSchema)

app.get("/todos", (req, res) => {
    Todo.find().sort({ complete: -1 }).then(todo => res.json(todo))
})

app.post("/todos", (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        Date: req.body.Date
    })
    newTodo.save().then(todo => res.json(todo))
})

app.delete("/todos/:id", (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(todo => res.json({ remove: true }))
})

app.put("/todos/:id/:complete", (req, res) => {
    const {
        id, complete
    } = req.params
    Todo.findByIdAndUpdate(req.params.id, { complete: !Number(complete) })
        .then(todo => res.json(todo))
})

app.listen(5000, () => {
    console.log("server is running at port 5000")
});