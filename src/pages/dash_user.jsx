import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import '../App.css';
import AddPet from "../components/add_pet";
import ValueGetterGrid from "../components/data_table_dash_user";
import NavBar from "../components/navbar";
import { db } from "../firebase/firebase";

export default function DashUser() {
  const data = useLocation();
  const userData = data.state;
  console.log('============================');
  console.log(userData);
  console.log('============================');
  
  const initialCounts = {
    available: 0,
    adopted: 0,
    pending: 0
  };
  
  const [counts, setCounts] = useState(initialCounts); 
  
  useEffect(() => {
    async function checkPets() {
      const petQuerySnapshot = await getDocs(collection(db, 'pets'));
      const petData = petQuerySnapshot.docs
        .filter((doc) => doc.data().userId === userData.userId)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      
      setCounts(petData.length); 
  
      const updatedCounts = { ...initialCounts }; 
      petData.forEach(row => {
        if (row.status === 'Available to Adopt') {
          updatedCounts.available++;
        } else if (row.status === 'Adopt') {
          updatedCounts.adopted++;
        } else if (row.status === 'pending') {
          updatedCounts.pending++;
        }
      });
  
      setCounts(updatedCounts);
    }
  
    checkPets();
  }, []);

  return (
    <>
      <NavBar />
      <div className="dash">
        <div className="display-info">
          <div className="pending">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" colour="#FFA800" class="sc-jsTgWu bMHpCI"><g clip-path="url(#dogClip)"><path d="M3.13343 22.7997C2.40009 22.8664 1.80009 22.733 1.40009 22.0664C1.00009 21.4664 1.06676 20.8664 1.46676 20.333C1.73343 19.9997 1.66676 19.5997 1.33343 19.4664C1.00009 19.2664 0.66676 19.3997 0.46676 19.733C-0.13324 20.5997 -0.199906 21.533 0.26676 22.4664C0.800093 23.533 1.73343 23.9997 2.86676 23.9997C5.00009 23.9997 7.20009 23.9997 9.33343 23.9997C9.46676 23.9997 9.60009 23.9997 9.73343 23.9997C10.2668 24.0664 10.4668 23.7997 10.4001 23.2664C10.3334 22.6664 9.86676 22.333 9.26676 22.2664C8.66676 22.2664 8.06676 22.2664 7.46676 22.2664C7.06676 22.2664 6.73343 22.133 6.73343 21.733C6.73343 21.333 7.00009 21.133 7.40009 21.133C7.80009 21.133 8.06676 20.8664 8.26676 20.533C8.40009 20.133 8.66676 19.8664 9.13343 20.0664C9.46676 20.1997 9.53343 20.533 9.40009 20.9997C9.40009 21.0664 9.40009 21.0664 9.33343 21.133C11.0001 21.4664 11.4668 21.9997 11.6668 23.6664C11.6668 23.7997 11.9334 24.0664 12.0668 24.0664C13.0668 24.133 14.0668 24.0664 15.0668 24.0664C15.4668 24.0664 15.7334 23.733 15.6001 23.2664C15.4668 22.5997 15.0001 22.333 14.3334 22.2664C13.4668 19.133 12.2668 16.0664 11.9334 12.7997C11.7334 10.8664 11.9334 8.9997 13.2668 7.46637C13.6668 6.9997 14.2001 6.5997 14.7334 6.26637C16.7334 4.93303 17.0001 1.9997 15.3334 0.333035C15.0001 -0.000298478 14.6668 -0.0669651 14.2668 0.199702C14.0001 0.333035 13.7334 0.466368 13.4668 0.666368C12.4001 1.3997 11.3334 1.7997 10.0001 1.73303C8.13343 1.73303 6.40009 3.26637 6.00009 5.26637C5.66676 7.26637 5.33343 9.33303 5.00009 11.333C4.80009 12.6664 5.73343 13.7997 7.06676 13.933C8.20009 14.0664 9.46676 13.133 9.53343 11.8664C9.60009 10.4664 9.60009 9.06637 9.60009 7.66637C9.60009 7.13303 9.60009 6.5997 9.60009 6.06637C9.60009 5.73304 9.73343 5.46637 10.1334 5.46637C10.5334 5.46637 10.6668 5.66637 10.7334 5.9997C10.7334 6.26637 10.7334 6.46637 10.7334 6.73304C10.7334 8.46637 10.8001 10.1997 10.6668 11.933C10.5334 14.133 8.20009 15.5997 6.06676 14.7997C5.66676 14.6664 5.40009 14.733 5.13343 15.0664C4.66676 15.733 4.13343 16.3997 3.60009 17.0664C2.33343 18.733 2.13343 20.533 3.00009 22.3997C3.06676 22.6664 3.13343 22.733 3.13343 22.7997Z"></path><path d="M20.4001 23.9995C21.3334 23.9995 22.2667 23.9995 23.2001 23.9995C23.6001 23.9995 23.9334 23.8662 23.9334 23.4662C24.0001 23.0662 23.6667 22.8662 23.2001 22.8662C21.3334 22.8662 19.4001 22.8662 17.5334 22.8662C17.1334 22.8662 16.8001 22.9995 16.8001 23.3995C16.7334 23.7995 17.0667 23.9995 17.5334 23.9995C18.5334 23.9995 19.4667 23.9995 20.4001 23.9995Z"></path><path opacity="0.7" d="M21.7335 11.1992C21.4669 11.1992 21.2002 11.2659 20.9335 11.4659C20.7335 11.6659 20.5335 11.8659 20.4669 11.9992C20.4002 11.8659 20.2002 11.5992 20.0002 11.4659C19.7335 11.2659 19.4669 11.1992 19.2002 11.1992C18.4002 11.1992 17.7335 11.8659 17.7335 12.7326C17.7335 13.6659 18.5335 14.3326 19.6669 15.3326C19.8669 15.5326 20.0669 15.6659 20.3335 15.8659C20.3335 15.8659 20.4002 15.9326 20.4669 15.9326C20.5335 15.9326 20.5335 15.9326 20.6002 15.8659C20.8669 15.6659 21.0669 15.4659 21.2669 15.3326C22.4669 14.3326 23.2002 13.6659 23.2002 12.7326C23.2002 11.8659 22.5335 11.1992 21.7335 11.1992Z"></path></g><defs><clipPath id="dogClip"><rect width="24" height="24"></rect></clipPath></defs></svg>
            <div>
              <h3>Pending</h3>
              <h4>{counts.pending}</h4>
            </div>
          </div>
          <div className="avilble ">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" colour="#19BC90" class="sc-jsTgWu gmeuro"><g clip-path="url(#fosterClip)"><path d="M15.7465 6.10466C14.1893 6.43898 12.6548 5.44629 12.3209 3.8881C11.9874 2.32966 12.9793 0.796637 14.5375 0.462075C16.0952 0.128246 17.629 1.12094 17.9636 2.6784C18.2977 4.23659 17.305 5.77108 15.7465 6.10466Z"></path><path d="M0.30692 18.6227L1.60412 18.108L3.73909 14.3464L6.47768 12.3359L7.71355 13.0539L8.98583 12.5908C9.15396 12.1856 9.55329 11.9004 10.0198 11.9004C12.6194 11.9004 14.1304 10.045 14.257 8.27032C14.3435 7.37514 15.0474 6.63637 15.7839 6.27957C15.7839 6.27957 16.0628 6.12707 16.38 6.06622C16.6833 6.0083 17.0357 6.00635 17.0357 6.00635L17.0442 6.00586C18.0433 6.03445 19.219 6.59165 19.4683 7.75223L20.8022 13.9796C20.8821 14.3513 20.8484 14.7055 20.7372 15.0297C20.7208 15.0918 19.3371 18.5103 19.3371 18.5103H22.4718C23.3154 18.5103 23.9995 19.1945 23.9995 20.0382C23.9995 20.8818 23.3154 21.5656 22.4718 21.5656H17.0684C16.5601 21.5656 16.085 21.3126 15.8006 20.8906C15.5168 20.4685 15.4616 19.9338 15.6529 19.4629L16.512 17.3499L14.6536 17.8812L15.3533 21.7259C15.5041 22.5558 14.9537 23.3505 14.1241 23.5023C14.0317 23.5192 13.9395 23.5277 13.8486 23.5277C13.125 23.5275 12.482 23.0108 12.3474 22.2735L11.3996 17.0669C11.2589 16.2937 11.7271 15.5405 12.4825 15.3245L15.4914 14.4642L15.0024 12.1807C13.8982 13.4696 12.224 14.1409 10.0203 14.1409C9.74831 14.1409 9.50246 14.0402 9.30842 13.8792L8.24558 14.266L5.33029 19.8412L5.45468 22.8439C5.46983 23.2081 5.18659 23.5157 4.82221 23.5311C4.81268 23.5316 4.80388 23.5316 4.79435 23.5316C4.44243 23.5316 4.14966 23.254 4.13524 22.8987L4.05557 20.9805L3.73982 23.0424C3.68997 23.3686 3.40892 23.6025 3.0878 23.6025C3.05456 23.6025 3.02083 23.6003 2.98711 23.5949C2.62639 23.5392 2.37932 23.2029 2.43431 22.8422L2.95045 19.4741L2.06577 18.9712L0.665924 19.5267C0.607515 19.5501 0.546419 19.5609 0.487033 19.5609C0.293478 19.5609 0.110433 19.445 0.0344285 19.2539C-0.0647925 19.0044 0.0574009 18.7214 0.30692 18.6227Z"></path><path d="M6.21199 10.9355C6.12621 11.0167 6.03969 11.0983 5.95245 11.1794C5.89013 11.2376 6.24522 12.0634 6.24522 12.0634L3.57823 13.9928C3.39861 13.7115 3.21849 13.429 3.03887 13.1467C2.64321 12.5279 2.26612 11.8962 1.80056 11.3263C1.67372 11.1714 1.52294 11.0313 1.36458 10.9069C0.635326 10.3368 1.08866 9.94407 1.20597 9.87565C1.49826 9.70336 1.82085 9.73586 2.12217 9.89471C2.29007 9.98391 2.45625 10.076 2.62268 10.1689C2.67156 10.196 2.7087 10.1943 2.75489 10.1584C2.83285 10.0993 2.91814 10.0479 3.00123 9.99686C3.48219 9.70458 3.9497 9.75688 4.46413 9.53351C4.63838 9.45824 5.72492 8.21261 6.30119 8.51638C6.9295 8.84728 6.97472 9.53644 6.7731 10.0917C6.65481 10.4189 6.46517 10.6982 6.21199 10.9355Z"></path></g><defs><clipPath id="fosterClip"><rect width="24" height="24"></rect></clipPath></defs>
            </svg>
            <div>
              <h3>Available To Adopt</h3>
              <h4>{counts.available}</h4>
            </div>

          </div>
          <div className="adopted">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" colour="#36DBFF" class="sc-jsTgWu ebIUwQ"><path d="M19.5429 8.36035H16.3781V11.9999H12.7385V15.1648H16.3781V18.8043H19.5429V15.1648H23.1824V11.9999H19.5429V8.36035Z"></path><path d="M11.156 10.4174H14.7956V6.7778H21.1253V10.4174H22.9608C23.6185 9.36242 24 8.16643 24 6.85534C24 3.20091 21.0381 0.237779 17.3844 0.237779C15.1644 0.237779 13.2 1.33128 12 3.00933C10.8 1.33123 8.83559 0.237305 6.61561 0.237305C2.96192 0.237305 0 3.19975 0 6.85424C0 8.44288 0.559754 9.90049 1.49269 11.0411L12 23.7625L14.7956 20.3777V16.747H11.156V10.4174Z"></path>
            </svg>
            <div>
              <h3>Adopt</h3>
              <h4>{counts.adopted}</h4>
            </div>
          </div>
          <div className="buttom-add-pet">
            <AddPet />
          </div>

        </div>
        <div className="product">
          <ValueGetterGrid />
        </div>
      </div>
    </>
  )
}