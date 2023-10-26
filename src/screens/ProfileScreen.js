import React from 'react'
import "./ProfileScreen.css"
import Nav from '../screensComponents/Nav'
import { useSelector } from 'react-redux'
import { selectuser } from '../features/userSlice'
import { auth } from '../firebase'
import {signOut} from "firebase/auth";
import PlansScreen from './PlansScreen'

function ProfileScreen() {
    const user = useSelector(selectuser);
  return (
    <div className='ProfileScreen'>
      <Nav/>
      <div className='ProfileScreenBody'>
        <h1>Edit Profile</h1>
        <div className='ProfileScreenInfo'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='user'/>
            <div className='ProfileScreenDetails'>
                <h2>{user.email}</h2>
                <div className='ProfileScreenPlans'>
                    <h3>Plans</h3>
                    <PlansScreen />
                    <button className='ProfileScreenSignout' onClick={()=>signOut(auth)}>SignOut</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
