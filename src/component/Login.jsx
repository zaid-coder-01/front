import React,{useEffect, useState} from 'react'
import axios from 'axios';
import "../App.css"
import {useNavigate} from "react-router-dom"

const Login = () => {
  useEffect(()=>{
    const md=sessionStorage.getItem('theme')
    document.body.className=md
  },[])
  const history=useNavigate();
  const [User, setUser]=useState({
    uname:"",pass:""
});
const getData=(ev)=>{
 
  let name=ev.target.name;
  let value=ev.target.value;

  setUser({...User,[name]:value})
}
const sub=(ev)=>{
  ev.preventDefault();
  const form={
    uname:User.uname,pass:User.pass
  }
 
  axios.post("http://localhost:8000/login",form).then((res)=>{
  
  if(res.data==="")
  {
    alert("enter valid data")
      
  }
  else{
    const users={pic:res.data.Pic,uname:res.data.uname}
    sessionStorage.setItem("users",JSON.stringify(users));
      history('/');
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
                    <h3>LOGIN</h3>
                    </div>
                    <div className='card-body'>
                     <form>
                         <label>User Name</label>
                         <input type="text" name="uname" onChange={getData} value={User.uname} className='form-control'></input>
                         <label className='mt-2'>Password</label>
                         <input type="password" name="pass" onChange={getData} value={User.pass} className='form-control'></input>
                         <div className='text-center mt-3'>
                             <a href='/newuser'>Create New</a>
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

export default Login