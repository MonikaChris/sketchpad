//Login Variables
let registerButton = document.querySelector('#register');
let loginButton = document.querySelector('#login');
let saveButton = document.querySelector('#save');
let galleryButton = document.querySelector('#gallery');
let logOutButton = document.querySelector('#logout');
let currentUsername;
let currentUser;

//Pixel-sketch Variables
let slider = document.querySelector('input[type="range"]');
let gridSize = document.querySelector('input[type="range"]').value;
let clearButton = document.querySelector('#right-button');
let colorButton = document.querySelector('#left-button');
let drawingColor = 'black';

//Event Listeners for login
registerButton.addEventListener('click', register);
loginButton.addEventListener('click', login);
saveButton.addEventListener('click', save);
logOutButton.addEventListener('click', logOut);

//Event Listeners for pixel-sketch
slider.addEventListener('change', updateGrid);
clearButton.addEventListener('mousedown', updateGrid);
colorButton.addEventListener('mousedown', changeColor);

//Initial Setup
//Check if someone is logged in
//'currentUsername' is a key - its paired value is the username of the current user
//currentUsername is a user object stored as a value and the associated name is the key
if("currentUsername" in localStorage) {
    currentUsername = localStorage.getItem('currentUsername');
    currentUser = JSON.parse(localStorage.getItem(currentUsername));

    //Change button display after logging in
    loggedInButtonDisplay();

}
else currentUsername = null;


//Start pixel-sketch
drawGrid(gridSize);


//Functions for login
function loggedInButtonDisplay() {
    registerButton.classList.add('hide');
    loginButton.classList.add('hide');
    saveButton.classList.remove('hide');
    galleryButton.classList.remove('hide');
    logOutButton.classList.remove('hide');

}

function register() {
    let name = window.prompt('Enter your name:');
    if (!(name in localStorage)) {
        let user = new User(name);
        localStorage.setItem(name, JSON.stringify(user));
    }

    else alert('You are already registered! Log in or enter a different username.');
}

function login() {
    let name = window.prompt('Enter your username:');
    if (!(name in localStorage)) {
        name = prompt("Username not found. Please enter valid username or register new account.");
    }

    else {
        localStorage.setItem('currentUsername', name);
        currentUsername = name;
        currentUser = JSON.parse(localStorage.getItem(name));


        
    }

    //Change button display after logging in
    loggedInButtonDisplay();
}

function save() {

    if(currentUser.myGallery.artwork1 !== null && currentUser.myGallery.artwork2 !== null) {
        alert("Unfortunately your gallery is full. You'll need to delete art to make room for new creations.")
        return;
    }

    let newArt = getScreenArt();

    if(currentUser.myGallery.artwork1 === null) {        
        currentUser.myGallery.artwork1 = newArt;
        localStorage.setItem(currentUsername, JSON.stringify(currentUser));
    }

    else {
        currentUser.myGallery.artwork2 = newArt;
        localStorage.setItem(currentUsername, JSON.stringify(currentUser));
    }

    

    alert("Your artwork has been saved! Go to your gallery to view your saved art :)");

}

function getScreenArt() {
    //Array to hold all screen pixel colors
    let screenArt = [];
    let pixels = document.querySelectorAll('#screen > div');
    
    pixels.forEach(pixel => screenArt.push(pixel.style.backgroundColor));

    return screenArt;
}

function logOut() {
    registerButton.classList.remove('hide');
    loginButton.classList.remove('hide');
    saveButton.classList.add('hide');
    galleryButton.classList.add('hide');
    logOutButton.classList.add('hide');

    localStorage.removeItem('currentUsername');
    currentUsername = null;
    currentUser = null;
}


//Objects
function User(name) {
    this.name = name;
    this.myGallery = new Gallery;

    this.deleteUser = function() {
        let choice = window.prompt("Are you sure you want to delete your account?");
        choice.toLowerCase;
        if(choice === "yes" || choice === 'y') {
            localStorage.removeItem(this);
        }
    }
}

function Gallery() {
    this.artwork1 = null;
    this.artwork2 = null;
    
    this.addArt = function(artwork) {
        Object.values(this).forEach (art => {
            if(!art) {
                art = artwork;
                return;
            }
        })
        alert("Your gallery is full. Please delete one artwork to save new art.");
    }

    this.deleteArt = function(artwork) {
        localStorage.removeItem(artwork);
    }
}

//Functions for pixel-sketch
function updateGrid() {
    gridSize = document.querySelector('input[type="range"]').value;
    
    updateSliderLabel();
    drawGrid(gridSize);
}


function updateSliderLabel() {
    let sliderLabel = document.querySelector('#label-slider');

    //Add leading zero to single digits display
    if(parseInt(gridSize) < 10) {
        sliderLabel.textContent = `0${gridSize}x0${gridSize}`;
    }
    
    else sliderLabel.textContent = `${gridSize}x${gridSize}`;
}


function drawGrid(gridSize) {
    let cellNumber = gridSize**2;
    let screen = document.querySelector('#screen');

    clearGrid();

    //Create grid cells and add event listener to each cell
    for(let i = 0; i < cellNumber; i++) {
        let cell = document.createElement('div');
        cell.setAttribute('style', 'background-color: white;');
        screen.appendChild(cell);
        cell.addEventListener('mouseover', color);
    }

    //Set grid dimensions
    document.querySelector('#screen').style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    document.querySelector('#screen').style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}


function clearGrid() {
    let screen = document.querySelector('#screen');

    while(screen.firstChild) {
        screen.removeChild(screen.firstChild);
    }
}


function color() {
    button = document.querySelector('#left-button');
    if (button.textContent === 'Rainbow') {
        drawingColor = randomColor();
    }

    this.setAttribute('style', `background-color: ${drawingColor}`);
}


function changeColor(color) {
    button = document.querySelector('#left-button');
    
    if (button.textContent === 'Black') {
        button.textContent = 'Rainbow';
        drawingColor = randomColor();
        button.setAttribute('style', 'background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);')

    }

    else if (button.textContent === 'Rainbow') {
        button.textContent = 'Erase';
        drawingColor = 'white';
        button.setAttribute('style', 'color: rgb(154, 151, 151); text-shadow: 2px 2px 2px black;');
    }

    else {
    drawingColor = 'black';
    button.textContent = 'Black';
    button.setAttribute('style', 'color: black;');
    }

}


function randomColor() {
    let r = randomNum(0, 255);
    let g = randomNum(0, 255);
    let b = randomNum(0, 255);

    return `rgb(${r}, ${g}, ${b})`;
}


function randomNum(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}