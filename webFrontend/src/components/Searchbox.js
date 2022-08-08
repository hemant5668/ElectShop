import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";
import { useNavigate,useLocation } from 'react-router-dom';

function Searchbox() {
    const [keyword,setkeyword]=useState('')

   const history=useNavigate()
   const location=useLocation()
    const onSubmitHandler=(e)=>{
        e.preventDefault()
        if (keyword){
          history(`/?keyword=${keyword}`)
        }
        else{
          history(location.pathname)
        }
    }

  return (
    <div className="input-group" style={{'width':600, 'height':8}}>
  <input type="search" className="form-control" value={keyword} onChange={(e)=>setkeyword(e.target.value)} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button id="search-button" type="button" className="btn btn-primary" onClick={onSubmitHandler}>
    <i className="fas fa-search"></i>
  </button>
</div>
  )
}

export default Searchbox