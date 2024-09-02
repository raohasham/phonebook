import axios from "axios"
const baseurl ='http://localhost:3001/persons'

const getAll = ()=>{
 const request = axios.get(baseurl)
    return request.then(res=>res.data)
}

const create = newcontact=>{
   const request =axios.post(baseurl,newcontact)
   return (request.then(res=>res.data))
}

const deleteContact = id=>{
    axios.delete(`${baseurl}/${id}`)
}
 
const getname =id=>{
    
   const req = axios.get(`${baseurl}/${id}`)
  return req.then(res=>res.data)
    
    
}

const updateContact = (id,updatedContact)=>{
   const req = axios.put(`${baseurl}/${id}`, updatedContact)
   return req.then(res=>res.data)

}

export default{ getAll,create,deleteContact,updateContact}