import React, { useState } from "react";
import '../App.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../tools/theem';
import { Link } from "react-router-dom";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from "../firebase/firebase";
import Lodaer from "../components/loader";

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LogIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const initialValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const [messerr ,setmesserr]=useState('');
  const [loding ,setLoding]=useState(false)
  const onSubmit = (values, { setSubmitting }) => {
    setLoding(true)
    signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // navigate("/")
            console.log(user);
            user.getIdToken()
        .then((token) => {
          // Save the token to local storage
          localStorage.setItem('token', token);
          setLoding(false);
          navigate('/');
          
        })
        .catch((error) => {
          console.error('Error getting user token:', error);
          setLoding(false);

        });
        })
        .catch((error) => {
          let errorMessage;
        
          switch (error.code) {
            case 'auth/wrong-password':
              errorMessage = 'Wrong password. Please try again.';
              break;
            case 'auth/user-not-found':
              errorMessage = 'User not found. Please check your credentials.';
              break;
            // Add more cases for other Firebase error codes as needed
            default:
              errorMessage = 'An error occurred. Please try again later.';
          }
          setLoding(false);
          console.log(errorMessage);
          setmesserr(errorMessage);
        });
    
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();   
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="main-log">
      <div className="platform">
        <div className="info">
          <h1>tabani</h1>
          <h4>
            <span>Welcome</span> Log in to your account
          </h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="formik-dispy-log">
            <div className="inputs">
              <div className="email">
                <Field
                  as={TextField}
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                />
                <ErrorMessage name="email" component="div" />
              </div>
              <FormControl sx={{ borderRadius: 5 }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Field
                  as={OutlinedInput}
                  sx={{ borderRadius: 5 }}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <ErrorMessage name="password" component="div" />
                <p>{messerr}</p>
              </FormControl>
            </div> 
            <div className="btns">
                    <Button variant="contained" type="submit">
                      {loding ? <Lodaer/>: "Login"}
                    </Button>                                  
              <Link to={'/signup'}>
              <Button variant="outlined">Register</Button>
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
    </ThemeProvider>
  );
}
  