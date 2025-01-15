'use strict';

/* <li>
        <img src="" alt="">
        <h3>title</h3>
    </li> 
*/

const searchText = document.querySelector('.js-searchText')

const searchBtn = document.querySelector('.js-searchBtn');

const searchList = document.querySelector('.js-searchList')

//creo array donde voy a guardar los datos que me da la API (para luego pintarlos)
let resultData = [];

function selectInfo (){
    for (const element of resultData){
        let imgURL = element.images.jpg.image_url;
        console.log(imgURL);
    }
}

function getDataAPI(seriesName){
    fetch(`https://api.jikan.moe/v4/anime?q=${seriesName}`) //COMILLAS FRANCESAS PARA CONCATENAR
    .then ((resp) => resp.json())
    .then ((allData) =>{
        console.log(allData);
        resultData = allData.data; //primero lleno mi array con los datos


    });
}

const handleSearch = () => {
    let seriesName = searchText.value;
    //console.log(seriesName);

    getDataAPI(seriesName); //le paso el parámetro para luego poder utilizar este valor en la url de la API
}

searchBtn.addEventListener('click', handleSearch)