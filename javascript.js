let slider = document.querySelector('input[type="range"]');
let gridSize = document.querySelector('input[type="range"]').value;

slider.addEventListener("change", updateGrid);

function updateGrid() {
    let sliderLabel = document.querySelector('#label-slider');
    
    gridSize = document.querySelector('input[type="range"]').value;
    
    //Update Slider Label
    if(parseInt(gridSize) < 10) {
        sliderLabel.textContent = `0${gridSize}x0${gridSize}`;
    }
    else {
        sliderLabel.textContent = `${gridSize}x${gridSize}`;
    }

    //Draw Grid
    
    

}