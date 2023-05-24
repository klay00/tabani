import React from 'react';
import '../App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc} from "firebase/firestore";
import { db } from '../firebase/firebase';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  type: Yup.string().required('type is required'),
  age: Yup.string().required('age is required'),
  sex: Yup.string().required('sex Number is required'),
  size: Yup.string().required('size Number is required'),
  avcciation: Yup.string().required('avcciation is required'),
  image: Yup.string().required('image is required'),
});

export default function InputAddPet() {
  const initialValues = {
    fullName: '',
    type: '',
    age: '',
    sex: '',
    size: '',
    avcciation: '',
    image: '',
  };

const onSubmit = async (values) => {
  try {
    const docRef = await addDoc(collection(db, "pets"), {
      fullName: values.fullName,
      type: values.type,
      age: values.age,
      sex: values.sex,
      size: values.size,
      avcciation: values.avcciation,
      // userId: userId // Add the userId to the document
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

  return (
    <div>
      <h2>Add New Pet</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className='formik-dispy'>
          <div className='form-inputs'>
            <div className='input-lp'>
              <label htmlFor='fullName'>Name</label>
              <Field
                type='text'
                id='fullName'
                name='fullName'
                placeholder='Enter Pet name'
              />
              <ErrorMessage name='fullName' component='div' />
            </div>

            <div className='input-lp'>
              <label htmlFor='type'>Type</label>
              <Field as='select' id='type' name='type' required>
                <option value=''>Select</option>
                <option value='dog'>Dog</option>
                <option value='cat'>Cat</option>
                <option value='rabbit'>Rabbit</option>
                <option value='other'>Other</option>
              </Field>
              <ErrorMessage name='type' component='div' />
            </div>

            <div className='input-lp'>
              <label htmlFor='age'>Age</label>
              <Field
                type='number'
                id='age'
                name='age'
                placeholder='Enter Pet Age'
              />
              <ErrorMessage name='age' component='div' />
            </div>

            <div className='input-lp'>
              <label htmlFor='sex'>Pet sex</label>
              <Field as='select' id='type' name='sex' required>
                <option value=''>Select</option>
                <option value='Male'>Male</option>
                <option value='femal'>femal</option>
              </Field>
              <ErrorMessage name='sex' component='div' />
            </div>

            <div className='input-lp'>
              <label htmlFor='size'>Pet Size in kg</label>
              <Field
                type='text'
                id='size'
                name='size'
                placeholder='Enter Pet Size in kg'
              />
              <ErrorMessage name='size' component='div' />
            </div>

            <div className='input-lp'>
              <label htmlFor='avcciation'>Does the Pet Have Avcciation</label>
              <Field as='select' id='avcciation' name='avcciation' required>
                <option value=''>Select</option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
              </Field>
              <ErrorMessage name='avcciation' component='div' />
            </div>

            <div className='input-lp image'>
              <label htmlFor='image'>Pet Image</label>
              <Field
                type='file'
                id='image'
                name='image'
                placeholder='Enter Pet Image'
              />
              <ErrorMessage name='image' component='div' />
            </div>
          </div>
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
