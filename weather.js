const doc = {
    button : document.getElementById('menu').querySelector('button'),
    data : document.getElementById('data'),
    text : document.getElementById('menu').querySelector('input[type="text"]')
}

const api = "https://www.prevision-meteo.ch/services/json/"

/**
 * get Data from api url
 * @param {} city 
 */
function getData(city){
    fetch(api+city)
        .then(response =>{
            return(response.json())
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log("Erreur : " + error.message)
        })
}

/**
 * Initialise events
 */
function init(){
    doc.button.addEventListener('click', function(){
        getData(doc.text.value)
    });
    document.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            doc.data.innerHTML = doc.text.value;
        }
    });
}

init();