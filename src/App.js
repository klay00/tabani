import './App.css';
import { db  } from './firebase/firebase.js';
import { useEffect ,useState} from 'react';
import { collection ,onSnapshot, query,addDoc } from "firebase/firestore";


function App() {
const [user,setuser]=useState([]);
const [name ,setname]=useState('');
const [mail ,setmail]=useState('');
 


useEffect(()=>{
  //read data form databast
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

//add to data base value of input
function handelsubmit(e) {
  e.preventDefault();
  const docRef =  addDoc(collection(db, "users"), {
    name,
    mail
  });

}

  return (
    <div className="App">
      <form onSubmit={handelsubmit}> 
      <input type={'text'} placeholder="name" value={name} onChange={((e)=>setname(e.target.value))}/>
      <input type={'text'} placeholder="mail" value={mail} onChange={((e)=>setmail(e.target.value))}/>
      <input type={'submit'} placeholder="submit"/>
        
      </form>
      <>
      {
        user.map((user,i)=>{
          return(
            <>
                  <div key={i}>{user.name}</div>
                  <div key={i}>{user.mail}</div>

            </>

          )
        })
      }
      </>
      
    </div>
  );
}

export default App;
