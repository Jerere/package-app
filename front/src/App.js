import React, { useState, useEffect } from 'react';
import PackageList from './components/packageList/PackageList'
import PackageContent from './components/packageContent/PackageContent'
import SearchBar from './components/searchBar/SearchBar'
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

const smallScreen = window.innerWidth > 600

function App() {
  const url = '/api'
  const { packages, loading } = useFetch(url);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [filteredList, setFilteredList] = useState(null)

  return (
    <div className='root'>
      <div className='container'>
        <div className='navigation'>
          {
            smallScreen &&
            <div className='search'>
              <SearchBar
                packages={packages}
                setFilteredList={setFilteredList}
              />
            </div>
          }

          <div className='list'>
            <PackageList
              packages={filteredList ? filteredList : packages}
              loading={loading}
              setSelectedPackage={setSelectedPackage}
            />
          </div>
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
