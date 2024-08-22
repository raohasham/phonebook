import { useState } from 'react'



const ContactCard = ({contact})=>{
  
  return(
<p>{contact.name} {contact.number}</p>
  )

}




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [NewContact,setNewContact]  = useState('')
  const[searchTerm, setSearchTerm]=useState('')
  const [showAll,setShowAll]=useState(true)

  const Contacts=(props)=>{
    if(showAll)
    return(
    props.persons.map(o => <ContactCard key={o.name} contact={o}/>))
    else {  
     const filteredPersons = props.persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()))
      return(filteredPersons.map(o=><ContactCard key={o.id} contact={o} />))
  }
}
  
  
  function handleSubmit(event) {
    event.preventDefault();
    const nameExists = persons.some(person => person.name === newName);
    if(nameExists){

      alert(`${newName} already exists`)
    }

  else{  
  
      let newobj={ name: newName , number: NewContact }
      setPersons(persons.concat(newobj))
  }
  }
  function handleNameChange(e) {
  
    setNewName(e.target.value)
    
  }
  function handleNumChange(e) {
    setNewContact(e.target.value)
    
  }
  function searchchange(e) {
    setSearchTerm(e.target.value)
    setShowAll(false)
   const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  filteredPersons.map(o=><ContactCard key={o.id} contact={o}/>)
  }
  

  return (
    <div>
      <h1>search</h1>
      search for <input onChange={searchchange} value={searchTerm}/> 

      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} >
        <div>
          name: <input onChange={handleNameChange} value={newName}   />
          contact no :<input onChange={handleNumChange} value={NewContact}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={persons} />
    </div>
  )
}

export default App