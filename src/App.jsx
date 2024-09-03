
import { useState, useEffect } from 'react';
import contactsServices from './services/contacts';
import './index.css'

const Notification = ({message})=>{
  if (message === null){
    return null;
  }
  else{
    return <div className='notify'>
    {message}
    <br />
    </div>
  }
}


const ContactCard = ({ contact , deleteContact }) => {


  return (
    <p className='contacts'>{contact.name} {contact.number} <button onClick={deleteContact}>delete</button></p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newContact, setNewContact] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notificatinMessage,setNotificationMessage]=useState(null)

 const deleteContactof= id=>{
   window.confirm("delete this")

contactsServices.deleteContact(id)
.then(response => {
  
  setNotificationMessage(`${response.data.name} is deleted succesffully`)


})
.catch(error => {
 const  personname = persons.find(pr=>pr.id==id)

  setNotificationMessage(`${personname.name} has already been  deleted from the server`)
})


  setPersons(persons.filter(cont=>cont.id!==id))
} 



  useEffect(() => {
    contactsServices
    .getAll()
    .then(initiaContact=>{
      setPersons(initiaContact);
      setFilteredPersons(initiaContact);
    }) 
  }, []);

  useEffect(() => {
    if (showAll) {
      setFilteredPersons(persons);
    } else {
      const filtered = persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPersons(filtered);
    }
  }, [persons,searchTerm,showAll]);

  const Contacts = () => {
    
    return filteredPersons.map(o => <ContactCard key={o.id} contact={o} deleteContact={()=>deleteContactof(o.id)} />);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) { 
      if(window.confirm(`${newName} already exist , press ok to replace the number with new number`)){
         const updatedContact = { name:newName , number:newContact }
         const persontobeupdated = persons.find(person=>person.name==newName)
         
         
         contactsServices
         .updateContact(persontobeupdated.id,updatedContact)
         .then(res=>{setPersons(persons.map(person=>person.id!==persontobeupdated.id? person :res))
            setNotificationMessage(`${persontobeupdated.name} contact is updated`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000);})
         
         
      }
} else {
      const newobj = { name: newName , number: newContact };
      contactsServices
      .create(newobj)
      .then(newcont => {
          setPersons(persons.concat(newcont));
          setNotificationMessage(`${newcont.name} is added`)
          setTimeout(() => {
            setNotificationMessage(null)
          },5000);
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
    setShowAll(!showAll);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <br />
      <Notification message={notificatinMessage}/>
      
      <h2>Search bar</h2>
      <input
        onChange={searchChange}
        value={searchTerm}
      />
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