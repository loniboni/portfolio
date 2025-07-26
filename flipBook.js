const flipBook = (elBook) => {
    elBook.style.setProperty("--c", 0); // Set current page
    elBook.querySelectorAll(".page").forEach((page, idx) => {
        page.style.setProperty("--i", idx);
        page.addEventListener("click", (evt) => {
            const curr = evt.target.closest(".back") ? idx : idx + 1;
            elBook.style.setProperty("--c", curr);
        });
    });
};

document.querySelectorAll(".book").forEach(flipBook);

function initializeFlipbook(containerId, imagePaths) {
    console.log(`Checking for container with ID: ${containerId}`);
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }
    console.log(`Container with ID '${containerId}' found successfully.`);

    const book = document.createElement('div');
    book.className = 'book';
    book.style.position = 'absolute';
    book.style.top = '50%';
    book.style.left = '50%';
    book.style.transform = 'translate(-50%, -50%)';

    imagePaths.forEach((path, index) => {
        const page = document.createElement('div');
        page.className = 'page';
        page.style.setProperty('--i', index);

        const front = document.createElement('div');
        front.className = 'front';
        const frontImg = document.createElement('img');
        frontImg.src = path.front;
        frontImg.alt = `Front of page ${index + 1}`;
        front.appendChild(frontImg);

        const back = document.createElement('div');
        back.className = 'back';
        const backImg = document.createElement('img');
        backImg.src = path.back;
        backImg.alt = `Back of page ${index + 1}`;
        back.appendChild(backImg);

        page.appendChild(front);
        page.appendChild(back);
        book.appendChild(page);
    });

    container.appendChild(book);
    flipBook(book);
}