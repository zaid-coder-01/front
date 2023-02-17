import React, { useState,useEffect } from 'react'
import axios from 'axios'

const NewUser = () => {
  useEffect(()=>{
    const md=sessionStorage.getItem('theme')
    document.body.className=md
  },[])
    const [User, setUser]=useState({
        name:"",email:"",uname:"",pass:""
    });
    const [Pic, setPic]=useState();

const getData=(ev)=>{
  let name=ev.target.name;
  let value=ev.target.value;

  setUser({...User,[name]:value})
}
const sub=(ev)=>{
ev.preventDefault();
let form=new FormData();
form.set("name",User.name);
form.set("email",User.email);
form.set("uname",User.uname);
form.set("pass",User.pass);
form.set("Pic",Pic);

const config = {     
  headers: { 'Content-type': 'multipart/form-data' }
}

axios.post("http://localhost:8000/newuser",form,config).then((res)=>{
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
    <div className='login'>
      <div className='container mt-5 child'>
        <div className='row'>
            <div className='col-md-7'>
                <div className='card'>
                    <div className='text-center mt-3'>
                    <h3>New User</h3>
                    </div>
                    <div className='card-body'>
                     <form>
                         <label>Name</label>
                         <input type="text" name="name" onChange={getData} value={User.name} className='form-control'></input>
                         <label className='mt-2'>Email</label>
                         <input type="email" name="email" onChange={getData} value={User.email} className='form-control'></input>
                         <label>User Name</label>
                         <input type="text" name="uname" onChange={getData} value={User.uname} className='form-control'></input>
                         <label className='mt-2'>Password</label>
                         <input type="password" name="pass" onChange={getData} value={User.pass} className='form-control'></input>
                         <label className='mt-2'>Profile Image</label>
                         <input type="file" name="pic" onChange={(ev)=>{setPic(ev.target.files[0])}} className='form-control'></input>
                         <div className='text-center mt-3'>
                             <a href='/login'>LOGIN</a>
                         </div>
                         <button onClick={sub} className='form-control btn btn-success mt-4'>LOGIN</button>
                     </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default NewUser