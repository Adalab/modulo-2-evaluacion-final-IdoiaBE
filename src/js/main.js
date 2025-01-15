'use strict';

/* <li>
        <img src="" alt="">
        <h3>title</h3>
    </li> 
*/

const searchText = document.querySelector('.js-searchText')

const searchBtn = document.querySelector('.js-searchBtn');

const searchList = document.querySelector('.js-searchList')

const handleSearch = () => {
    let seriesName = searchText.value;
    console.log(seriesName);
}

searchBtn.addEventListener('click', handleSearch)