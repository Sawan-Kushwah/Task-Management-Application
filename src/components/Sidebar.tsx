import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import { taskType } from "../App";

const Sidebar = ({ totalTask, activeTask, expiredTask, setTask }: { totalTask: number, activeTask: number, expiredTask: number, setTask: (task: taskType) => void }) => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    return (
        <>
            <AddTaskForm showTaskForm={showTaskForm} close={() => setShowTaskForm(false)} setTask={setTask} />
            <div className=" p-4 flex flex-col gap-6">
                <div className="p-4 bg-[#ecedee] rounded-lg space-y-3 drop-shadow-md">
                    <div className="dot rounded-full p-3 bg-[#F42D20] w-fit">
                        <img src={'/expire.svg'} alt="expire" />
                    </div>
                    <h3 className="text-[#797979] font-semibold">Expired Tasks</h3>
                    <p className="text-2xl font-bold">{expiredTask}</p>
                </div>
                <div className="p-4 bg-[#ecedee] rounded-lg space-y-3 drop-shadow-md">
                    <div className="dot rounded-full p-3 bg-[#E89271] w-fit">
                        <img src={'/active.svg'} alt="active" />
                    </div>
                    <h3 className="text-[#797979] font-semibold">All Active Tasks</h3>
                    <p className="text-2xl font-bold">{activeTask}</p>
                </div>
                <div className="p-4 bg-[#ecedee] rounded-lg space-y-3 drop-shadow-md">
                    <div className="dot rounded-full p-3 bg-[#70A1E5] w-fit">
                        <img src={'/complete.svg'} alt="complete" />
                    </div>
                    <h3 className="text-[#797979] font-semibold">Completed Tasks</h3>
                    <p className="text-2xl font-bold">{totalTask - activeTask} / {totalTask}</p>
                </div>
                <button className="w-full py-2 mt-auto cursor-pointer rounded-4xl bg-gray-900 text-white hover:bg-gray-800" onClick={() => setShowTaskForm(true)}>
                    + Add Task
                </button>
            </div>
        </>
    );
};

export default Sidebar;