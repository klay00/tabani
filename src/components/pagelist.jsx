import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllProduct from '../pages/allproduct';
import NoPage from '../pages/nopage';
import PetPage from '../pages/petpage';
import Profile from '../pages/profile';
import '../App.css';

 const pagelist = [
    {
      path: '/allproduct',
      page: <AllProduct />
    },
    {
      path: '/profile',
      page: <Profile />
    },
    {
      path: '/petpage',
      page: <PetPage />
    }
    ,
    {
      path: '*',
      page: <NoPage />
    }
  ];  
export default pagelist;