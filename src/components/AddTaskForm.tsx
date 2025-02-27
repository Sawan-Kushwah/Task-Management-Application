import axios from "axios";
import { X } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import conf from '../config';
import { taskType } from "../App";
import TaskSuccessMessage from "./TaskSuccessMessage";

const AddTaskForm = ({ showTaskForm, close, setTask }: { showTaskForm: boolean, close: () => void, setTask: (task: taskType) => void }) => {

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [deadline, setDeadline] = useState<Date | undefined | null>();
    const [description, setDescription] = useState("");
    const [showSuccess, setshowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const showDatePicker = () => {
        dateRef.current?.showPicker();
    }

    const handleDateChange = () => {
        const selectedDate = dateRef.current?.valueAsDate;
        setDeadline(selectedDate);
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPriority("");
        setDeadline(null);
        setStatus("");
        setError(null)
    }

    const handleCloseForm = () => {
        resetForm();
        close()
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!title || !priority || !status || !deadline || !status) {
            setError("Please fill in all required fields.");
            return;
        }

        if (deadline < new Date()) {
            setError('Deadline must be a future date')
            return;
        }

        try {
            const res = await axios.post(`${conf.server}/addTask`,
                { title, description, priority, status, deadline },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (res.status === 201 || res.status === 200) {
                setTask(res.data);
                resetForm()
                setshowSuccess(true);

                close()
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Failed to add task. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    }

    if (!showTaskForm) return null;

    return (
        <>
            {showSuccess ? <TaskSuccessMessage closeSuccess={() => setshowSuccess(false)} /> : null}
            <div className="fixed inset-0 bg-gray-800/55 bg-opacity-30 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-slide-in">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-2 items-center">
                            <div className={`dot w-fit p-1 rounded-full bg-[#20E7F4] h-fit`}></div>
                            <h2 className="text-xl font-bold">Add Task</h2>
                        </div>
                        <button onClick={handleCloseForm} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                            <X />
                        </button>
                    </div>
                    <div className="bg-gray-300 h-[1px]" />

                    {error && (
                        <div className="text-red-400 font-bold bg-red-100 p-2 rounded-lg mt-4">
                            *{error}
                        </div>
                    )}

                    <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Task Title" className="p-2 border-b-2 border-gray-500 outline-none font-bold text-sm" onChange={(e) => setTitle(e.target.value)} value={title} />
                        <textarea placeholder="Task Description" className="p-2 outline-none border-b-2 border-gray-500 text-[#111111] font-medium" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                        <select className="p-2 border-b-2 cursor-pointer border-gray-500 text-[#5A5A5A] text-sm font-bold" onChange={(e) => setPriority(e.target.value)} value={priority}>
                            <option value="" disabled>Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="High">High</option>
                        </select>
                        <div className="flex justify-between items-center">
                            <div>
                                <label htmlFor="selectDate" onClick={showDatePicker} className="cursor-pointer text-[#5A5A5A] text-sm font-bold">{deadline ? `Deadline : ${deadline.toISOString().split('T')[0]}` : 'Deadline'}</label>
                                <input type="date" ref={dateRef} id="selectDate" className='opacity-0 pointer-events-none absolute top-[30%] left-[40%]' onChange={handleDateChange} />
                            </div>
                            <select className="p-2 rounded-lg cursor-pointer text-[#5A5A5A] text-sm font-bold appearance-none" onChange={(e) => setStatus(e.target.value)} value={status}>
                                <option disabled value="">Assigned To</option>
                                <option value="To Do">To Do</option>
                                <option value="On Progress">On Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <button className="w-full py-2 bg-[#0D062D] text-white rounded-lg hover:bg-gray-700 cursor-pointer" type="submit">
                            Add Task
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTaskForm;
