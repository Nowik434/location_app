
import React, { useState, useEffect } from 'react';
import './App.css';
import PermanentDrawerLeft from './components/List/List';
import MyMap from './components/Map/Map';
import usersSlice from './redux/usersSlice';
import { useSelector } from 'react-redux';


function App() {
  const user = useSelector((state) => state.usersReducer);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(user)
    if (user.isLoggedIn) {
      setUserIsLoggedIn(true)
    }
  }, [user])

  return (
    <>
      <PermanentDrawerLeft userIsLoggedIn={userIsLoggedIn} />
      {userIsLoggedIn ? <MyMap /> : null}

    </>
  );
}

export default App;
