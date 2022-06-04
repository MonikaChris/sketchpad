//Initial Setup
let slider = document.querySelector('input[type="range"]');
let gridSize = document.querySelector('input[type="range"]').value;
let clearButton = document.querySelector('#right-button');
let colorButton = document.querySelector('#left-button');
let drawingColor = 'black';

drawGrid(gridSize);


//Event Listeners
slider.addEventListener('change', updateGrid);
clearButton.addEventListener('mousedown', updateGrid);
colorButton.addEventListener('mousedown', changeColor);



//Functions
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