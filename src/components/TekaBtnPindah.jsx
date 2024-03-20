import React from "react";

function ButtonPindah({ pindah_data, note }) {
    return (
        <button
            type="button"
            className="max-w-12 text-white bg-blue-700 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
            onClick={() => pindah_data(note.id)}
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
                    d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                />
            </svg>
            <span className="sr-only">Icon description</span>
        </button>
    )
}

export default ButtonPindah;