const canvas = document.querySelector('.canvas');
let gridWidth = document.querySelector('#dimensions').value;

let canvasWidth = canvas.offsetWidth - 45;
let canvasHeight = canvas.offsetHeight - 45;
// console.log({ canvasWidth, canvasHeight })
let boxSize = pickBoxSize(canvasWidth, canvasHeight, gridWidth);
let cellsAcross = Math.floor((canvasWidth - 20) / boxSize);

function pickBoxSize(canvasWidth, canvasHeight, gridWidth) {
    let smallerDimension;
    canvasWidth > canvasHeight ? smallerDimension = canvasHeight : smallerDimension = canvasWidth;
    return Math.floor(smallerDimension / gridWidth);
}
// console.log(`each box is ${boxSize}px wide and ${boxSize}px high`);

drawGrid(cellsAcross, gridWidth, boxSize);

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

    let newR = darken(r, 50);
    let newG = darken(g, 50);
    let newB = darken(b, 50);
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