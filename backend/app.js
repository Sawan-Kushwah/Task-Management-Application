import express from 'express';
import cors from 'cors'
import connectDB from './utils/connectDB.js';
import { Task } from './schema/task.js';
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

connectDB();

app.get('/', (req, res) => {
    res.send('hello world')
})
app.get('/getAllTask', async (req, res) => {
    try {
        const data = await Task.find({});
        res.status(200).json(data);
    } catch (error) {
        console.log("error in fetching data", error);
    }
})

app.post('/addTask', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        console.log("error in saving", error);
    }
})

app.delete('/deleteTask/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.send('deleted successfully')

})

app.patch('/updateTask', async (req, res) => {
    try {
        const newTask = req.body
        await Task.findByIdAndUpdate(newTask._id, { ...newTask })
        res.json(newTask);
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`backend running on port ${port}`)
})