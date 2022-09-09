const canvas = document.querySelector('.canvas');
let grid = document.querySelector(`#dimensions`);
let gridWidth = document.querySelector('#dimensions').value;
let canvasWidth = Math.floor(canvas.offsetWidth*0.9);
let canvasHeight = Math.floor(canvas.offsetHeight*0.9);

let brushSetting = "soft";
let colorPicker = document.querySelector('#color-picker');
let colorSetting = [0, 0, 0];
colorPicker.addEventListener('input', updateColorSetting);

let brushbuttons = document.querySelectorAll('input[name="brush-style"]');
brushbuttons.forEach(button => {
    button.addEventListener('click', updateBrushSetting);

});

function updateBrushSetting(e) {
    // console.log(e.target.value);
    brushSetting = e.target.value;
}
function updateColorSetting(e) {
    colorSetting = hexToRgb(e.target.value);
    // console.log(colorSetting);
}

//draw canvas -----------------------------------------
let boxSize = pickBoxSize(canvasWidth, canvasHeight, gridWidth);
let cellsAcross = Math.floor((canvasWidth) / boxSize);
drawGrid(cellsAcross, gridWidth, boxSize);

// creating grid functions *****************************
grid.addEventListener('change', reDrawGrid);

function reDrawGrid(e) {
    if (!e.target.value) {
        gridWidth = gridWidth;
    } else {
        gridWidth = e.target.value;
    }
    // console.log(e.target.value);

    removeOldGrid();

    let canvasWidth = canvas.offsetWidth - 45;
    let canvasHeight = canvas.offsetHeight - 45;

    let newBoxSize = pickBoxSize(canvasWidth, canvasHeight, gridWidth);
    let cellsAcross = Math.floor((canvasWidth) / newBoxSize);

    drawGrid(cellsAcross, gridWidth, newBoxSize);
}

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

// drawing functions ******************************
function brush(e) {
    let targetDiv = e.target;
    let targetBackground = targetDiv.style.backgroundColor;

    if (!targetBackground) {
        targetDiv.style.backgroundColor = targetBackground = `rgb(255, 255, 255)`
    }

    let currentColor = targetBackground;
    let [r, g, b] = getRGBfromString(currentColor);
    // console.log(`red: ${r}, blue: ${b}, green: ${g}`);

    let newColor;
    if (brushSetting == 'darken') {
        let darkenBy = 50;
        newColor = darken(r, g, b, darkenBy);
    } else if (brushSetting == 'rainbow') {
        newColor = getRandomColor();

    } else if (brushSetting == 'erase') {
        newColor = erase();
    } else if (brushSetting == 'hard') {
        newColor = useChosenColor();
    } else if (brushSetting == 'soft') {
        let newColorWeight = 25;
        newColor = softBrush(r, g, b, newColorWeight);
    }

    targetDiv.style.backgroundColor = `rgb(${newColor[0]},${newColor[1]},${newColor[2]})`;
    // console.log(`now it's ${targetDiv.style.backgroundColor}`)
}

function getRGBfromString(rgbString) {
    let numberString = rgbString.slice(4, -1);
    let rgbArray = numberString.split(",");
    return rgbArray;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
    // return result ? {
    //     r: parseInt(result[1], 16),
    //     g: parseInt(result[2], 16),
    //     b: parseInt(result[3], 16)
    // } : null;
}

function darken(r, g, b, amount) {
    let originalColor = [r, g, b];
    let newColor = [];
    originalColor.forEach(color => {

        if (color >= amount) {
            newColor.push(color - amount);

        } else {
            newColor.push(0);
        }
    })
    // console.log(`new color is: ${newColor}`);

    // originalColor >= amount ? newColor = originalColor - amount : newColor = 0;
    return newColor;
}

function softBrush(r, g, b, amount) {
    let newR = Math.floor((amount * colorSetting[0] + (100 - amount) * r) / 100);
    let newG = Math.floor((amount * colorSetting[1] + (100 - amount) * g) / 100);
    let newB = Math.floor((amount * colorSetting[2] + (100 - amount) * b) / 100);
    let newColor = [newR, newG, newB];
    return newColor;
}
function erase() {
    return [255, 255, 255];
}
function getRandomColor() {
    let newColor = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    return newColor;
}
function useChosenColor() {
    let chosenColor = colorSetting;
    return chosenColor;
}
// clear canvas *******************************

const clearButton = document.querySelector('#clear-canvas');
clearButton.addEventListener('click', reDrawGrid);