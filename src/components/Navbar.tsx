import { Search, Filter } from "lucide-react";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-[#ecedee] drop-shadow-md rounded-2xl my-10">
            <div className="flex items-center gap-4 bg-white  shadow-2xl px-3 rounded-4xl drop-shadow-xl ">
                <Search className="text-gray-500 " />
                <input
                    type="text"
                    placeholder="Search Project"
                    className="w-64 py-3 outline-none text-[#5A5A5A] font-bold text-sm"
                />
            </div>
            <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Filter className="mr-2" /> Filter
            </button>
        </div>
    );
};

export default Navbar;