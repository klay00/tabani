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
import NavBar from './components/navbar';


function App() {
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

  return (
    <>

      <BrowserRouter>
        <Routes path="./pages/">          
          <Route >
            <Route index element={<HomePage />} />
            {
              pagelist.map((page) => {
                return (
                  <>
                    <Route path={page.path} element={page.page} />
                  </>
                );
              })
            }
          </Route>
          <Route >
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
