import React from 'react';
import Navbar from './components/Navbar';
import Home from './routes/Home/Home';
import Contact from './routes/Contact/Contact';


function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Home />
        <Contact />
      </div>
    </>
  );
}

export default App;
