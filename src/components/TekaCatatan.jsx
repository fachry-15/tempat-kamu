import React from "react";
import { Card } from "flowbite-react";

function CardCatatan({ notes, searchTerm, hapus_data, pindah_arsip }) {
    const filteredUnarchivedNotes = notes.filter((note) => {
        const titleMatch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
        const bodyMatch = note.body.toLowerCase().includes(searchTerm.toLowerCase());
        return !note.archived && (titleMatch || bodyMatch);
    });

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6 my-5">
            {filteredUnarchivedNotes.length === 0 && (
                <div className="col-span-3 text-center text-gray-500 dark:text-gray-400">
                    Belum ada catatan yang ditambahkan.
                </div>
            )}
            {filteredUnarchivedNotes.map((note) => (
                <Card key={note.id} href="#" className="max-w-lg">
                    <h5 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
                        {note.title}{" "}
                        <p className="text-sm mb-3 text-gray-500 dark:text-gray-400">
                            {note.createdAt}
                        </p>
                    </h5>
                    <p className="text-lg font-normal text-gray-700 dark:text-gray-400">
                        {note.body}
                    </p>
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                            type="button"
                            className="max-w-12 text-white bg-blue-700 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                            onClick={() => pindah_arsip(note.id)}
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
                            <span className="sr-only">Icon description</span>
                        </button>
                    </div>
                </Card>
            ))}
        </section>
    );
}

export default CardCatatan;
