//Initial Setup
let slider = document.querySelector('input[type="range"]');
let gridSize = document.querySelector('input[type="range"]').value;
let clearButton = document.querySelector('#right-button');

drawGrid(gridSize);


//Event Listeners
slider.addEventListener('change', updateGrid);
clearButton.addEventListener('mousedown', updateGrid);



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
    let color = document.querySelector('#left-button').textContent;
    this.setAttribute('style', `background-color: ${color}`);
}