import React from 'react';
import { Card, Label, TextInput, Textarea, Popover } from 'flowbite-react';

function FormComponent({ tambah_catatan, title, setTitle, body, setBody, maksimal_judul, remainingTitleCharacters, titleMaxLength, cari_data, searchTerm }) {
    return (
        <Card className="max-w-lg m-auto mt-5 dark:bg-stone-900">
            <form onSubmit={tambah_catatan} className="flex max-w-lg flex-col gap-4">
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
                        <TextInput className='' id="title" type="text" value={title} onChange={maksimal_judul} placeholder="Masukkan judul catatan kamu" maxLength={titleMaxLength} required />
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
    );
}

export default FormComponent;
