import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './admin/pages/AdminHome';
import OrderAdmin from './admin/pages/OrderAdmin';
import PetAdmin from './admin/pages/PetAdmin';
import UserAdmin from './admin/pages/UsersAdmin';
import './App.css';
import pagelist from './components/pagelist';
import { auth, db } from './firebase/firebase';
import DashUser from './pages/dash_user';
import HomePage from "./pages/homepage";
import LogIn from './pages/login';
import NoPage from './pages/nopage';
import SignUp from './pages/signup';

function App() {
  const haveUser = localStorage.getItem('token')
  console.log(haveUser);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // User is logged in, fetch user information from Firestore
        fetchUserData(authUser.uid);
      } else {
        // User is not logged in
        setUser(null);
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.data();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };
  console.log();
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
            <Route path='*' element={<NoPage />} />
            {/* {user && user.status === 'Admin' ? (
            <>
              <Route path="/admin_dash" element={<AdminHome />} />
              <Route path="/user_admin" element={<UserAdmin />} />
              <Route path="/pet_admin" element={<PetAdmin />} />
              <Route path="/order_admin" element={<OrderAdmin />} />
            </>
          ) : null} */}
            {haveUser ? (
              <>
                <Route path="/dash_user" element={<DashUser />} />
                <Route path="/admin_dash" element={<AdminHome />} />
                <Route path="/user_admin" element={<UserAdmin />} />
                <Route path="/pet_admin" element={<PetAdmin />} />
                <Route path="/order_admin" element={<OrderAdmin />} />
              </>

            ) : null}


          </Route>

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
