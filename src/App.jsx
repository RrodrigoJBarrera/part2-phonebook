import React, { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const filterList = persons.filter((person) => {
    return person.name
      .toLocaleLowerCase()
      .includes(filterName.toLocaleLowerCase());
  });

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
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
      <Persons list={filterList} />
    </div>
  );
};

export default App;
