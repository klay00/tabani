import React from "react"
import '../tools/loding.css';

export default function Loding({name}) {
    return (
        <>
            <div class="loader">
         <div class="dog">
            <div class="dog-body">
               <div class="dog-tail">
                  <div class="dog-tail">
                     <div class="dog-tail">
                        <div class="dog-tail">
                           <div class="dog-tail">
                              <div class="dog-tail">
                                 <div class="dog-tail">
                                    <div class="dog-tail"></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="dog-torso"></div>
            <div class="dog-head">
               <div class="dog-ears">
                  <div class="dog-ear"></div>
                  <div class="dog-ear"></div>
               </div>
               <div class="dog-eyes">
                  <div class="dog-eye"></div>
                  <div class="dog-eye"></div>
               </div>
               <div class="dog-muzzle">
                  <div class="dog-tongue"></div>
               </div>
            </div>
         </div>
         
      </div>
      <div className="loding-text"> 
      <h2 className="adding">{name}</h2>

      <h2>please wait</h2>
      </div>
        </>
    )
}