import React from 'react';
import '../App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  placement: Yup.string().required('Placement is required'),
  care: Yup.string().required('Care is required'),
});

const onSubmit = (values) => {
  alert(JSON.stringify(values, null, 2));
}; 

export default function CompInput() {
  return (

       
  


  <div>
      <h2>Apply to Adopt</h2>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          address: '',
          phoneNumber: '',
          placement: '',
          care: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className='formik-dispy'>

          <div className='form-inputs'>

          
        <div className='input-lp'>
                   
             <label htmlFor="fullName">Full Name</label>
            <Field type="text" id="fullName" name="fullName" placeholder="Enter your full name" />
            <ErrorMessage name="fullName" component="div" />
                </div>
    

          <div className='input-lp'>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" placeholder="Enter your email address" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div  className='input-lp'>
            <label htmlFor="address">Address</label>
            <Field type="text" id="address" name="address" placeholder="Enter your address" />
            <ErrorMessage name="address" component="div" />
          </div>

          <div  className='input-lp'>
            <label htmlFor="phoneNumber">Phone Number</label>
            <Field type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number"/>
            <ErrorMessage name="phoneNumber" component="div" />
          </div>

          <div  className='input-lp'>
            <label htmlFor="placement">Do you have a suitable place for the pet to stay?</label>
            <Field type="text" id="placement" name="placement" placeholder="Describe where the pet lives"/>
            <ErrorMessage name="placement" component="div" />
          </div>

          <div  className='input-lp'>
            <label htmlFor="care">Do you undertake to take care of the pet?</label>
            <Field type="text" id="care" name="care"  placeholder="Describe the methods of care used that you know about caring for a pet"/>
            <ErrorMessage name="care" component="div" />
          </div>
          
           
          
            

           
          
          
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )

}