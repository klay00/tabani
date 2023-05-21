import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import pagelist from './components/pagelist';
import DashUser from './pages/dash_user';
import HomePage from "./pages/homepage";
import LogIn from './pages/login';
import SignUp from './pages/signup';

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
            <Route path='/dash_user' element={<DashUser/>} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
