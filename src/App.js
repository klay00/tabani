import './App.css';
import { db  } from './firebase/firebase.js';
import { useEffect ,useState} from 'react';
import { collection ,onSnapshot, query } from "firebase/firestore";


function App() {
const [user,setuser]=useState([]);
const [name ,setname]=useState('');
const [mail ,setmail]=useState('');
 


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


function handelsubmit(e) {
  e.preventDefault();
  console.log(name,mail); 

}

  return (
    <div className="App">
      <form onSubmit={handelsubmit}> 
      <input type={'text'} placeholder="name" value={name} onChange={((e)=>setname(e.target.value))}/>
      <input type={'text'} placeholder="name" value={mail} onChange={((e)=>setmail(e.target.value))}/>
      <input type={'submit'} placeholder="submit"/>
        
      </form>
      <>
      {
        user.map((user,i)=>{
          return(
                      <div key={i}>{user.name}</div>

          )
        })
      }
      </>
      
    </div>
  );
}

export default App;
