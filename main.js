// Buttons & global variables
const addColorButtons = document.querySelectorAll('.featurebutton');
const userColorPicker = document.querySelector('#input-color');
let slider = document.querySelector('#sizeRange');
let color = 'black';

// Grid creation function, which receives optional parameter specifying the number of cells
function newGrid(numberCells) {
    // numberCells will either be specified or initially set to 16
    numberCells = numberCells || 16;
    // Calculate cell width to fill board
    let cellWidth = 40/numberCells + "rem";
    // Calculate cell height to fill board
    let cellHeight = 40/numberCells + "rem";
    // Select the main container div and store in variable
    const mainContainerDiv = document.getElementById("maincontainer");
    // Instantiate array
    let divArray = [];
    // Iterate through for loop creating 16 divs
    for (i = 0; i < numberCells; i++) {
        // For each div created, loop through and create 16 nested divs
        divArray[i] = document.createElement("div");
        // Add the new element with the text content to the DOM
        mainContainerDiv.appendChild(divArray[i]);
        // Iterate through for loop creating 16 divs
        for (j = 0; j < numberCells; j++) {
            // Create a new div
            const newDiv = document.createElement("div");
            // Create a class attribute
            const classAttribute = document.createAttribute("class");
            // Set the value of the class attribute
            classAttribute.value = "gamecell";
            // Add the class attribute to the div
            newDiv.setAttributeNode(classAttribute);
            // Create a style attribute for cell width
            const widthHeightAttribute = document.createAttribute("style")
            // Assign a value to the style attribute
            widthHeightAttribute.value = `width: ${cellWidth}; height: ${cellHeight};`;
            // Add the style attribute to the div
            newDiv.setAttributeNode(widthHeightAttribute);
            // Add the new element with the text content to the DOM
            divArray[i].appendChild(newDiv);
        }
    }
    onLoad();
}


// Function to reset the grid
function resetGrid() {
    let allCells = document.querySelectorAll(".gamecell").forEach(cell => {
        cell.style.backgroundColor = "white";
    })
    let promptNumberCells = prompt("How many squares per side? (Maximum: 100)");
    let numberCells = parseInt(promptNumberCells, 10);
    if (isNaN(numberCells)) {
        window.alert("You must enter a positive integer. (Maximum: 100)");
        return;
    }
    else if (numberCells <= 0) {
        window.alert("You must enter a positive integer. (Maximum: 100)");
        return;
    }
    else if (numberCells > 100) {
        window.alert("You must enter a positive integer. (Maximum: 100)");
        return;
    }
    // Select the main container div and store in variable
    const mainContainerDiv = document.getElementById("maincontainer");
    // Delete all divs from the main container
    while (mainContainerDiv.firstChild) mainContainerDiv.removeChild( mainContainerDiv.firstChild);
    // Trigger another function to amend the grid, passing in the number of cells
    newGrid(numberCells);
}


// Trigger creation of grid on DOM content loaded
window.addEventListener('DOMContentLoaded', (event) => {
    newGrid();
});


// Function to change grid colors
function colorGrid() {
    console.log("triggers colorGrid")
    switch (color) {
        case 'rainbow':
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.classList.remove('opaque');
            break;  
        case 'opaque':
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                    this.classList.add('opaque');
                }
            } else if (this.classList == 'opaque' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
            }
            break;
        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            this.classList.remove('opaque');
            break;
        case 'black':
            this.style.backgroundColor = '#000000';
            this.classList.remove('opaque');
            break;
        default:
            this.style.backgroundColor = color;
            this.classList.remove('opaque');
            break;
    } 
}


// Function to update global color variable when a color button is clicked
function changeColor(event) {
    console.log("triggers changeColor")
    switch (event.target.dataset.color) { 
        case 'rainbow':
            color = 'rainbow';
            break;  
        case 'opaque':
            color = 'opaque';
            break;
        case 'eraser':
            color = 'eraser';
            break;
        default:
            color = 'black';
            break;
    } 
}


// Functions to highlight cells when mouseover and reset when mouseoff
function buttonHover() {
    this.style.border = '3px solid white';
}

function buttonStandard() {
    this.style.border = '3px solid black';
}


// Function to save which color the user selected in color picker element
function userColorSelection(event) {
    color = event.target.value;
}


// Event Listeners
addColorButtons.forEach(addColorButton => addColorButton.addEventListener('click', changeColor));
addColorButtons.forEach(addColorButton => addColorButton.addEventListener('mouseover', buttonHover));
addColorButtons.forEach(addColorButton => addColorButton.addEventListener('mouseout', buttonStandard));
userColorPicker.addEventListener('change', userColorSelection, false);
userColorPicker.addEventListener('input', userColorSelection, false);
//slider.addEventListener('mouseup', pixelSize);

function onLoad() {
    let gridPixels = document.querySelectorAll(".gamecell");
    gridPixels.forEach(gridPixel => gridPixel.addEventListener("mouseover", colorGrid));
}