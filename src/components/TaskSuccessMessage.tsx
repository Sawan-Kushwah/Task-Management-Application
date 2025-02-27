import { Check } from 'lucide-react';

const TaskSuccessMessage = ({ closeSuccess }: { closeSuccess: () => void }) => {
    console.log(close)
    return (
        <div className="flex flex-col items-center justify-center w-96 h-fit absolute top-[40%] left-[37%] p-6 bg-white rounded-2xl shadow-xl border-2 border-gray-200 z-[52]">
            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
                <Check size={32} color="white" />
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-900 text-center">
                new task has been created
                <br /> successfully
            </p>
            <button
                className="mt-6 px-6 py-2 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={closeSuccess}
            >
                Back
            </button>
        </div>
    );
};

export default TaskSuccessMessage;