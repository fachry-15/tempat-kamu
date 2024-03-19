import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Flowbite, Card } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './components/navbarComponent';
import HeroComponent from './components/heroComponent';
import InfoComponent from './components/infoComponent';
import FormComponent from './components/formComponent';
import FooterItem from './components/footerComponents';

function App() {
  const [isDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [titleMaxLength] = useState(50);
  const [remainingTitleCharacters, setRemainingTitleCharacters] = useState(titleMaxLength);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newDate = new Date();
    const formattedDate = format(newDate, "EEEE, dd MMMM yyyy");
    const newData = {
      id: notes.length + 1,
      title: title,
      body: body,
      archived: false,
      createdAt: formattedDate,
    };
    setNotes([...notes, newData]);
    setTitle('');
    setBody('');
    localStorage.setItem('notes', JSON.stringify([...notes, newData]));
    toast.success('Catatan berhasil disimpan!');
    console.log('Data baru:', newData);
  };


  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      const nonArchivedNotes = storedNotes.filter(note => !note.archived);
      setNotes(nonArchivedNotes);
    }
  }, []);

  const hapus_data = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      toast.success('Catatan berhasil dihapus!');
      console.clear();
      console.log('Data saat ini:', updatedNotes);
    }
  };

  const cari_data = (e) => {
    setSearchTerm(e.target.value);

  };

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= titleMaxLength) {
      setTitle(newValue);
      setRemainingTitleCharacters(titleMaxLength - newValue.length);
    }
  };

  const pindah_arsip = (id) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, archived: true };
      }
      return note;
    });
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast.success('Catatan kamu berhasil diarsipkan!');
  };

  const kembalikan_catatan = (id) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, archived: false };
      }
      return note;
    });
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast.success('Catatan berhasil dikembalikan dari arsip!');
  };

  const filteredNotes = notes.filter((note) => {
    const titleMatch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
    const bodyMatch = note.body.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || bodyMatch;
  });

  return (
    <>
      <Flowbite dark={isDarkMode}>
        <NavigationBar></NavigationBar>
        <ToastContainer />
        <HeroComponent></HeroComponent>
        <InfoComponent></InfoComponent>
        <FormComponent
          handleFormSubmit={handleFormSubmit}
          title={title}
          setTitle={setTitle}
          body={body}
          setBody={setBody}
          handleTitleChange={handleTitleChange}
          remainingTitleCharacters={remainingTitleCharacters}
          titleMaxLength={titleMaxLength}
          cari_data={cari_data}
          searchTerm={searchTerm}></FormComponent>
        <section className="bg-white dark:bg-stone-900 py-5 m-auto">
          <h4 className="text-2xl font-bold dark:text-white mx-8 my-5">Catatan anda</h4>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6 my-5">
            {filteredNotes.filter(note => !note.archived).length === 0 && (
              <div className="col-span-3 text-center text-gray-500 dark:text-gray-400">
                Belum ada catatan yang ditambahkan.
              </div>
            )}
            {filteredNotes
              .filter(note => !note.archived)
              .map((note) => (
                <Card key={note.id} href="#" className="max-w-lg">
                  <h5 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">{note.title} <p className="text-sm mb-3 text-gray-500 dark:text-gray-400">{note.createdAt}</p></h5>
                  <p className="text-lg font-normal text-gray-700 dark:text-gray-400">{note.body}</p>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button" className="max-w-12 text-white bg-blue-700 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                      onClick={() => pindah_arsip(note.id)}>
                      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </button>
                    <button type="button" className="max-w-12 text-white bg-red-600 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 " onClick={() => hapus_data(note.id)}>
                      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </button>
                  </div>
                </Card>
              ))}
          </section>
          <h4 className="text-2xl font-bold dark:text-white mx-8 my-5">Arsip Catatan</h4>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6 my-5">
            {filteredNotes.filter(note => note.archived).length === 0 && (
              <div className="col-span-3 text-center text-gray-500 dark:text-gray-400">
                Belum ada catatan yang diarsipkan.
              </div>
            )}
            {filteredNotes
              .filter(note => note.archived)
              .map((note) => (
                <Card key={note.id} href="#" className="max-w-lg">
                  <h5 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">{note.title} <p className="text-sm mb-3 text-gray-500 dark:text-gray-400">{note.createdAt}</p></h5>
                  <p className="text-lg font-normal text-gray-700 dark:text-gray-400">{note.body}</p>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button" className="max-w-12 text-white bg-blue-700 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                      onClick={() => kembalikan_catatan(note.id)}>
                      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </button>
                    <button type="button" className="max-w-12 text-white bg-red-600 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 " onClick={() => hapus_data(note.id)}>
                      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </button>
                  </div>
                </Card>
              ))}
          </section>
        </section>
        <FooterItem></FooterItem>
      </Flowbite>
    </>
  );
}

export default App;