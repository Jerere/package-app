import React from 'react'
import './PackageList.css'

const PackageList = ({ packages, loading, setSelectedPackage }) => {

    if (packages) {
        var organizedList = packages.sort((a, b) => {
            return a['Package'].localeCompare(b['Package'])
        })
    }

    return (
        <div className='package-list'>
            {loading ?
                <h2>Loading...</h2>
                :
                <>
                    {organizedList.map(function (pkg, id) {
                        return (
                            <li key={id} className='package-list-item'>
                                <a href='/#' className='package-link' onClick={() => setSelectedPackage(pkg)}>{pkg['Package']}</a>
                            </li>
                        )
                    })}
                </>
            }
        </div>
    )
}

export default PackageList
