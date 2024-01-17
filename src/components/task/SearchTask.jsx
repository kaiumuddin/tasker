import { useState } from "react";
import { FaSearch } from "react-icons/fa";
export default function SearchTask({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleClick(event) {
        event.preventDefault();
        if (searchTerm !== "") {
            onSearch(searchTerm);
        }
    }

    return (
        <form>
            <div className="flex">
                <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                    <input
                        type="search"
                        id="search-dropdown"
                        placeholder="Search Task"
                        value={searchTerm}
                        onChange={() => setSearchTerm(event.target.value)}
                        required
                        className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none "
                    />
                    <button
                        type="submit"
                        onClick={handleClick}
                        className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4"
                    >
                        <FaSearch className="text-yellow-500" />
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    );
}
