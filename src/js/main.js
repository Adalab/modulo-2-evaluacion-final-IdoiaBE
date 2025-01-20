'use strict';

const searchText = document.querySelector('.js-searchText');

const searchBtn = document.querySelector('.js-searchBtn');

const searchList = document.querySelector('.js-searchList');

const favList = document.querySelector('.js-favList');

const favBtn = document.querySelector('.js-favBtn');

//creo un array donde voy a guardar los datos que me da la API (para luego pintarlos) y otro para almacenar los favoritos
let resultData = [];
let favouritesList = [];

function deleteFavourites(deleteIcons){

    for(const eachX of deleteIcons){
        function handleDeleteFav(ev){
            const deleteId = parseInt(ev.currentTarget.closest('li').id);

            favouritesList = favouritesList.filter((item) => item.mal_id !== deleteId);

            renderFavourites();
        }
        

        eachX.addEventListener('click', handleDeleteFav)
    }
}

const renderFavourites = () => {
    favList.innerHTML = '';
    //recorro el array de favoritos para recoger los datos que luego quiero pintar
    for (const eachElement of favouritesList){
        const imgURL = eachElement.images.jpg.image_url; 
        const defaultTitle = eachElement.titles.find(object => object.type === "Default")?.title;
        const seriesId = eachElement.mal_id; 

        //pinto los datos recogidos
        if (imgURL !== "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"){
            favList.innerHTML += `
            <li id="${seriesId}" class="js-listItem">
                <img src="${imgURL}" alt="${defaultTitle}">
                <h3 class="saved">${defaultTitle}</h3>
                <i class="fa-solid fa-xmark js-delete-fav"></i>
            </li> 
            `;
        } else{ //si no, le pongo un placeholder como img
            favList.innerHTML += `
            <li id="${seriesId}" class="js-listItem">
                <img src="https://placehold.co/300x400?text=${defaultTitle}" alt="${defaultTitle}">
                <h3 class="saved">${defaultTitle}</h3>
                <i class="fa-solid fa-xmark js-delete-fav"></i>
            </li> 
            `;
        }

        const deleteIcons = document.querySelectorAll('.js-delete-fav');

        deleteFavourites(deleteIcons);
    }
}

