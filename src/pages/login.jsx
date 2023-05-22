import React from "react";
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

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    window.location.href = '/';
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
              </FormControl>
            </div> 
            <div className="btns">
                    <Button variant="contained" type="submit">
                      Login
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
  