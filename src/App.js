
import React,{useEffect} from 'react';
import {useStateValue} from './StateProvider'
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './Home'
import Checkout from './Checkout'
import Login from './Login'
import {auth} from './Firebase'
import './App.css';

function App() {
  const [{ basket,user}, dispatch] = useStateValue()
  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user:authUser
       })
      } else {
        dispatch({
          type: "SET_USER",
          user:null
       }) 
     }
   })
    return () => {
      unsubscribe();
    }
  }, []);
  console.log(user);
  return (
    <Router>
            <Header/>
        <Switch> 
        <Route exact path='/login' component={Login}/>
         <Route exact path='/checkout' component={Checkout}/>
          <Route path='/' component={Home}/>
    </Switch>
    <Footer/>
    </Router>
  );
}

export default App;
