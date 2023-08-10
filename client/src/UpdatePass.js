import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Input from "./components/subcomponents/Inputs/Input";
import Button from "./components/subcomponents/Buttons/Button"
import { useSearchParams } from 'react-router-dom';
import Style from './UpdatePass.module.scss'



const UpdatePass = () => {
    
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState();

    let defaultFormVals = ["password", "confirmPass"];

    const [formValues, setFormValues] = useState(defaultFormVals);

    const getValues = (e) =>{
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
}

const sendPassReset = (e) => {
    e.preventDefault();

    let payload = {
        password: formValues['password'],
        confirmPass: formValues['confirmPass']
    }

    axios.patch('http://localhost:2000/api/updatepass/' + searchParams.get('id'), payload)
    .then((res)=>{
      console.log(res.data);
  
      if(res.data.success){
        setMessage("Your Password has been reset!");
      } else {
        setMessage("There was a problem resetting your password ");
      }
  
    })
    .catch(function(error){console.log(error)});
}

  return (
    <>
    <div>
      <p>Reset your password here</p>
      <form onSubmit={sendPassReset}>
        <Input required name="password" label="New Password" fullWidth margin="dense" onChange={getValues} />
        <Input required name="confirmPass" label="Confirm Password" fullWidth margin="dense" onChange={getValues} />
        <Button className={Style.button} type="submit" style={{marginTop: "8px", height: "55px"}} fullWidth variant="contained">Reset Password</Button>
      </form>
      <p>{message}</p>
    </div>
    </>
  )
}

export default UpdatePass