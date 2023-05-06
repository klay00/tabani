import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AllProduct from './pages/allproduct';
import HomePage from "./pages/homepage";
import LogIn from './pages/login';
import NoPage from './pages/nopage';
import PetPage from './pages/petpage';
import SignUp from './pages/signup';
import Profile from './pages/profile';


function App() {
   
  return (
    <>
     <BrowserRouter>
     <Routes path="./pages/">
     <Route index element={<HomePage/>}/>
     <Route  path='/login' element={<LogIn/>}/>
     <Route  path='/signup' element={<SignUp/>}/>
     <Route  path='/allproduct' element={<AllProduct/>}/>
     <Route  path='/profile' element={<Profile/>}/>
     <Route  path='/petpage' element={<PetPage/>}/>
     <Route  path='*' element={<NoPage/>}/>
     </Routes>
     
     </BrowserRouter>
    </>
  );
}

export default App;
