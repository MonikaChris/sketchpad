//Get info from local storage to set up user-specific content and check for gopher and ribbons
let username = localStorage.getItem('currentUsername');
let user = JSON.parse(localStorage.getItem(username));
    //Ribbons & Gopher
let ribbon1Present = JSON.parse(localStorage.getItem('ribbon1Present'));
let ribbon2Present = JSON.parse(localStorage.getItem('ribbon2Present'));
let gopherPresent = JSON.parse(localStorage.getItem('gopherPresent'));

//Variables
let trash1 = document.querySelector('#trash1');
let trash2 = document.querySelector('#trash2');
let hole = document.querySelector('#hole');
let zzz = document.querySelector('#zzz');

//Event Listeners
trash1.addEventListener('click', deleteArt1);
trash2.addEventListener('click', deleteArt2);
hole.addEventListener('click', wakeGopher);

//Initial Setup: set title, load any artwork, load ribbon and gopher if present
document.querySelector('.title').textContent = `${username}'s Gallery`;

if(user.myGallery.artwork1 !== null) {
    loadArt(user.myGallery.artwork1, '#art1');
}

if(user.myGallery.artwork2 !== null) {
    loadArt(user.myGallery.artwork2, '#art2');
}

if (ribbon1Present) {
    let ribbon1 = document.querySelector('#ribbon1');
    ribbon1.classList.remove('hide');
}

if (ribbon2Present) {
    let ribbon2 = document.querySelector('#ribbon2');
    ribbon2.classList.remove('hide');
}

if (!gopherPresent) {
    let gopher =document.querySelector('#gopher');
    gopher.classList.add('hide');
}

if (gopherPresent) {
    //If gopher woke up, show static gopher on webpage reload
    let gopher = document.querySelector('#gopher');
    gopher.classList.remove('gopher-animate');
    gopher.classList.remove('hide');
    gopher.classList.add('gopher-static');
}

//Functions
function loadArt(artwork, position) {
    //Store array of pixel color values
    let pixelData = artwork;

    //Store grid dimension
    let gridWidth = Math.sqrt(artwork.length);

    let canvas = document.querySelector(position);
    
    //Add colored pixels to canvas
    for(let i = 0; i < pixelData.length; i++) {
        let pixel = document.createElement('div');
        pixel.setAttribute('style', `background-color: ${pixelData[i]};`);
        canvas.appendChild(pixel);
    }

    //Set canvas pixel grid dimensions
    document.querySelector(position).style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
    document.querySelector(position).style.gridTemplateRows = `repeat(${gridWidth}, 1fr)`;
}

function deleteArt1() {
    //Return if no art present
    let canvas = document.querySelector('#art1');
    if (!canvas.firstChild) {
        alert('This frame is already empty.');
        return;
    }
    
    let answer = prompt('Are you sure you want to permanently delete this piece of art? Type "Yes" or "No":');
    
    //Exit function if user hits cancel
    if(answer === null) return;
    
    answer.toLowerCase();

    if(answer === 'yes' || answer === 'y') {
        //update local storage
        user.myGallery.artwork1 = null;
        localStorage.setItem(username, JSON.stringify(user));
        
        //update screen
        clearCanvas('#art1');
        
        //check ribbon and gopher status and update if necessary
        if (ribbon1Present) {
            let gopher = document.querySelector('#gopher');
            let ribbon = document.querySelector('#ribbon1');
            
            gopher.classList.add('hide');
            ribbon.classList.add('hide');
            
            //Update local storage and session variables
            localStorage.setItem('ribbon1Present', JSON.stringify(false));
            ribbon1Present = false;
            localStorage.setItem('gopherPresent', JSON.stringify(false));
            gopherPresent = false; 
        }
    }
}

function deleteArt2() {
    //Return if no art present
    let canvas = document.querySelector('#art2');
    if (!canvas.firstChild) {
        alert('This frame is already empty.');
        return;
    }
    
    let answer = prompt('Are you sure you want to permanently delete this piece of art?');

    //Exit function if user hits cancel
    if(answer === null) return;

    answer.toLowerCase();

    if(answer === 'yes' || answer === 'y') {
        //update local storage
        user.myGallery.artwork2 = null;
        localStorage.setItem(username, JSON.stringify(user));

        //update screen
        clearCanvas('#art2');

        //check ribbon and gopher status and update if necessary
        if (ribbon2Present) {
            let gopher = document.querySelector('#gopher');
            let ribbon = document.querySelector('#ribbon2');
            
            gopher.classList.add('hide');
            ribbon.classList.add('hide');
            
            //Update local storage and session variables
            localStorage.setItem('ribbon2Present', JSON.stringify(false));
            ribbon2Present = false; 
            localStorage.setItem('gopherPresent', JSON.stringify(false));
            gopherPresent = false;
        }
    }    
}

function clearCanvas(art) {
    let canvas = document.querySelector(art);

    while(canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function wakeGopher() {
    //Exit function if gopher is already awake
    if(ribbon1Present || ribbon2Present) return;
    
    let art1 = document.querySelector('#art1');
    let art2 = document.querySelector('#art2');
    
    //If there are not 2 artworks to judge, gopher sleeps
    if (!art1.firstChild || !art2.firstChild) {
        zzz.classList.remove('hide');
        setTimeout(function() {
            zzz.classList.add('hide');
        }, 1500);
    }

    //If there are 2 artworks, gopher wakes and rewards one artwork with a ribbon
    else {
        //Animate gopher and set gopher variables
        let gopher = document.querySelector('#gopher');
        gopher.classList.add('gopher-animate');
        gopher.classList.remove('hide');
        localStorage.setItem('gopherPresent', JSON.stringify(true));

        //Gopher's selection of artwork 1 or 2
        gopherPick = randomNum(1,2);

        //Delay ribbon award until gopher fully wakes, award ribbon to gopher's choice of 1 or 2
        setTimeout(function() {
            if (gopherPick === 1) {
                let ribbon1 = document.querySelector('#ribbon1');
                ribbon1.classList.remove('hide');
                
                localStorage.setItem('ribbon1Present', JSON.stringify(true));
                ribbon1Present = true;
            }

            if (gopherPick === 2) {
                let ribbon2 = document.querySelector('#ribbon2');
                ribbon2.classList.remove('hide');
                
                localStorage.setItem('ribbon2Present', JSON.stringify(true));
                ribbon2Present = true;
            }
        }, 4000);
    }
}

//Math Functions
function randomNum(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}