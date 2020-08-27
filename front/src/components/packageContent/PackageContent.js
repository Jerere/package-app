import React from 'react'
import Dependencies from './dependencies/Dependencies'
import './PackageContent.css'

const PackageContent = ({ selectedPackage, setSelectedPackage, packages }) => {
    const smallScreen = window.innerWidth > 600

    return (
        <div className='package-content'>
            {selectedPackage ?
                <>
                    <h1>{selectedPackage['Package']}</h1>
                    {smallScreen ?
                        <pre className='package-description'>{selectedPackage['Description']}</pre>
                        :
                        <p className='package-description'>{selectedPackage['Description']}</p>
                    }
                    <Dependencies
                        selectedPackage={selectedPackage}
                        setSelectedPackage={setSelectedPackage}
                        packages={packages}
                    />
                </>
                :
                <>
                    <h1>Package-App</h1>
                    {smallScreen ?
                        <pre className='package-description'>⬅ Select package</pre>
                        :
                        <pre className='package-description'>⬆ Select package</pre>
                    }
                </>
            }
        </div>
    )
}

export default PackageContent
