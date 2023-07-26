
import './App.css';
import Login from './Login';
import ViewDefects from './ViewDefects';
import AddDefects from './AddDefects';
import {BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <h1>Defect Trackor</h1>
      <hr />
      <BrowserRouter>
      <Routes>
        {/* Calling Login component */}
        <Route path='/' element={<Login />} /> 
        
        {/* Calling ViewDeffects component */}
        <Route path='/view-defects' element={<ViewDefects />} />

        {/* Calling AddDeffects component */}
        <Route path='/add-defects' element={<AddDefects />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
