import React from 'react'
import './SearchBar.css'

function SearchBar({ setFilteredList, packages }) {

    const filterList = (input) => {
        setFilteredList(
            packages.filter(pkg => pkg['Package'].includes(input.toLowerCase()))
        )
    }

    return (
        <div>
            <input type='text' placeholder='Search' onChange={event => filterList(event.target.value)} />
        </div>
    )
}

export default SearchBar
