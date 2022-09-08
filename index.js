const canvas = document.querySelector('.canvas');
let grid = document.querySelector(`#dimensions`);
let gridWidth = document.querySelector('#dimensions').value;
let canvasWidth = canvas.offsetWidth - 45;
let canvasHeight = canvas.offsetHeight - 45;
// console.log({ canvasWidth, canvasHeight })

grid.addEventListener('change', reDrawGrid);
function reDrawGrid(e) {
    console.log(e.target.value);
    gridWidth = e.target.value;
    removeOldGrid();
    
    let canvasWidth = canvas.offsetWidth - 45;
    let canvasHeight = canvas.offsetHeight - 45;

    let newBoxSize = pickBoxSize(canvasWidth, canvasHeight, gridWidth);
    let cellsAcross = Math.floor((canvasWidth) / newBoxSize);
    
    drawGrid(cellsAcross, gridWidth, newBoxSize);
}

let boxSize = pickBoxSize(canvasWidth, canvasHeight, gridWidth);
let cellsAcross = Math.floor((canvasWidth) / boxSize);
drawGrid(cellsAcross, gridWidth, boxSize);

function pickBoxSize(canvasWidth, canvasHeight, gridWidth) {
    let smallerDimension;
    canvasWidth > canvasHeight ? smallerDimension = canvasHeight : smallerDimension = canvasWidth;
    return Math.floor(smallerDimension / gridWidth);
}
// console.log(`each box is ${boxSize}px wide and ${boxSize}px high`);

function removeOldGrid() {
    let rows = document.querySelectorAll('.canvas-row');
    rows.forEach(row => row.remove());
}

function drawGrid(width, height, boxSize) {
    for (let i = 1; i <= height; i++) {
        let newRow = document.createElement('div');
        newRow.classList.add('canvas-row');
        canvas.appendChild(newRow);
        // console.log('made a row');
        for (let j = 1; j <= width; j++) {
            let newBox = document.createElement('div');
            newBox.classList.add('canvas-box');
            newRow.appendChild(newBox);
        }
    }
    let boxes = document.querySelectorAll('.canvas-box');
    boxes.forEach(box => box.setAttribute('style', `width: ${boxSize}px; height: ${boxSize}px`))
    boxes.forEach(box => box.addEventListener('mouseover', brush));
}

function brush(e) {
    let targetDiv = e.target;
    let targetBackground = targetDiv.style.backgroundColor;

    if (!targetBackground) {
        targetDiv.style.backgroundColor = targetBackground = `rgb(255,255,255)`
    } else if (targetBackground == 'rgb(0, 0, 0)') {
        return
    }

    let currentColor = targetBackground;
    let [r, g, b] = getRGBfromString(currentColor);
    // console.log(`red: ${r}, blue: ${b}, green: ${g}`);
    let darkenBy = 50;
    let newR = darken(r, darkenBy);
    let newG = darken(g, darkenBy);
    let newB = darken(b, darkenBy);
    targetDiv.style.backgroundColor = `rgb(${newR},${newG},${newB})`;
    // console.log(`now it's ${targetDiv.style.backgroundColor}`)
}

function getRGBfromString(rgbString) {
    let numberString = rgbString.slice(4, -1);
    let rgbArray = numberString.split(",");
    return rgbArray;
}

function darken(originalColor, amount) {
    let newColor;
    originalColor >= amount ? newColor = originalColor - amount : newColor = 0;
    return newColor;
}

function getRandomColor() {
    let newColor = Math.random() * 255;
    return newColor;
}