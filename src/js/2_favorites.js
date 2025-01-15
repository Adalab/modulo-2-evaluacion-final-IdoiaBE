const allLi = document.querySelectorAll('li');


function handleFavourites (){
    
}

function clickListener (){
    for (eachLi of allLi){
        eachLi.addEventListener('click', handleFavourites)
    }
}