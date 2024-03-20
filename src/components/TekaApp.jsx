import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "./TekaHeader";
import HeroComponent from "./TekaHero";
import InfoComponent from "./TekaInfo";
import FormComponent from "./TekaForm";
import Pencarian from "./TekaPencarian";
import FooterItem from "./TekaFooter";
import CardCatatan from "./TekaCardData";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [titleMaxLength] = useState(50);
  const [remainingTitleCharacters, setRemainingTitleCharacters] = useState(
    titleMaxLength
  );

  const tambah_catatan = (e) => {
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
    const updatedNotes = [...notes, newData];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    toast.success("Catatan berhasil disimpan!");
    console.log("Semua Data Catatan Setelah Penambahan Baru:", updatedNotes);
    setTitle("");
    setBody("");
  };

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      const nonArchivedNotes = storedNotes.filter((note) => !note.archived);
      setNotes(nonArchivedNotes);
    }
  }, []);

  const hapus_data = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      toast.success("Catatan berhasil dihapus!");
      console.log("Semua Data Catatan Setelah Penghapusan:", updatedNotes);
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

  const pindah_data = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: !note.archived }; // Mengubah nilai archived menjadi kebalikan dari nilai saat ini
      }
      return note;
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    if (updatedNotes.find(note => note.id === id).archived) {
      toast.success("Catatan kamu berhasil diarsipkan!");
      console.log("Semua Data Catatan Setelah Pindah ke Arsip:", updatedNotes);
    } else {
      toast.success("Catatan berhasil dikembalikan dari arsip!");
      console.log("Semua Data Catatan Setelah Kembali dari Arsip:", updatedNotes);
    }
  };

  return (
    <>

      <NavigationBar />
      <ToastContainer />
      <HeroComponent />
      <InfoComponent />
      <section className="bg-white dark:bg-stone-900 py-5 m-auto">
        <h2 className="text-4xl font-bold dark:text-white max-w-fit m-auto">Form mencatat</h2>
        <p className="mb-3 text-gray-500 dark:text-gray-400 text-center m-auto my-4 ">Disini kamu dapat mencatat semua hal meliputi apapun dengan leluasa dan aman pastinya.</p>
        <FormComponent
          tambah_catatan={tambah_catatan}
          title={title}
          setTitle={setTitle}
          body={body}
          setBody={setBody}
          handleTitleChange={handleTitleChange}
          remainingTitleCharacters={remainingTitleCharacters}
          titleMaxLength={titleMaxLength}
        />
      </section>
      <Pencarian
        cari_data={cari_data}
        searchTerm={searchTerm}></Pencarian>
      <section className="bg-white dark:bg-stone-900 py-5 m-auto">
        <h4 className="text-2xl font-bold dark:text-white mx-8 my-5">
          Catatan Anda
        </h4>
        <CardCatatan
          notes={notes}
          searchTerm={searchTerm}
          hapus_data={hapus_data}
          pindah_data={pindah_data}
          isArchived={false}
        />
        <h4 className="text-2xl font-bold dark:text-white mx-8 my-5">
          Arsip Catatan
        </h4>
        <CardCatatan
          notes={notes}
          searchTerm={searchTerm}
          pindah_data={pindah_data}
          hapus_data={hapus_data}
          isArchived={true}
        />
      </section>
      <FooterItem />

    </>
  );
}

export default App;
