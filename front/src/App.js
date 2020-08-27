import React, { useState, useEffect } from 'react';
import PackageList from './components/packageList/PackageList'
import PackageContent from './components/packageContent/PackageContent'
import './App.css'

const useFetch = url => {
  const [packages, setpackages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setpackages(data);
      setLoading(false);
    }
    fetchData()
  }, [url]);

  return { packages, loading };
};

function App() {
  const url = '/api'
  const { packages, loading } = useFetch(url);
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <div className='root'>
      <div className='container'>
        <div className='list'>
          <PackageList
            packages={packages}
            loading={loading}
            setSelectedPackage={setSelectedPackage}
          />
        </div>
        <div className='content'>
          <PackageContent
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            packages={packages}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
