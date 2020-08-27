import React from 'react'
import './Dependencies.css'

const Dependencies = ({ selectedPackage, setSelectedPackage, packages }) => {
    const packageNames = packages.map((pkg) => pkg['Package'])

    const DependencyList = ({ dependencies }) => {
        return dependencies.map((dependency, id) => {
            if (packageNames.includes(dependency)) {
                return (
                    <li key={id} className='dependency-list-item'>
                        <a href='/#' className='dependency-link' onClick={() => setSelectedPackage(packages[packageNames.indexOf(dependency)])}>{dependency}</a>
                    </li>
                )
            }
            else {
                return (
                    <li key={id} className='dependency-list-item'>
                        <span title='Alternative dependency' className='dependency-item'>{dependency}</span>
                    </li>
                )
            }
        })
    }

    return (
        <div className='dependencies-container'>
            {selectedPackage['Depends'] &&
                <div className='dependency-list'>
                    <strong>Dependencies:</strong>
                    <DependencyList dependencies={selectedPackage['Depends']} />
                </div>
            }


            {selectedPackage['Reverse-dependencies'] &&
                <div className='dependency-list'>
                    <strong>Reverse dependencies:</strong>
                    <DependencyList dependencies={selectedPackage['Reverse-dependencies']} />
                </div>
            }
        </div>
    )
}

export default Dependencies
