import styles from '@/styles/ListView.module.css'
//import TransApi from "../../lib/listviewApi";
//import TransApi from "../api/trans";

import { useEffect, useRef, useState } from 'react'

export default function Listview({ alertMe }) {
  const wrapperRef = useRef()
  const [transData, setTransData] = useState([]);
  const callTrans = async () => {
    fetch('api/trans')
      .then(res => res.json())
      .then(data => setTransData(data?.data))
      .catch(error => console.error(error));

  }
  useEffect(() => {
    callTrans()
    //updateSence()

  }, [])
  useEffect(() => {
    //console.log(transHandler)

    //console.log("Margin  left",wrapperRef.current.clientWidth)
  }, [transData])
  const idRef = useRef()

  const addNewSence = () => {
    if (firstSence !== '' && secondSence !== '') {
      fetch('api/trans', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ type: 'ADD_SENCE', sence: { Eng: firstSence, Hindi: secondSence } })
      })
        .then(res => res.json())
        .then(data => {
          if(data.acknowledged)
          alertMe('Sentence Added!','success') // success
          else 
          alertMe('Something going wrong') // failure
        })
        .catch(error => console.error(error));
    }
    else{
      alertMe("Sentence can't be empty" ,'danger')
    }
  }
  const updateSence=()=>{
    console.log("Hello Patch")
    fetch('api/trans', {

      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id:'6452a98b93d50653f995be48',newData:{ text: "Md owais & Md owaid",script:'print("FINISHED")' }})
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
  const [firstSence, setFirstSence] = useState('')
  const [secondSence, setSecondSence] = useState('')
  return (
    <div>
      <div ref={wrapperRef} className={styles.listViewWrapper} >
        {/* {JSON.stringify(trans)} */}
        <div className={styles.inp}>
          <div className={styles.inputs}>
            <input onChange={(e) => setFirstSence(e.target.value)} value={firstSence} type="text" placeholder="Enter English sentence___" />
            <input onChange={(e) => setSecondSence(e.target.value)} value={secondSence} type="text" placeholder="Enter Hindi sentence___" />
          </div>
          <button onClick={addNewSence}>Save</button>
        </div>
        {
          transData?.map((item, idx) =>
            <SenceRow senceDetails={item} alertMe={alertMe} key={idx} />
          )
        }
      </div>
      <div>
        <button onClick={() => callTrans()}>Refresh</button>
      </div>
      <User userData={transData} />
    </div>
  )
}
function SenceRow({ senceDetails,alertMe }) {
  const [fullID, setFullID] = useState(senceDetails._id.substring(19, 24) + '...');
  const mouseEnterHandler = (e) => {
    let temp = e.target.attributes.idlog.value
    setFullID(temp)
  }
  const mouseLeaveHandler = (e) => {
    let temp = e.target.attributes.idlog.value.substring(19, 24)
    setFullID(temp + '...')
  }
  const deleteSence=(id)=>{
    fetch('api/trans', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ type: 'DEL_SENCE',id})
    })
      .then(res => res.json())
      .then(data => {
        if(data.deletedCount)
        alertMe(JSON.stringify(data) ,'success')
        //console.log(data)
      })
      .catch(error => console.error(error));
  }

  return (
    <div className={styles.listRow} >
      <div onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        idlog={senceDetails._id}
      >
        <span className={styles.showId}>{fullID}</span>
      </div>
      <div>{senceDetails.Eng}</div>
      <div>{senceDetails.Hindi}</div>
      <div onClick={()=>deleteSence(senceDetails._id)}>X</div>
    </div>
  )
}


