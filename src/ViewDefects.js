import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const ViewDefects = () => {

  // Initialising state for all defects (empty array)
  const [allDefects, setAllDefects] = useState([]);

  // Taking useNavigate hook to navigate in between the routes
  const navigate = useNavigate();

  // Function which creates a get call to get all the defects (from the collection "defects" in the url)
  const getAllDefectsFun = async() => await axios.get('https://64c12814fa35860baea01929.mockapi.io/defects/defects')
    .then(res=>setAllDefects(res.data)) // Setting the allDefects with the data obtained by axios get call
    .catch(err=>console.log(err.message));

  useEffect(()=>{
    // Whenever the state changes: invoking the getAllDefectsFun function
    getAllDefectsFun();
  },[]);
  


  return (
    <>
      {/* Button for going back to login page */}
      <button onClick={()=>navigate('/')}>To LogIn Page</button>

      <hr className="dotted-hr" />
      <div>User --- Can View All Defects</div>
      <hr className="dotted-hr" />

      <h4>All Added Defects Are</h4>
      <table>
        <thead>
          <tr>
            <th>Defect Category</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping the data of all the defects into the table */}
          {allDefects.map((ele, index) => (
            // Setting unique key for each row of table, using the index
              <tr key={index}>
                <td>{ele.category}</td>    
                <td>{ele.description}</td>
                <td>{ele.priority}</td>
                <td>{ele.status}</td>
                <td><a href='#dummy'>Close</a></td>
              </tr>
          ))}
        </tbody>
      </table>

    </>
    
  )
}

export default ViewDefects


