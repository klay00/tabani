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
  ];

  return (
    <>
      <BrowserRouter>
        <Routes path="./pages/">
          <Route index element={<HomePage />} />
          <Route>
            {
              pagelist.map((page) => {
                return (
                  <Route path={page.path} element={page.page} />
                );
              })
            }

          </Route>
          <Route >
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>
          <Route path='*' element={<NoPage />} />

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
