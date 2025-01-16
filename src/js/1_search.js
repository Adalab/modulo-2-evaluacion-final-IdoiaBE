const searchText = document.querySelector('.js-searchText');

const searchBtn = document.querySelector('.js-searchBtn');

const searchList = document.querySelector('.js-searchList');

const favList = document.querySelector('.js-favList');

//creo un array donde voy a guardar los datos que me da la API (para luego pintarlos) y otro para almacenar los favoritos
let resultData = [];
let favouritesList = [];

// const renderFavourites = (selectedId) => {
//     //recorro el array de favoritos para pintar cada elemento en la ul de favoritos
//     for (eachElement of favouritesList){
//         let = eachElement
//     }
// }

function favouritesArrayManagement (selectedLi, selectedId){
    if (selectedLi.classList.contains('bookmark')) {
        // Si tiene la clase
        //busco en el array de favoritos la posición del objeto que tiene ese mismo id
        let isItFavourite = favouritesList.findIndex((position) => position.selectedId);
        console.log(isItFavourite);
        if (isItFavourite === -1) {
            //si el findIndex me da -1, significa que no ha encontrado la posición de ese objeto, es decir, que no está en los favoritos
            let selectedSeries = resultData.find((object) => object.mal_id === selectedId); //busco el objeto en el array de resultados que tenga ese mismo id 

            //y lo añado al array de favoritos
            favouritesList.push(selectedSeries);
        }
    } else {
        // Si no tiene la clase, si se deselecciona
        favouritesList = favouritesList.filter(item => item.mal_id !== selectedId);//filtro el array para que estén sólo los items que sean diferentes al li con el id seleccionado
    }
    // console.log(favouritesList);
    //pinto los elementos que hay en el array de favoritos en la ul
    renderFavourites(selectedId);
}

const selectFavourties = () => {
    const allLi = document.querySelectorAll('.js-listItem'); //Me devuelve un array

    for (const eachLi of allLi) {
        eachLi.addEventListener('click', (ev)=>{
            let selectedLi = ev.currentTarget;
            selectedLi.classList.toggle('bookmark'); //le añado la clase de favorito
            let selectedId = parseInt(ev.currentTarget.id); //cogo el id y lo paso a formato número para buscarlo luego en los arrays
         
            favouritesArrayManagement (selectedLi, selectedId);
        });
    }
}


function renderSeries (imgURL, defaultTitle, seriesId, list){
    //si el elemento tiene los objetos que contienen la url, es decir, si tiene imagen
    if (imgURL){
        //pinto los datos recogidos
        list.innerHTML += `<li id="${seriesId}" class="js-listItem">
        <img src="${imgURL}" alt="${defaultTitle}">
        <h3>${defaultTitle}</h3>
        </li> `
    } else{ //si no, le pongo un placeholder como img
        list.innerHTML += `<li id="${seriesId}" class="js-listItem">
        <img src="https://placehold.co/300x400?text=${defaultTitle}" alt="${defaultTitle}">
        <h3>${defaultTitle}</h3>
        </li> `
    }

    selectFavourties();    
}

function selectInfo (list, array){
    list.innerHTML = ''; //para limpiar la lista antes de volver a pintar otros resultados (porque el render se ejecuta dentro del bucle asi que esto tiene que estar fuera)


    //primero hago un bucle para recorrer mi array
    for (const element of array){
        let imgURL = element.images.jpg.image_url; //recogo la url del objeto jpg, que a su vez está dentro del objeto images

        let defaultTitle = element.titles.find(object => object.type === "Default")?.title; //como el title está dentro de otro array llamado titles, hay que recorrerlo. Usando find encuentro el objeto cuyo type es default para luego coger el title de ese objeto

        let seriesId = element.mal_id; //recogo el id de cada serie para luego poder hacer modificaciones

        renderSeries(imgURL, defaultTitle, seriesId, list);
    }
}

function getDataAPI(seriesName){
    fetch(`https://api.jikan.moe/v4/anime?q=${seriesName}`) //COMILLAS FRANCESAS PARA CONCATENAR
    .then ((resp) => resp.json())
    .then ((allData) =>{
        resultData = allData.data; //primero lleno mi array con los datos
        // console.log(resultData);
        selectInfo(searchList, resultData);
    });
}

const handleSearch = () => {
    let seriesName = searchText.value;

    getDataAPI(seriesName); //le paso el parámetro para luego poder utilizar este valor en la url de la API
}

searchBtn.addEventListener('click', handleSearch)