function User({ userData }) {
  const [isEditing, setIsEditing] = useState(new Array(userData.length).fill(false));
  //const temp: any={users:[]};
  let statusText = '';
  let status_class = '';
  function fetchAllUsers() {
    // this.userServices.fetchAllUsers('?limit=5')
    //     .subscribe(result => {
    //this.temp = result;
    // this.userData=this.temp.users
    //this.isEditing = new Array(this.temp.users.length).fill(false);
    //console.log(result)
    // })
  }
  let isDocChange = false;
  function removeUser(id) {
    // this.userData = this.userData.filter((item: any) => item.id != id)
    // this.userServices.removeUser(id)
    //     .subscribe(result =>{
    //         console.log("Deleted ",result) 
    //         // error for newly created user due api limitation (drop new user added i.e no new id).
    //         this.setStatusText("User deleted Successfully",'deleted');
    // })
    // this.isDocChange = true;
  }
  function editUser(id, txt) {
    // let idx = this.userData.findIndex((item: { id: number, text: string, isEditing: boolean }) => item.id === id);
    // if (this.isEditing[idx]) {
    //     const spidx=txt.lastIndexOf(' ');
    //     this.userData[idx].firstName = txt.substring(0, spidx);
    //     this.userData[idx].lastName = txt.substring( spidx+ 1);
    //     this.isEditing[idx] = false;
    //     this.isDocChange = true;
    //     this.userServices.updateUser(txt.substring(0, spidx),txt.substring( spidx+ 1),id)
    //     .subscribe(result =>{
    //         console.log("Updated ",result) 
    //         // error for newly created user due api limitation (drop new user added i.e no new id).
    //         this.setStatusText("Updated Successfully",'updated');
    //     })}
    // else {
    //     this.isEditing[idx] = true;
    // }
  }
  function setStatusText(text, status_class_name = '') {
    // this.status_class=status_class_name;
    // this.statusText=text;
    // setTimeout(()=>{
    //     this.statusText='';
    //     this.status_class="";
    // },3500);
  }
  useEffect(() => {
    fetchAllUsers()
    // Below code for localStorage 
    // if ("ngUserData" in localStorage) {
    //     // let temp: any = localStorage.getItem('ngUserData');
    //     // this.userData = JSON.parse(temp);
    // }
    // setInterval(() => {
    //     if (this.isDocChange) {
    //         //saave
    //         localStorage.setItem('ngUserData', JSON.stringify(this.userData));
    //         //console.log('saved!');
    //         this.isDocChange = false;
    //     }
    // }, 5000);
  })
  return (
    <div style={{ width: 'calc(150px + 30vw)' }}>
      <div className="'statustext '+status_class">{statusText}</div>
      <div className={styles.addSenceCont}>

        <div className="user-div">
          {/* <div *ngFor="let user of userData;let i=index;">
            <span #txt [contentEditable]="isEditing[i]">{{user.firstName+" "+user.lastName}}</span>
            <div>
                <span *ngIf="!isEditing[i]" (click)="editUser(user.id,txt.innerText)"
                    style="transform:rotateZ(90deg)">&#x270e;</span> <!--koi ek-->
                <span *ngIf="isEditing[i]" (click)="editUser(user.id,txt.innerText)"> &#x2713;</span>
                <span (click)="removeUser(user.id)"> &#x2715;</span>
            </div>
        </div> */}
        </div>
        <div style={{ marginTop: "50px", opacity: .7 }}>
          Md Ishtiyaque Ahmad <br />
          NIT Patna
        </div>
      </div>
    </div>
  )
};




