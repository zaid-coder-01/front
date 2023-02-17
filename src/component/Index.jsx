import React, { useState } from 'react'
import { useEffect } from 'react'
import $ from 'jquery'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

const Index = () => {
  const [isvis, setisvis] = useState(false);
  const [mode, setmode] = useState();
  useEffect(() => {
    const md = sessionStorage.getItem('theme')
    document.body.className = md
  }, [])
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='mt-3 bar'>
            <i className='fa fa-bars' id="barr" onClick={()=>{
              if(isvis)
              {
                $('.leftnav').css("display","none")
                setisvis(false);
              }
              else{
                $('.leftnav').css("display","block")
                setisvis(true);
              }
             
            }}></i>
          </div>
          <LeftSide></LeftSide>
          <RightSide></RightSide>
  
        </div>
      </div>
    </>
  )
}

export default Index