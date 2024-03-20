import React from "react";

function ButtonHapus({ hapus_data, note }) {
    return (
        <button
            type="button"
            className="max-w-12 text-white bg-red-600 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 "
            onClick={() => hapus_data(note.id)}
        >
            <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="currentColor"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
            </svg>
            <span className="sr-only">Hapus Data</span>
        </button>
    )
}
export default ButtonHapus;