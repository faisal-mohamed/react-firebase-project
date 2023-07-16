import React from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'; /*This hook is used to update the login logout functionality in sync with the UI*/
import {signOut} from 'firebase/auth'; /*This is inbuild function inside firebase module to logout the user */

export const Navbar = () => {

  const [user] = useAuthState(auth);
  const logOutUser = async ()=>{
    alert('Sure,want to logout?')
    await signOut(auth); /**Here the auth is passed as parameter since it containes all the necessary information of the user loggedin */
  }

  return (
    <div className='navbar'>
      <div className="links">
        <Link to="/">HOME</Link>
        {(!user) ? <Link to="/login">LOGIN</Link> : <Link to="/create-post">Create Post</Link>}  {/**Logic  to Display the login only when user is not logged in and if loggedin display create post link */}
      </div>

      <div className="user">
        {user && 
        <>
        <p>{user?.displayName}</p>
        <img src={user?.photoURL || ""} alt="Profile Pic" width="20" height="20" />  {/*Can also use user variable that we created using hook instead of {auth.currentUser?.displayName}*/}
          
        <button onClick={logOutUser} className='logout'>Log out</button>
      
      </>
      
        }
      </div>
    </div>
  )
}
