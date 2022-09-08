const canvas = document.querySelector('.canvas');
let gridWidth = document.querySelector('#dimensions').value;

let canvasWidth = canvas.offsetWidth-45;
let canvasHeight = canvas.offsetHeight-45;
console.log({canvasWidth, canvasHeight})
let boxSize = pickBoxSize(canvasWidth, canvasHeight, gridWidth);
let cellsAcross = Math.floor((canvasWidth-20)/boxSize);

function pickBoxSize(canvasWidth, canvasHeight, gridWidth) {
    let smallerDimension;
    canvasWidth > canvasHeight ? smallerDimension = canvasHeight : smallerDimension = canvasWidth;
    return Math.floor(smallerDimension/gridWidth);
}
console.log(`each box is ${boxSize}px wide and ${boxSize}px high`);

drawGrid(cellsAcross, gridWidth, boxSize);

function drawGrid(width, height, boxSize) {
    for (let i = 1; i <= height; i++) {
        let newRow = document.createElement('div');
        newRow.classList.add('canvas-row');
        canvas.appendChild(newRow);
        console.log('made a row');
        for (let j = 1; j <= width; j++) {
            let newBox = document.createElement('div');
            newBox.classList.add('canvas-box');
            newRow.appendChild(newBox);
        }
    }
    let boxes = document.querySelectorAll('.canvas-box');
    boxes.forEach(box => box.setAttribute('style', `width: ${boxSize}px; height: ${boxSize}px`))
}
console.log(canvas);