//Get user info from local storage
let username = localStorage.getItem('currentUsername');
let user = JSON.parse(localStorage.getItem(username));

//Set gallery title
document.querySelector('.title').textContent = `${username}'s Gallery`;

//Load Art
if(user.myGallery.artwork1 !== null) {
    
    let pixelData = user.myGallery.artwork1;
    let gridWidth = Math.sqrt(user.myGallery.artwork1.length);
    let canvas = document.querySelector('#art1');

    //Add colored pixels to canvas
    for(let i = 0; i < pixelData.length; i++) {
        let pixel = document.createElement('div');
        pixel.setAttribute('style', `background-color: ${pixelData[i]};`);
        canvas.appendChild(pixel);
    }

    //Set canvas dimensions
    document.querySelector('#art1').style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
    document.querySelector('#art1').style.gridTemplateRows = `repeat(${gridWidth}, 1fr)`;

}
        



