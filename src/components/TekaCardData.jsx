import React from "react";
import { Card } from "flowbite-react";
import ButtonPindah from "./TekaBtnPindah";
import ButtonHapus from "./TekaBtnHapus";

function CardCatatan({ notes, searchTerm, hapus_data, pindah_data, isArchived }) {
    const filteredNotes = notes.filter((note) => {
        const titleMatch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
        const bodyMatch = note.body.toLowerCase().includes(searchTerm.toLowerCase());
        return (isArchived ? note.archived : !note.archived) && (titleMatch || bodyMatch);
    });

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6 my-5">
            {filteredNotes.length === 0 && (
                <div className="col-span-3 text-center text-gray-500 dark:text-gray-400">
                    {isArchived ? "Belum ada catatan yang diarsipkan." : "Belum ada catatan yang ditambahkan."}
                </div>
            )}
            {filteredNotes.map((note) => (
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
                        <ButtonPindah
                            pindah_data={pindah_data}
                            note={note}></ButtonPindah>
                        <ButtonHapus
                            hapus_data={hapus_data}
                            note={note}></ButtonHapus>
                    </div>
                </Card>
            ))}
        </section>
    );
}

export default CardCatatan;
