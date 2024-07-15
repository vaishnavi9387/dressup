let currentDressIndex = -1;
const dresses = [
    'dress7.jpg',
    'dress5.jpg',
    'dress6.jpg'
];

const modelContainer = document.getElementById('model-container');
const forwardBtn = document.getElementById('forward-btn');
const backwardBtn = document.getElementById('backward-btn');

forwardBtn.addEventListener('click', () => {
    currentDressIndex = (currentDressIndex + 1) % dresses.length;
    addDressToModel(dresses[currentDressIndex]);
});

backwardBtn.addEventListener('click', () => {
    currentDressIndex = (currentDressIndex - 1 + dresses.length) % dresses.length;
    addDressToModel(dresses[currentDressIndex]);
});

function addDressToModel(dressSrc) {
    const dressElement = document.createElement('img');
    dressElement.src = dressSrc;
    dressElement.classList.add('draggable-dress');
    modelContainer.appendChild(dressElement);
}

// Drag and Drop Functionality
let draggedElement;

function drag(event) {
    draggedElement = event.target.cloneNode(true);
    draggedElement.classList.add("draggable-dress");
    document.body.appendChild(draggedElement);

    draggedElement.style.position = "absolute";
    draggedElement.style.left = `${event.clientX}px`;
    draggedElement.style.top = `${event.clientY}px`;

    draggedElement.style.zIndex = 1000;

    draggedElement.ondragstart = (e) => {
        e.preventDefault(); // Prevent further dragging
    };
}

document.addEventListener('mousemove', (event) => {
    if (draggedElement) {
        draggedElement.style.left = `${event.clientX}px`;
        draggedElement.style.top = `${event.clientY}px`;
    }
});

document.addEventListener('mouseup', (event) => {
    if (draggedElement) {
        const modelRect = modelContainer.getBoundingClientRect();

        if (
            event.clientX > modelRect.left &&
            event.clientX < modelRect.right &&
            event.clientY > modelRect.top &&
            event.clientY < modelRect.bottom
        ) {
            modelContainer.appendChild(draggedElement);
            draggedElement.style.left = `${event.clientX - modelRect.left}px`;
            draggedElement.style.bottom = `${modelRect.bottom - event.clientY}px`;
        } else {
            draggedElement.remove();
        }

        draggedElement = null;
    }
});

