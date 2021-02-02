import React,{useState} from 'react';
import { Link ,useHistory} from 'react-router-dom';
import {auth} from './Firebase'
import './Login.css'
const Login = () => {
    const history = useHistory()
    const [email, setEmai] = useState('')
    const [password, setPassword] = useState('');
    const login = (event) => {
        event.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
        .catch (e=>alert(e.message));
    }
    const signup = (event) => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
        .catch(e=>alert(e.message))
    }

    return (
        <div className="login">
            <Link to="/">
                <img
                    className="login__logo"
                    src="https://economictranscript.files.wordpress.com/2019/09/amazon-625x352.jpg"
                    alt="login logo" srcset="" />
            </Link>
            <h1>login</h1>
            <div className="login__container">
                <h1>login</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input type="email" value={email} onChange={event=>setEmai(event.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" name="" id="" value={password} onChange={event=>setPassword(event.target.value)}/>
                    <button onClick={login} type="submit" className="login__signinButtom">Sign In</button>
                </form>
                <p>by signin in you agree to our terms and condions</p>
                <button onClick={signup} className="login__signupButtom">Create your Amazon Accoute</button>
            </div>
        </div>
    );
}

export default Login;
