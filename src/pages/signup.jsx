import React, { useState } from "react";
import '../App.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../tools/theem';
import { Link } from "react-router-dom";
import { Location } from "../components/pagelist";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword, getDocs, query, where, collection } from 'firebase/firestore';

import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from 'firebase/firestore';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    fullName: Yup.string().required('Full Name is required'),
    location: Yup.string().required('Location is required'),
});

export default function SignUp() {
    const [showPassword, setShowPassword] = React.useState(false);
    const initialValues = {
        email: '',
        password: '',
        fullName: '',
        location: '',
    };
    const navigate = useNavigate();
    const [messerr ,setmesserr]=useState('');

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false);
      
        try {
          // Check if email is already used
          const usersRef = collection(db, 'users');
          const emailQuery = query(usersRef, where('email', '==', values.email));
          const emailSnapshot = await getDocs(emailQuery);
      
          if (!emailSnapshot.empty) {
            throw new Error('Email is already in use. Please choose a different email.');
          }
      
          // Create user in Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
          const user = userCredential.user;
      
          // Save user information to Firestore
          await setDoc(doc(db, 'users', user.uid), {
            fullName: values.fullName,
            location: values.location,
            email:values.email,
            userId:user.uid
          });
      
          navigate('/login');
        } catch (error) {
            let errorMessage;
        
            switch (error.code) {
              case 'auth/weak-password':
                errorMessage = 'Weak password. Password should be at least 6 characters.';
                break;
              case 'auth/email-already-in-use':
                errorMessage = 'The email address is already being used. Please choose another email address.';
                break;
              // Add more cases for other Firebase error codes as needed
              default:
                errorMessage = 'An error occurred. Please try again later.';
            }
          
            console.log(errorMessage);
            setmesserr(errorMessage);
        }
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
                            <span>Welcome</span> Signup with New Account
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
                                        id="fullName"
                                        name="fullName"
                                        label="fullName"
                                        variant="outlined"

                                        type="text"
                                        fullWidth
                                    />
                                    <ErrorMessage name="fullName" component="div" />
                                </div>
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
                                </FormControl>
                                <div className="email">
                                    <Field
                                        as={TextField}
                                        id="location"
                                        select
                                        label="location"
                                        defaultValue="EUR"
                                        name="location"
                                    >
                                        {Location.map((option) => (
                                            <MenuItem key={option.id} value={option.label}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="fullName" component="div" />

                                </div>
                                <span>{messerr}</span>
                            </div>
                            <div className="btns">
                                <Button variant="contained" type="submit">
                                    SignUp
                                </Button>
                                <Link to={'/login'}>
                                    <Button variant="outlined">Login</Button>
                                </Link>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </ThemeProvider>
    );
}
