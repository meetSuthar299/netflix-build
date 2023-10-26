import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectuser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        //console.log(user);
        dispatch(login({
          uid: user.uid,
          email: user.email,
        }));
      } else {
        // User is signed out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch ]);

  return (
    <div className="App">
      <BrowserRouter>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/movie" element={<MovieScreen />} />
          </Routes>
        )}

      </BrowserRouter>
    </div>
  );
}

export default App;
