import './App.css';
import { db  } from './firebase/firebase.js';
import { useEffect ,useState} from 'react';
import { collection ,onSnapshot, query } from "firebase/firestore";


function App() {
const [user,setuser]=useState([]);

 


useEffect(()=>{
  const q=query(collection(db,'users'))
  onSnapshot(q,(querySnapshot)=>{   
    setuser(
      querySnapshot.docs.map((doc)=>({
       id:doc.id,
       ...doc.data(),
      }))
    );
  })
 
},[])

  return (
    <div className="App">
      {
        user.map((user,i)=>{
        //  console.log(user.name)

          <div key={i}>{user.name}</div>
        })
      }
    </div>
  );
}

export default App;
