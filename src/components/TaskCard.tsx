import { ChangeEvent, useState } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { taskType } from '../App';

const TaskCard = ({ task, onDelete, onUpdate }: { task: taskType, onDelete: (id: string) => void, onUpdate: (task: taskType) => void }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const toggleMenu = () => setMenuVisible((prev) => !prev);
    const toggleEdit = () => {
        setMenuVisible(false)
        setIsEditing((prev) => !prev);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate(editedTask);
        setIsEditing(false);
    };
    const handleCancel = () => {
        setEditedTask({ ...task })
        toggleEdit();
    };

    return (
        <div className="mb-4 bg-white rounded-xl drop-shadow-lg">
            <div className="p-4">
                <div className="flex justify-between relative">
                    <div className="space-y-2">
                        {editedTask.status === "Done" ?
                            <span className="bg-[#83C29D33] text-[#68B266] text-sm font-semibold px-3 py-1 rounded-lg">Completed</span>
                            :
                            <select
                                name="priority"
                                value={editedTask.priority}
                                onChange={handleInputChange}
                                className={`text-sm font-bold px-3 py-1 rounded-lg ${!isEditing ? 'appearance-none pointer-events-none' : ''}`}
                                disabled={!isEditing}
                                style={{ backgroundColor: editedTask.priority === 'High' ? '#D8727D1A' : '#DFA87433', color: editedTask.priority === 'High' ? '#D8727D' : '#D58D49' }}
                            >
                                <option value="Low">Low</option>
                                <option value="High">High</option>
                            </select>
                        }
                        <input
                            name="title"
                            value={editedTask.title}
                            onChange={handleInputChange}
                            className={`text-lg font-bold text-[#0D062D] outline-none m-0  ${isEditing ? 'border-b py-1 max-w-fit' : ' pointer-events-none'} `}
                            placeholder="Title"
                            readOnly={!isEditing}
                        />
                        <input
                            name="description"
                            value={editedTask.description}
                            onChange={handleInputChange}
                            className={`text-[#787486] text-sm mt-2 ${isEditing ? 'border-b py-1' : ' pointer-events-none'} outline-none`}
                            placeholder="Description"
                            readOnly={!isEditing}
                        />
                        <div className="mt-4">
                            <p className="text-[#5A5A5A] text-xs font-bold">Deadline:
                                <input
                                    name="deadline"
                                    value={editedTask.deadline ? new Date(editedTask.deadline).toISOString().split('T')[0] : ''}
                                    onChange={handleInputChange}
                                    className={`font-medium text-[#5A5A5A] text-xs tracking-tighter outline-none ${isEditing ? 'border-b py-1 max-w-fit' : ' pointer-events-none'}`}
                                    placeholder="Deadline"
                                    type="date"
                                    readOnly={!isEditing}
                                />
                            </p>
                        </div>

                        {isEditing && (
                            <div className="flex space-x-2">
                                <button onClick={handleSave} className="px-4 py-2 text-sm font-bold  cursor-pointer bg-[#0D062D] text-white rounded-lg hover:bg-[#212020] shadow">
                                    Save
                                </button>
                                <button onClick={handleCancel} className="px-4 py-2 text-sm font-bold cursor-pointer bg-gray-300 rounded-lg hover:bg-gray-400 shadow">
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button className="cursor-pointer" onClick={toggleMenu} >
                            {menuVisible ? <X /> : <MoreHorizontal />}
                        </button>

                        {menuVisible && (
                            <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg w-28 z-10">
                                <button
                                    onClick={toggleEdit}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(task._id)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >


    );
};

export default TaskCard;
