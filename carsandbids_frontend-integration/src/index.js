import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import DetailedAuction from './components/DetailedAuction';
import CreateAuction from './components/CreateAuction';
import AboutUs from './components/AboutUs';
import SignupLoginModel from './components/SignupLoginModel';
import PastAuction from './components/PastAuction'
import Logo from "./logo.svg";

const routing = (  
  <Router>   
      <Routes>
      <Route path='/app' Component={App} />  



      <Route path='/details/:id' Component={DetailedAuction} />
      {/* <Route path='/createAuction' Component={CreateAuction} /> */}

      {/* <Route exact path="/create-auction" component={CreateAuction} /> */}

      <Route exact path="/create-auction" element={<CreateAuction />} />
      <Route exact path="/about-us" element={<AboutUs />} />

      <Route path='/past-auction' element={<PastAuction/>} />

      <Route exact path="/login/:auction" element={<SignupLoginModel isSignUp={false} />} />
      <Route exact path="/sign-up/:auction" element={<SignupLoginModel isSignUp={true} />} />
      </Routes>
  </Router>  
);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {routing}
  </>
);

reportWebVitals();
