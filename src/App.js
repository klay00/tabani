import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './admin/pages/AdminHome';
import OrderAdmin from './admin/pages/OrderAdmin';
import PetAdmin from './admin/pages/PetAdmin';
import UserAdmin from './admin/pages/UsersAdmin';
import './App.css';
import pagelist from './components/pagelist';
import DashUser from './pages/dash_user';
import HomePage from "./pages/homepage";
import LogIn from './pages/login';
import NoPage from './pages/nopage';
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
            <Route path='/admin_dash' element={<AdminHome/>} />
            <Route path='/user_admin' element={<UserAdmin/>} />
            <Route path='/pet_admin' element={<PetAdmin/>} />
            <Route path='/order_admin' element={<OrderAdmin/>} />
            <Route path='*' element={<NoPage/>} />

          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
