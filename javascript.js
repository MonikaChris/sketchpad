//Initial Setup
let slider = document.querySelector('input[type="range"]');
let gridSize = document.querySelector('input[type="range"]').value;

drawGrid(gridSize);


//Event Listeners
slider.addEventListener("change", updateGrid);


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
    
    clearGrid();
    
    let cellNumber = gridSize**2;
    let screen = document.querySelector('#screen');

    //Create grid cells
    for(let i = 0; i < cellNumber; i++) {
        let cell = document.createElement('div');
        cell.setAttribute('style', 'background-color: white;');
        screen.appendChild(cell);
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