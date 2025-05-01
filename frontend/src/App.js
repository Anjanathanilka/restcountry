import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RegionPicker from './components/RegionPicker';
import Countries from './components/Countries';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState(null);

  const onRegionPickHandler = (region) => {
    setSelectedRegion(region);
  };

  const clearSelectedRegionHandler = () => {
    setSelectedRegion(null);
  };

  if (!isAuthenticated) return <Login />;

  return (
    <div className="App">
      <Navbar />
      {selectedRegion ? (
        <Countries
          clearSelectedRegionHandler={clearSelectedRegionHandler}
          selectedRegion={selectedRegion}
        />
      ) : (
        <RegionPicker onRegionPickHandler={onRegionPickHandler} />
      )}
    </div>
  );
};

export default App;