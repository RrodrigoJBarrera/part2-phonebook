import React, { useEffect, useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personsService from './services/persons';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const filterList = persons.filter((person) => {
    return person.name
      .toLocaleLowerCase()
      .includes(filterName.toLocaleLowerCase());
  });

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((p) => p.name === newName);
    if (person) {
      alert(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      const changeNumber = { ...person, number: newNumber };
      personsService
        .update(person.id, changeNumber)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id === person.id ? returnedPerson : p))
          );
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          alert(`the note '${person.name}' was already deleted from server`);
          setPersons(persons.filter((p) => p.id !== id));
        });
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewNumber('');
      setNewName('');
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .remove(id)
        .then(() => {
          const rest = persons.filter((person) => person.id !== id);
          setPersons(rest);
        })
        .catch((error) => {
          alert(`the note '${person.name}' was already deleted from server`);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilterNameChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        valueName={newName}
        valueNumber={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons list={filterList} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
