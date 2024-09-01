
import { useState, useEffect } from 'react';
import contactsServices from './services/contacts';


const ContactCard = ({ contact , deleteContact }) => {


  return (
    <p>{contact.name} {contact.number} <button onClick={deleteContact}>delete</button></p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newContact, setNewContact] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filteredPersons, setFilteredPersons] = useState([]);

 const deleteContactof= id=>{
   window.confirm("delete this")

contactsServices.deleteContact(id);
  setPersons(persons.filter(cont=>cont.id!==id))
  console.log(persons);
} 



  useEffect(() => {
    contactsServices
    .getAll()
    .then(initiaContact=>{
      setPersons(initiaContact);
      setFilteredPersons(initiaContact);
    }) 
  }, [persons]);

  useEffect(() => {
    if (showAll) {
      setFilteredPersons(persons);
    } else {
      const filtered = persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPersons(filtered);
    }
  }, [persons,searchTerm, showAll]);

  const Contacts = () => {
    return filteredPersons.map(o => <ContactCard key={o.id} contact={o} deleteContact={()=>deleteContactof(o.id)} />);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      if(window.confirm(`${newName} already exist , press ok to replace the number with new number`)){
         const updatedContact = { name:newName , number:newContact }
         const persontobeupdated = persons.find(person=>person.name===newName)
         console.log(persontobeupdated.id);
         
         contactsServices
         .updateContact(persontobeupdated.id,updatedContact)
         .then(res=>setPersons(persons.map(person=>person.id!==persontobeupdated.id? person :res.data)))
      }
    } else {
      const newobj = { name: newName , number: newContact };
      contactsServices
      .create(newobj)
      .then(newcont => {
          setPersons(persons.concat(newcont));
          setNewName('');
          setNewContact('');
        })
        .catch(error => {
          console.error('Error adding contact:', error);
        });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNewContact(e.target.value);
  };

  const searchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowAll(false);
  };

  return (
    <div>
      <h1>Search</h1>
      <input
        onChange={searchChange}
        value={searchTerm}
      />
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input
            onChange={handleNameChange}
            value={newName}
          />
          contact no: <input
            onChange={handleNumChange}
            value={newContact}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts />
    </div>
  );
};

export default App;