
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth,db } from './firebase';

const UserInfo = ({name}) => {
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
        // User document does not exist
        setUser(null);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };
  return (
    <div>
      {
        user?user[name]:'loding . . .'
      
      }
    </div>
  );
};

export default UserInfo;











// function Testing() {
//   const [user, setuser] = useState([]);
//   const [name, setname] = useState('');
//   const [mail, setmail] = useState('');



//   useEffect(() => {
//     //read data form databast
//     const q = query(collection(db, 'users'))
//     onSnapshot(q, (querySnapshot) => {
//       setuser(
//         querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//       );
//     })

//   }, [])

//   //add to data to database value of input
//   function handelsubmit(e) {
//     e.preventDefault();
//     const docRef = addDoc(collection(db, "users"), {
//       name,
//       mail
//     });  
//   } 

//   //delete data from data base
//   function handeldelete(id) {


//       const deleteuser = doc(db, 'users',id);

//      deleteDoc(deleteuser).then(()=>{
//       console.log(`the user ${id} is deletied`);
//      })
//     }

//   return (
//     <div className="App">
//       <form onSubmit={handelsubmit}>
//         <input type={'text'} placeholder="name" value={name} onChange={((e) => setname(e.target.value))} />
//         <input type={'text'} placeholder="mail" value={mail} onChange={((e) => setmail(e.target.value))} />
//         <input type={'submit'} placeholder="submit" />

//       </form>
//       <>
//         {
//           user.map((user) => {
//             return (
//               <>
//                 <div>{user.name}</div>
//                 <div >{user.mail}</div>
//                 <button onClick={()=>(handeldelete(user.id))}>delete</button>

//               </>

//             )
//           })
//         }
//       </>

//     </div>
//   );
// }

// export default Testing;
