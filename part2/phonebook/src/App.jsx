import { useState, useEffect } from "react";
import noteService from "./services/persons";
import Filter from "./component/Filter";
import Persons from "./component/Persons";
import Notification from "./component/Notification";
import PersonForm from "./component/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("a new person...");
  const [newNumber, setNewNumber] = useState("add a number...");
  const [showFilter, setFilter] = useState("");
  const [addMessage, setAddMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [text, setText] = useState("");
  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response.data);
      console.log(response.data);
    });
  }, []);
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const person = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    const changedPerson = { ...person, number: newNumber };

    if (person) {
      const id = person.id;
      console.log(id);
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        noteService.update(id, changedPerson).then((response) => {
          console.log(response.data);
          setPersons(
            persons.map((person) => (person.id !== id ? person : response.data))
          );
          setAddMessage(`Updated new number '${newNumber}'`);
          setText("add");
          setTimeout(() => {
            setAddMessage(null);
          }, 5000);
        });
      }

      return;
    } else if (newName === "" || newNumber === "") {
      alert("Plz, provide a value");
      return;
    }
    noteService.create(personObject).then((response) => {
      console.log(response.data);
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
      setAddMessage(`Added ${newName}`);
      setText("add");
      setTimeout(() => {
        setAddMessage(null);
      }, 5000);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    console.log(showFilter);
  };
  const deletePersonOf = (id) => {
    const person = persons.find((p) => p.id === id);
    console.log(person.name);

    if (window.confirm(`Delete ${person.name}`)) {
      noteService
        .remove(id, person)
        .then((returnedNote) => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setErrorMessage(
            `Information of '${newName}' has already been removed from server`
          );
          setText("error");
          setTimeout(() => {
            setAddMessage(null);
          }, 5000);
        });
    }

    console.log(`delete of ${id} needs to be removed`);
  };
  const personsToShow = persons.find(
    (person) => person.name.toLowerCase() === showFilter.toLowerCase()
  )
    ? persons.filter(
        (person) => person.name.toLowerCase() === showFilter.toLowerCase()
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} text={text} />
      <Notification message={errorMessage} text={text} />
      <Filter showFilter={showFilter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePersonOf} />
    </div>
  );
};

export default App;
