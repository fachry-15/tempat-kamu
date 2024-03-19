import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Flowbite } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "./TekaHeader";
import HeroComponent from "./TekaHero";
import InfoComponent from "./TekaInfo";
import FormComponent from "./TekaForm";
import FooterItem from "./TekaFooter";
import CardCatatan from "./TekaCatatan";
import CardArsip from "./TekaArsip";

function App() {
  const [isDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [titleMaxLength] = useState(50);
  const [remainingTitleCharacters, setRemainingTitleCharacters] = useState(
    titleMaxLength
  );

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
    setTitle("");
    setBody("");
    localStorage.setItem("notes", JSON.stringify([...notes, newData]));
    toast.success("Catatan berhasil disimpan!");
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
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: true };
      }
      return note;
    });
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    toast.success("Catatan kamu berhasil diarsipkan!");
  };

  const kembalikan_catatan = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: false };
      }
      return note;
    });
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    toast.success("Catatan berhasil dikembalikan dari arsip!");
  };

  return (
    <>
      <Flowbite dark={isDarkMode}>
        <NavigationBar />
        <ToastContainer />
        <HeroComponent />
        <InfoComponent />
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
          searchTerm={searchTerm}
        />
        <section className="bg-white dark:bg-stone-900 py-5 m-auto">
          <h4 className="text-2xl font-bold dark:text-white mx-8 my-5">
            Catatan Anda
          </h4>
          <CardCatatan
            notes={notes}
            searchTerm={searchTerm}
            hapus_data={hapus_data}
            pindah_arsip={pindah_arsip}
          />
          <h4 className="text-2xl font-bold dark:text-white mx-8 my-5">
            Arsip Catatan
          </h4>
          <CardArsip
            notes={notes}
            searchTerm={searchTerm}
            kembalikan_catatan={kembalikan_catatan}
            hapus_data={hapus_data}
          />
        </section>
        <FooterItem />
      </Flowbite>
    </>
  );
}

export default App;
