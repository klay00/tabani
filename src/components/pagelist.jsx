import React from 'react';
import AllProduct from '../pages/allproduct';
import NoPage from '../pages/nopage';
import PetPage from '../pages/petpage';
import Profile from '../pages/profile';
import HomePage from '../pages/homepage';

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

export const NavPages = [
  {
    name:'Blog',
    path: '/',
    page: <HomePage />
  },
  {
    name:'All Pets',
    path: '/allproduct',
    page: <AllProduct />
  },
  {
    name:'Cats',
    path: '/allproduct',
    page: <AllProduct />
  },
  {
    name:'Dogs',
    path: '/allproduct',
    page: <AllProduct />
  },
];
export default pagelist;