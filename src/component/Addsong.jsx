import React,{useEffect,useState} from 'react'
import axios from 'axios'
const Addsong = () => {
      const [Songs, setSongs]=useState({
        Category:"",Name:"",Artist:""
    });
    const [SongImg, setSongImg]=useState();
    const [Song, setSong]=useState();

    const getData=(ev)=>{
  let name=ev.target.name;
  let value=ev.target.value;

  setSongs({...Songs,[name]:value})
}
const sub=(ev)=>{
ev.preventDefault();
let form=new FormData();
form.set("Category",Songs.Category);
form.set("Name",Songs.Name);
form.set("Artist",Songs.Artist);
form.set("Song",Song);
form.set("SongImg",SongImg);
console.log(Song)

const config = {     
  headers: { 'Content-type': 'multipart/form-data' }
}

axios.post("http://localhost:8000/addsongs",form,config).then((res)=>{
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
        <h3>Add Songs</h3>
        </div>
        <div className='card-body'>
          <form>
              <label>Category</label>
              <input type="text" name="Category" onChange={getData} value={Songs.Category} className='form-control'></input>
              <label className='mt-2'>Name</label>
              <input type="text" name="Name" onChange={getData} value={Songs.Name} className='form-control'></input>
              <label>Artist</label>
              <input type="text" name="Artist" onChange={getData} value={Songs.Artist} className='form-control'></input>
              <label className='mt-2'>SongImg</label>
              <input type="file" name="SongImg" onChange={(ev)=>{setSongImg(ev.target.files[0])}} className='form-control'></input>
              <label className='mt-2'>Song</label>
              <input type="file" name="Song" onChange={(ev)=>{setSong(ev.target.files[0])}} className='form-control'></input>
      
              <button onClick={sub} className='form-control btn btn-success mt-4'>Add Song</button>
          </form>
        </div>
    </div>     
    </>
  )
}

export default Addsong