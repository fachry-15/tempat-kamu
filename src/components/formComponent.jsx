import React from 'react';
import { Card, Label, TextInput, Textarea, Popover } from 'flowbite-react';

function FormComponent({ handleFormSubmit, title, setTitle, body, setBody, handleTitleChange, remainingTitleCharacters, titleMaxLength, cari_data, searchTerm }) {
    return (
        <section className="bg-white dark:bg-stone-900 py-5 m-auto">
            <h2 className="text-4xl font-bold dark:text-white max-w-fit m-auto">Form mencatat</h2>
            <p className="mb-3 text-gray-500 dark:text-gray-400 text-center m-auto my-4 ">Disini kamu dapat mencatat semua hal meliputi apapun dengan leluasa dan aman pastinya.</p>
            <Card className="max-w-lg m-auto mt-5 dark:bg-stone-900">
                <form onSubmit={handleFormSubmit} className="flex max-w-lg flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Judul Catatan" />
                        </div>
                        <Popover className='bg-orange-400 dark:bg-white'
                            trigger="hover"
                            content={
                                <div className="space-y-2 p-3">
                                    <h3 className="font-semibold text-white dark:text-stone-900">Karakter tersisa : {remainingTitleCharacters} Karakter</h3>

                                </div>
                            }
                        >
                            <TextInput className='' id="title" type="text" value={title} onChange={handleTitleChange} placeholder="Masukkan judul catatan kamu" maxLength={titleMaxLength} required />
                        </Popover>

                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="notes" value="Catatan anda" />
                        </div>
                        <Textarea id="notes" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Tulisan catatan atau harapan anda" required rows={4} />
                    </div>
                    <button className="focus:outline-none text-white bg-orange-400 dark:bg-white dark:text-stone-900 dark:hover:bg-gray-400 hover:bg-stone-900 focus:ring-4 focus:ring-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-400" type="submit">Simpan Catatan</button>
                </form>
            </Card>

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
    );
}

export default FormComponent;
