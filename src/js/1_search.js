const searchText = document.querySelector('.js-searchText');

const searchBtn = document.querySelector('.js-searchBtn');

const searchList = document.querySelector('.js-searchList');

//creo un array donde voy a guardar los datos que me da la API (para luego pintarlos)
let resultData = [];

const selectFavourties = (seriesId) => {
    const allLi = document.querySelectorAll('.js-listItem'); //Me devuelve un array

    for (const eachLi of allLi) {
        eachLi.addEventListener('click', (ev)=>{
            let selectedLi = ev.currentTarget;
            selectedLi.classList.toggle('bookmark');
        });
    }
}


function renderSeries (imgURL, defaultTitle, seriesId){
    //si el elemento tiene los objetos que contienen la url, es decir, si tiene imagen
    if (imgURL){
        //pinto los datos recogidos
        searchList.innerHTML += `<li id="${seriesId}" class="js-listItem">
        <img src="${imgURL}" alt="${defaultTitle}">
        <h3>${defaultTitle}</h3>
        </li> `
    } else{ //si no, le pongo un placeholder como img
        searchList.innerHTML += `<li id="${seriesId}" class="js-listItem">
        <img src="https://placehold.co/300x400?text=${defaultTitle}" alt="${defaultTitle}">
        <h3>${defaultTitle}</h3>
        </li> `
    }

    selectFavourties(seriesId);
}

function selectInfo (){
    searchList.innerHTML = ''; //para limpiar la lista antes de volver a buscar resultados (porque el render se ejecuta dentro del bucle asi que esto tiene que estar fuera)

    //primero hago un bucle para recorrer mi array
    for (const element of resultData){
        let imgURL = element.images.jpg.image_url; //recogo la url del objeto jpg, que a su vez está dentro del objeto images

        let defaultTitle = element.titles.find(object => object.type === "Default")?.title; //como el title está dentro de otro array llamado titles, hay que recorrerlo. Usando find encuentro el objeto cuyo type es default para luego coger el title de ese objeto

        let seriesId = element.mal_id; //recogo el id de cada serie para luego poder modificarlas al clickarlas como favoritas

        renderSeries(imgURL, defaultTitle, seriesId);
    }
}

function getDataAPI(seriesName){
    fetch(`https://api.jikan.moe/v4/anime?q=${seriesName}`) //COMILLAS FRANCESAS PARA CONCATENAR
    .then ((resp) => resp.json())
    .then ((allData) =>{
        resultData = allData.data; //primero lleno mi array con los datos
        // console.log(resultData);
        selectInfo();
    });
}

const handleSearch = () => {
    let seriesName = searchText.value;

    getDataAPI(seriesName); //le paso el parámetro para luego poder utilizar este valor en la url de la API
}

searchBtn.addEventListener('click', handleSearch)