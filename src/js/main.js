'use strict';

/* <li>
        <img src="" alt="">
        <h3>title</h3>
    </li> 
*/

const searchText = document.querySelector('.js-searchText')

const searchBtn = document.querySelector('.js-searchBtn');

const searchList = document.querySelector('.js-searchList')

let resultData = [];

function getDataAPI(seriesName){
    fetch(`https://api.jikan.moe/v4/anime?q=${seriesName}`)
    .then ((resp) => resp.json())
    .then ((data) =>{
        // console.log(data);
        
    });
}

const handleSearch = () => {
    let seriesName = searchText.value;
    // console.log(seriesName);

    getDataAPI(seriesName);
}

searchBtn.addEventListener('click', handleSearch)