function favouritesArrayManagement (selectedLi, selectedId){
    if (selectedLi.classList.contains('bookmark')) {
        // Si tiene la clase
        //busco en el array de favoritos la posición del objeto que tiene ese mismo id
        let isItFavourite = favouritesList.findIndex((position) => position.mal_id === selectedId);
        console.log(isItFavourite);
        if (isItFavourite === -1) {
            //si el findIndex me da -1, significa que no ha encontrado la posición del objeto con ese mismo id, es decir, que no está en los favoritos
            console.log(favouritesList);
            let selectedSeries = resultData.find((object) => object.mal_id === selectedId); //busco el objeto en el array de resultados que tenga ese mismo id 

            //y lo añado al array de favoritos
            favouritesList.push(selectedSeries);
        }
    } else {
        // Si no tiene la clase, si se deselecciona
        favouritesList = favouritesList.filter(item => item.mal_id !== selectedId);//filtro el array para que estén sólo los items que sean diferentes al li con el id seleccionado
    }
    // console.log(favouritesList);
    localStorage.setItem('favouritesList', JSON.stringify(favouritesList));//cada vez que selecciono un favorito, guardo el nuevo array de favoritos en el localStorage

    //pinto los elementos que hay en el array de favoritos en la ul
    renderFavourites();
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


function renderSeries (imgURL, defaultTitle, japaneseTitle, episodes, seriesId){
    // console.log(resultData);

    //forma más larga y repetitiva (lo primero que se me ha ocurrido)
    // if (imgURL !== "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" && episodes !== null){
    //     searchList.innerHTML += `
    //     <li id="${seriesId}" class="js-listItem">
    //         <img src="${imgURL}" alt="${defaultTitle}">
    //         <h3>${defaultTitle}</h3>
    //         <h2>${japaneseTitle}</h2>
    //         <p>${episodes}</p>
    //     </li> 
    //     `;
    // } else if (imgURL !== "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" && episodes === null){
    //     searchList.innerHTML += `
    //     <li id="${seriesId}" class="js-listItem">
    //         <img src="${imgURL}" alt="${defaultTitle}">
    //         <h3>${defaultTitle}</h3>
    //         <h2>${japaneseTitle}</h2>
    //     </li> 
    //     `;
    //  } else if(imgURL === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" && episodes !== null){ 
    //     //si no, le pongo un placeholder como img
    //     searchList.innerHTML += `
    //     <li id="${seriesId}" class="js-listItem">
    //         <img src="https://placehold.co/300x400?text=${defaultTitle}" alt="${defaultTitle}">
    //         <h3>${defaultTitle}</h3>
    //         <h2>${japaneseTitle}</h2>
    //         <p>${episodes}</p>
    //     </li> 
    //     `;
    // } else{
    //     searchList.innerHTML += `
    //     <li id="${seriesId}" class="js-listItem">
    //         <img src="https://placehold.co/300x400?text=${defaultTitle}"             alt="${defaultTitle}">
    //         <h3>${defaultTitle}</h3>
    //         <h2>${japaneseTitle}</h2></li> `;}
    //     

    const imageSrc = imgURL === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" 
        ? `https://placehold.co/300x400?text=${defaultTitle}` 
        : imgURL;

    let listItemHTML = `
        <li id="${seriesId}" class="js-listItem">
            <img src="${imageSrc}" alt="${defaultTitle}">
            <h3>${defaultTitle}</h3>
            <h2>${japaneseTitle}</h2>
    `;

    if (episodes !== null) {
        listItemHTML += `<p>${episodes}</p>`;
    }

    listItemHTML += `</li>`;

    searchList.innerHTML += listItemHTML;

    //con DOM avanzado
    // // Crear el elemento <li>
    // const listItem = document.createElement('li');
    // listItem.id = seriesId;
    // listItem.classList.add('js-listItem');

    // // Crear el elemento <img> y establecer atributos
    // const img = document.createElement('img');
    // img.src = imgURL === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
    //     ? `https://placehold.co/300x400?text=${defaultTitle}`
    //     : imgURL;
    // img.alt = defaultTitle;

    // // Crear el elemento <h3> para el título en inglés
    // const h3 = document.createElement('h3');
    // h3.textContent = defaultTitle;

    // // Crear el elemento <h2> para el título japonés
    // const h2 = document.createElement('h2');
    // h2.textContent = japaneseTitle;

    // // Añadir los elementos <img>, <h3> y <h2> al <li>
    // listItem.appendChild(img);
    // listItem.appendChild(h3);
    // listItem.appendChild(h2);

    // // Si los episodios están disponibles, crear y añadir el <p>
    // if (episodes !== null) {
    //     const p = document.createElement('p');
    //     p.textContent = episodes;
    //     listItem.appendChild(p);
    // }

    // // Añadir el <li> a la lista
    // searchList.appendChild(listItem);

    selectFavourties();    
}

function selectInfo (list, array){
    list.innerHTML = ''; //para limpiar la lista antes de volver a pintar otros resultados (porque el render se ejecuta dentro del bucle asi que esto tiene que estar fuera)

    //primero hago un bucle para recorrer mi array
    for (const element of array){
        const imgURL = element.images.jpg.image_url; //recogo la url del objeto jpg, que a su vez está dentro del objeto images

        const defaultTitle = element.titles.find(object => object.type === "Default")?.title; //como el title está dentro de otro array llamado titles, hay que recorrerlo. Usando find encuentro el objeto cuyo type es default para luego coger el title de ese objeto
        const japaneseTitle = element.titles.find(object => object.type === "Japanese")?.title; 
        const episodes = element.episodes;
        const seriesId = element.mal_id; //recogo el id de cada serie para luego poder hacer modificaciones

        renderSeries(imgURL, defaultTitle, japaneseTitle, episodes, seriesId);
    }
}

function getDataAPI(seriesName){
    fetch(`https://api.jikan.moe/v4/anime?q=${seriesName}`) //COMILLAS FRANCESAS PARA CONCATENAR
    .then ((resp) => resp.json())
    .then ((allData) =>{
        resultData = allData.data; //primero lleno mi array con los datos
        //console.log(resultData);
        selectInfo(searchList, resultData);
    });
}

const handleSearch = () => {
    let seriesName = searchText.value;

    getDataAPI(seriesName); //le paso el parámetro para luego poder utilizar este valor en la url de la API
}

searchBtn.addEventListener('click', handleSearch)

const favouritesLS = localStorage.getItem('favouritesList');

if(favouritesLS){
    const favouritesArray = JSON.parse(favouritesLS);
    favouritesList = favouritesArray;
    renderFavourites();
} else {
    favList.innerHTML = '<p>No tienes favoritos guardados aún.</p>';
}

function handleFavNumber(){
    const numberFavArray = favouritesList.length;
    
    console.log(`La lista de favoritos tiene ${numberFavArray} favoritos`);


}

favBtn.addEventListener('click', handleFavNumber)