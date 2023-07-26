import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


const Login = () => {
    // Initialising state for username
    const [username, setUsername] = useState("");
    // Initialising state for password
    const [password, setPassword] = useState("");

    // Initialising state for invalid credentials
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    // Taking useNavigate hook to navigate in between the routes
    const navigate = useNavigate();


    // Handle change function for username
    const usernameHnadleChange = (e) => {
        setUsername(e.target.value);
    }

    // Handle change function for password
    const passwordHnadleChange = (e) => {
        setPassword(e.target.value);
        
    }

    // Handle submit function for the submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Getting all users data
        const allUsers = await axios.get("https://64c12814fa35860baea01929.mockapi.io/defects/users");
        const allUsersData = allUsers.data;

        // Checking whether the user is existing or not
        const isExistingUser = allUsersData.filter(user=>user.username === username)[0];
        
        if(!isExistingUser){
            // If user does not exist
            setInvalidCredentials(true);
        }else{
            // If user exists
            // Checking whether the password is correct or not
            const isValidPassword = isExistingUser.password === password;
            if(!isValidPassword){
                // If password is incorrect
                setInvalidCredentials(true);
            }else{
                // If both username and password are correct
                if(isExistingUser.role==="tester"){
                    // If the user's role is tester
                    // Then navigate to '/add-defect' path
                    navigate('/add-defects');

                }else if(isExistingUser.role==="user"){
                    // If the user's role is just user
                    // Then navigate to '/view-defects' path
                    navigate('/view-defects');
                }
            }
        }       
    }

  return (
    <div>
        <p> Signin </p>
        <div className="login-credentials-div">
            <label> Username </label>
            <input type="text" placeholder="Enter Username" onChange={usernameHnadleChange} />
            {/* {invalidUsername? (<p>User does not exist</p>) : ""} */}
        </div>

        <div className="login-credentials-div">
            <label> Password </label>
            <input type="password" placeholder="Enter Password" onChange={passwordHnadleChange} />
            {/* If credentials are invalid: then message */}
            {invalidCredentials? (<p className="invalid-cred-p">Invalid credentials</p>) : ""}
        </div>

        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login