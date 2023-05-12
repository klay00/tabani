import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from "./pages/homepage";
import LogIn from './pages/login';
import SignUp from './pages/signup';
import pagelist from './components/pagelist';



function App() {

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
