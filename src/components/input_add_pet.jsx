import React, { useEffect, useState } from 'react';
import '../App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { Stack } from '@mui/system';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Loding from './loading';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  type: Yup.string().required('type is required'),
  age: Yup.string().required('age is required'),
  sex: Yup.string().required('sex is required'),
  size: Yup.string().required('size Number is required'),
  avcciation: Yup.string().required('avcciation is required'),
  onerPhone: Yup.string()
    .required('Phone Number is required')
    .matches(/^07[3-9]\d{8}$/, 'Invalid Iraqi phone number'),
});

export default function InputAddPet() {
  const initialValues = {
    fullName: '',
    type: '',
    age: '',
    sex: '',
    size: '',
    avcciation: '',
    onerPhone: '',
  };
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    const uploadedImages = Array.from(fileList).map((file) => file);
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
   };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userId = user.uid;
           try {
            const imageUrls = [];
            const storage = getStorage();

            for (const file of images) {
              const storageRef = ref(storage, `images/${currentTime + file.name}`);
              await uploadBytes(storageRef, file);
              const imageUrl = await getDownloadURL(storageRef);
              imageUrls.push(imageUrl);
            }

            await addDoc(collection(db, 'pets'), {
              userId: userId,
              fullName: values.fullName,
              type: values.type,
              age: values.age,
              sex: values.sex,
              size: values.size,
              avcciation: values.avcciation,
              status: 'pending',
              images: imageUrls,
              onerPhone: values.onerPhone,
            });

            setLoading(false);
            setSuccessMessage('Pet added successfully');
            setSuccessMessage('Send Adoubt Notification to Owner Success');
            setTimeout(() => {
              window.location.reload();
            }, 5000)
          } catch (err) {
            console.error('Error adding document: ', err);
            setErrorMessage('Error adding Pet pleass tray again');
          }
        } else {
          console.log('User is not logged in.');
        }
      });

      unsubscribe(); // Clean up the listener
    } catch (err) {
      console.error('Error getting user: ', err);
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, []);

    return () => {
      clearInterval(timer);
     };
  }, []);
  return (
    <div>

      {successMessage && (
        <Alert severity="success" sx={{ position: 'fixed', top: 40, right: '50%', transform: "translatex(50% )", width: '300px', zIndex: 9999 }}>
          <AlertTitle>Success</AlertTitle>
            <div>{successMessage}</div>
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ position: 'fixed', top: 40, right: '50%', transform: "translatex(50% )", width: '300px', zIndex: 9999 }}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ ml: 5 }}>
        <h2> Add New Pet</h2>
      </Stack>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {loading ? (
          <Loding name={'Adding'} />
        ) : (
          <Form className="formik-dispy">

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
                  type='number'
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
              <div className='input-lp'>
                <label htmlFor='size'>Owner Phone Number</label>
                <Field
                  type='text'
                  id='onerPhone'
                  name='onerPhone'
                  placeholder='Enter Oner PhoneNumber'
                />
                <ErrorMessage name='onerPhone' component='div' />
              </div>

              <div className='input-lp in-image image'>
                <div htmlFor='image' className="image">
                  <label htmlFor='image' className="image">Choose Pet Images</label>
                  <input type="file"
                    id='image'
                    name='image'
                    placeholder='Enter Pet Images'
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>

                <ErrorMessage name='image' component='div' />
              </div>
            </div>
            <div>
              <ImageList cols={1}>
                <Stack direction={'row'} spacing={3} sx={{ flexWrap: 'wrap' }}>
                  {images.map((item, index) => (
                    <ImageListItem key={index} sx={{ width: 150, height: 80 }}>
                      <img
                        src={URL.createObjectURL(item)}
                        alt={item.name}
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </Stack>
              </ImageList>
            </div>
            {images.length !== 0 ? (
              <button type="submit">Submit</button>
            ) : (
              <button type="submit" disabled>
                Submit
              </button>
            )}
          </Form>
        )}
      </Formik>


    </div>
  );
}
