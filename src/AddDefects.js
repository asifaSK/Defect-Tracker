import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const AddDefects = () => {

    // Initialising state for all defects (empty array)
    const [allDefects, setAllDefects] = useState([]);

    // Taking useNavigate hook to navigate in between the routes
    const navigate = useNavigate();

    // Function which creates a get call to get all the defects (from the collection "defects" in the url)
    const getAllDefectsFun = async() => await axios.get('https://64c12814fa35860baea01929.mockapi.io/defects/defects')
    .then(res=>setAllDefects(res.data))
    .catch(err=>console.log(err.message));

    useEffect(()=>{
        // Whenever the state changes: invoking the "getAllDefectsFun" function
        getAllDefectsFun();
      },[]);


    const emptyDefectData = {
            "description": "",
            "category": "",
            "priority": "",
            "status": ""
    };

    // Initialising state for defectData (object) to emptyDefectData
    const [defectData, setDefectData] = useState(emptyDefectData);

    // Handle change function for defectData (taking from the add defect fields)
    const handleChangeDefectData = (e) => {
        setDefectData({...defectData, [e.target.name] : e.target.value});
    }

    // Handle submit function to post a defect 
    const handleSubmitDefect = async (e) => {
        await axios.post('https://64c12814fa35860baea01929.mockapi.io/defects/defects', defectData)
        .then(res=>{
            // Once a new defect is added (posted)
            // Then invoking the "getAllDefectsFun" function again 
            getAllDefectsFun();
            // And setting the "defectData" to "emptyDefectData" again
            setDefectData(emptyDefectData);
        })
        .catch(err=>console.log(err.message))
    }


    // Handle delete function to delete a defect
    const handleDeleteDefect = async(defectId) => {
        await axios.delete(`https://64c12814fa35860baea01929.mockapi.io/defects/defects/${defectId}`)
        .then(res=>{
            // Once a defect is deleted
            // Then invoking the "getAllDefectsFun" function again 
            getAllDefectsFun();
        })
        .catch(err=>console.log(err.message))

    }

  return (
    <div>
        {/* Button for going back to login page */}
        <button onClick={()=>navigate('/')}>To LogIn Page</button>

        <hr className="dotted-hr" />
        <div>Tester---Can Add Defects</div>
        <hr className="dotted-hr" />

        <div>
            <div className='add-defects-div'>
                <div className='add-defects-div-children'>

                    {/* Dropdown list for selecting the category of the defect */}
                    <label>Category</label>
                    <select name="category" value={defectData.category} onChange={handleChangeDefectData} required>
                        <optgroup label="Select category"> 
                            <option value="" disabled selected>Select category</option> 
                            <option value="UI">UI</option>
                            <option value="Functional">Functional</option>
                            <option value="Change Request">Change Request</option>                  
                        </optgroup>
                    </select>

                </div>

                <div className='add-defects-div-children'>
                    {/* Text area for description */}
                    <label>Description</label>
                    <textarea name="description" value={defectData.description} type='textarea' onChange={handleChangeDefectData} required />
                </div>

                <div className='add-defects-div-children'>
                    {/* Input for priority */}
                    <label>Priority</label>
                    <input type="number" name="priority" value={defectData.priority} onChange={handleChangeDefectData} required />
                </div>

                <div className='add-defects-div-children'>
                    {/* Dropdown list for selecting status */}
                    <label>Status</label>
                    <select name='status' value={defectData.status} onChange={handleChangeDefectData}>
                        <optgroup label="Select status">
                            <option value="" disabled selected>Select status</option>
                            <option value="Active">Active</option>
                            <option value="Closed">Closed</option>
                        </optgroup>
                    </select>
                </div>

                <br />
                <button onClick={handleSubmitDefect}>Add Defect</button>
            </div>

            <div>
                <h4>All Added Defects Are</h4>
                <table>
                    <thead>
                        <tr>
                        <th>Defect Category</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Change Status</th>
                        <th>Action</th>
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
                                <td>
                                    <button onClick={()=>handleDeleteDefect(ele.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    </div>
    
  )
}

export default AddDefects


