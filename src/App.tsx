import { useEffect, useState } from 'react';
import './App.css'
import Sidebar from './components/Sidebar';
import axios from 'axios';
import conf from './config';
import TaskCard from './components/TaskCard';

export type taskType = {
  _id: string;
  title: string;
  status: string;
  priority: string;
  deadline: Date;
  description: string;
}

function App() {
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [totalTask, setTotalTask] = useState(0);
  const [activeTask, setActiveTask] = useState(0);
  const [expiredTask, setExpiredTask] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${conf.server}/getAllTask`);
      setTasks(res.data);

      let active = 0;
      let expired = 0;
      const currentDate = new Date();

      res.data.forEach((task: taskType) => {
        if (task.status !== 'Done') {
          active += 1;
        }

        const taskDeadline = new Date(task.deadline);

        // Directly compare dates
        if (taskDeadline < currentDate) {
          expired += 1;
        }
      });

      setTotalTask(res.data.length);
      setExpiredTask(expired);
      setActiveTask(active);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [tasks])

  return (
    <div className="grid grid-cols-4 gap-12 py-4">
      <Sidebar totalTask={totalTask} activeTask={activeTask} expiredTask={expiredTask} setTask={(newTask: taskType) => setTasks((prevTask) => [...prevTask, newTask])} />
      <TaskColumn title="To Do" tasks={tasks.filter(task => task.status === "To Do")} />
      <TaskColumn title="On Progress" tasks={tasks.filter(task => task.status === "On Progress")} />
      <TaskColumn title="Done" tasks={tasks.filter(task => task.status === "Done")} />
    </div>
  )
}


const TaskColumn = ({ title, tasks }: { title: string, tasks: Array<taskType> }) => {
  const onDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${conf.server}/deleteTask/${id}`)
      if (res) alert('deleted successfully')
    } catch (error) {
      console.log(error)
    }
  }

  const onUpdate = async (editedTask: taskType) => {
    try {
      const res = await axios.patch(`${conf.server}/updateTask`, { ...editedTask }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (res) alert('task updated successfully');
    } catch (error) {
      console.log(error)
    }
  }
  let color = "#000";
  if (title === "To Do") {
    color = "#5030E5";
  } else if (title === "Done") {
    color = "#8BC48A"
  } else {
    color = "#FFA500"
  }

  return (
    <div className="p-4 bg-[#ecedee] rounded-2xl drop-shadow-lg h-[600px]">
      <div className='flex justify-center items-center gap-2 mb-3'>
        <div className={`dot p-1 rounded-full`} style={{ backgroundColor: color }}></div>
        <h2 className="text-lg font-semibold text-[#0D062D] text-center">{title} <span className='py-0.5 px-2 rounded-full bg-[#E0E0E0] text-[#625F6D] text-sm'>{tasks.length} </span></h2>
      </div>
      <div className={`border-2 mb-5`} style={{ borderColor: color }}></div>
      <div className='overflow-auto overflow-y-scroll h-[500px]'>
        {tasks.map(task => <TaskCard key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} />)}
      </div>
    </div>
  )
};




export default App
