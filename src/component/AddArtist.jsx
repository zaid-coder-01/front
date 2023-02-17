import React,{useEffect,useState} from 'react'
import axios from 'axios'

const AddArtist = () => {
    const [Artist, setArtist]=useState({
        Name:"",Bio:""
    });
    const [Img, setImg]=useState();

    const getData=(ev)=>{
  let name=ev.target.name;
  let value=ev.target.value;

  setArtist({...Artist,[name]:value})
}
const sub=(ev)=>{
ev.preventDefault();
let form=new FormData();
form.set("Name",Artist.Name);
form.set("Bio",Artist.Bio);
form.set("Img",Img);

const config = {     
  headers: { 'Content-type': 'multipart/form-data' }
}

axios.post("http://localhost:8000/artists",form,config).then((res)=>{
  if(res.data!="")
  {
    alert("register");
  }
}).catch((err)=>{
  console.log(err);
})

}
  return (
    <>
    <div className='card mt-5'>
        <div className='text-center mt-3'>
        <h3>Add Artist</h3>
        </div>
        <div className='card-body'>
          <form>
              
              <label className='mt-2'>Name</label>
              <input type="text" name="Name" onChange={getData} value={Artist.Name} className='form-control'></input>
              <label>Bio</label>
              <textarea rows={5} name="Bio" onChange={getData} value={Artist.Bio} className='form-control'></textarea>
              <label className='mt-2'>Artist Img</label>
              <input type="file" name="Img" onChange={(ev)=>{setImg(ev.target.files[0])}} className='form-control'></input>
             
              <button onClick={sub} className='form-control btn btn-success mt-4'>Add Artist</button>
          </form>
        </div>
    </div>   
    
    </>
  )
}

export default AddArtist