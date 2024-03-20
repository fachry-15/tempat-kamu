import React from "react";

function Pencarian({ cari_data, searchTerm }) {
    return (
        <section className="bg-white dark:bg-stone-900 py-1">
            <form className="max-w-lg mx-auto my-5">
                <label className="mb-2 text-sm font-medium text-stone-900 sr-only dark:text-white">Cari</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-stone-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Catatan apa yang ingin kamu cari.." value={searchTerm}
                        onChange={cari_data} required />

                </div>
            </form>
        </section>
    )
}
export default Pencarian;