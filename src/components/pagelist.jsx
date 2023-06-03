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

export const options = [
  { label: 'Dog', id: 1 },
  { label: 'Cat', id: 2 },
  { label: 'Reabt', id: 3 },
  { label: 'Rabbit', id: 4 },
  { label: 'Other', id: 5 },
];

export const settings = [
  
  {
    name:'profile',
    path:'/profile'
  },
  {
    name:'User Dashbord',
    path:'/dash_user'
  },
  {
    name:'Admin Dashbord',
    path:'/admin_dash'
  },
  {
    name:'logout',
    path:'/login'
  },
  
];





export const Location = [
  { id: 1, label: 'Al-Amil' },
  { id: 2, label: 'Al-Bayaa' },
  { id: 3, label: 'Al-Dora' },
  { id: 4, label: 'Al-Furat' },
  { id: 5, label: 'Al-Ghadir' },
  { id: 6, label: 'Al-Harithiya' },
  { id: 7, label: 'Al-Hurriya' },
  { id: 8, label: 'Al-Jihad' },
  { id: 9, label: 'Al-Ma\'moun' },
  { id: 10, label: 'Al-Mansour' },
  { id: 11, label: 'Al-Mashtal' },
  { id: 12, label: 'Al-Murabba' },
  { id: 13, label: 'Al-Saidiya' },
  { id: 14, label: 'Al-Salam' },
  { id: 15, label: 'Al-Shoala' },
  { id: 16, label: 'Al-Suwaib' },
  { id: 17, label: 'Al-Yarmouk' },
  { id: 18, label: 'Ghazaliya' },
  { id: 19, label: 'Hayy Al-Jihad' },
  { id: 20, label: 'Hayy Al-Jami\'a' },
  { id: 21, label: 'Hayy Al-Jihad Al-Akbar' },
  { id: 22, label: 'Hayy Al-Jihaniya' },
  { id: 23, label: 'Hayy Al-Jihoudiya' },
  { id: 24, label: 'Hayy Al-Khadraa' },
  { id: 25, label: 'Hayy Al-Malikiya' },
  { id: 26, label: 'Hayy Al-Mashahid' },
  { id: 27, label: 'Hayy Al-Nasr' },
  { id: 28, label: 'Hayy Al-Saidiya' },
  { id: 29, label: 'Hayy Al-Shurtta' },
  { id: 30, label: 'Hayy Al-Tayaran' },
  { id: 31, label: 'Hayy Al-Ubedi' },
  { id: 32, label: 'Hayy Al-Umma Al-Thaltha' },
  { id: 33, label: 'Hayy Al-Wihda' },
  { id: 34, label: 'Hayy Ur' },
  { id: 35, label: 'Kadhimiya' },
  { id: 36, label: 'Mansour' },
  { id: 37, label: 'Nahda' },
  { id: 38, label: 'Salman Pak' },
  { id: 39, label: 'Saydiya' },
  { id: 40, label: 'Shula' },
  { id: 41, label: 'Yarmouk' }
];
export const catImageList=[
  {
    imgSrc:'https://www.rd.com/wp-content/uploads/2023/04/Hilarious-Cat-Memes-46.jpg?fit=700,700'
},
{
    imgSrc:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU'
},
{
    imgSrc:'https://assets3.thrillist.com/v1/image/2509573/792x456/scale;webp=auto;jpeg_quality=60;progressive.jpg'
},
  {
      imgSrc:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYfNpC3DhexeNcAsMF3mn2OBAiY5kvis2UHg&usqp=CAU'
  },
  {
      imgSrc:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhCF9j3Snc4VHPQVcT3RwnS5hYCDT0FrvBg&usqp=CAU'
  },
  
];
export default pagelist;