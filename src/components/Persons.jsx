import React from 'react';

const Persons = ({ list, deletePerson }) => {
  return (
    <div>
      {list.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Persons;