// <!-- Start Blog Layout -->
// <div class="container">
//   <div class="row">
//     <div class="col-md-6 item">
//       <div class="item-in">
//         <h4>Some Kind of Title</h4>
//         <div class="seperator"></div>
//         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi expedita eveniet consectetur, voluptates voluptatum, sit excepturi earum. Veniam eius amet, accusantium, deserunt officia, quos qui debitis laboriosam velit quis autem!</p>
//         <a href="#">Read More
//           <i class="fa fa-long-arrow-right"></i>
//         </a>
//       </div>
//     </div>
//     <div class="col-md-6 item">
//       <div class="item-in">
//         <h4>Some Kind of Title</h4>
//         <div class="seperator"></div>
//         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi expedita eveniet consectetur, voluptates voluptatum, sit excepturi earum. Veniam eius amet, accusantium, deserunt officia, quos qui debitis laboriosam velit quis autem!</p>
//         <a href="#">Read More
//           <i class="fa fa-long-arrow-right"></i>
//         </a>
//       </div>
//     </div>
//   </div>
//   <p style="text-align:center;">With Icons <em>(hover over icons)</em></p>
//   <!-- With Icons -->
//   <div class="row">
//     <div class="col-md-6 item">
//       <div class="item-in">
//         <div class="icon">
//           <a href="#">
//           <?xml version="1.0" encoding="iso-8859-1"?>
//             <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16.662 16.662" xml:space="preserve" width="512px" height="512px">
//             <g>
//               <path d="M13.365,0.324H3.297L0,5.109l8.331,11.229l8.331-11.229C16.662,5.109,13.365,0.324,13.365,0.324z    M15.213,4.734h-3.4l1.298-3.054C13.111,1.68,15.213,4.734,15.213,4.734z M12.526,1.303l-1.342,3.156L9.071,1.303H12.526z    M10.544,4.734H6.442l1.909-3.273L10.544,4.734z M7.648,1.303L5.856,4.378L4.185,1.303H7.648z M3.584,1.634l1.685,3.1h-3.82   C1.449,4.734,3.584,1.634,3.584,1.634z M1.45,5.421h4.124l1.95,8.184C7.524,13.605,1.45,5.421,1.45,5.421z M6.279,5.421h4.548   l-2.468,8.732C8.359,14.153,6.279,5.421,6.279,5.421z M9.28,13.413l2.259-7.992h3.672L9.28,13.413z" fill="#777777"/>
//             </g>
//             </svg>
//              <div class="icon-topic">Work Topic</div>
//             </a>
//         </div>
//         <h4>Some Kind of Title</h4>
//         <div class="seperator"></div>
//         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi expedita eveniet consectetur, voluptates voluptatum, sit excepturi earum. Veniam eius amet, accusantium, deserunt officia, quos qui debitis laboriosam velit quis autem!</p>
//         <a href="#">Read More
//           <i class="fa fa-long-arrow-right"></i>
//         </a>
//       </div>
//     </div>
//     <div class="col-md-6 item">
//       <div class="item-in">
//         <div class="icon">
//           <a href="#">
//           <?xml version="1.0" encoding="iso-8859-1"?>
//             <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16.662 16.662" xml:space="preserve" width="512px" height="512px">
//             <g>
//               <path d="M13.365,0.324H3.297L0,5.109l8.331,11.229l8.331-11.229C16.662,5.109,13.365,0.324,13.365,0.324z    M15.213,4.734h-3.4l1.298-3.054C13.111,1.68,15.213,4.734,15.213,4.734z M12.526,1.303l-1.342,3.156L9.071,1.303H12.526z    M10.544,4.734H6.442l1.909-3.273L10.544,4.734z M7.648,1.303L5.856,4.378L4.185,1.303H7.648z M3.584,1.634l1.685,3.1h-3.82   C1.449,4.734,3.584,1.634,3.584,1.634z M1.45,5.421h4.124l1.95,8.184C7.524,13.605,1.45,5.421,1.45,5.421z M6.279,5.421h4.548   l-2.468,8.732C8.359,14.153,6.279,5.421,6.279,5.421z M9.28,13.413l2.259-7.992h3.672L9.28,13.413z" fill="#777777"/>
//             </g>
//             </svg>
//              <div class="icon-topic">Another Category or Post Type</div>
//             </a>
//         </div>
//         <h4>Some Kind of Title</h4>
//         <div class="seperator"></div>
//         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi expedita eveniet consectetur, voluptates voluptatum, sit excepturi earum. Veniam eius amet, accusantium, deserunt officia, quos qui debitis laboriosam velit quis autem!</p>
//         <a href="#">Read More
//           <i class="fa fa-long-arrow-right"></i>
//         </a>
//       </div>
//     </div>
//   </div>
// </div>