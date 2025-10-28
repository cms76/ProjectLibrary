const myLibrary = [];

function Book() {
    if (!new.target) {
        throw 'Book constructor must be called with "new"';
    }
    this.id = crypto.randomUUID();
    this.title = "";
    this.author = "";
    this.nPages = -1;

    this.toggleRead = function() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, nPages, read) {
    const book = new Book();
    book.title = title;
    book.author = author;
    book.nPages = nPages;
    book.read = read;
    myLibrary.push(book);
}

function addBookBtnClicked() {
    //show modal dialog enter-book-dialog
    const dialog = document.getElementById("enter-book-dialog");
    dialog.showModal();
}

function closeDialog() {
    const dialog = document.getElementById("enter-book-dialog");
    dialog.close();
}

function submitAndCloseDialog() {
    //Todo: read input values and add book to library
    
    const dialog = document.getElementById("enter-book-dialog");
    dialog.close();
}

function renderLibrary() {
    const libraryTable = document.getElementById("library-table");
    const libraryTableBody = libraryTable.querySelector("tbody");
    //clear the rows first
    libraryTableBody.innerHTML = "";
    

    myLibrary.forEach((book) => {

        const tableRow = document.createElement("tr");
        
        const bookData = document.createElement("td");
        bookData.textContent = book.title;
        tableRow.appendChild(bookData);

        const authorData = document.createElement("td");
        authorData.textContent = book.author;
        tableRow.appendChild(authorData);

        const pagesData = document.createElement("td");
        pagesData.textContent = book.nPages;
        tableRow.appendChild(pagesData);

        const readData = document.createElement("td");
        const readCheckbox = document.createElement("input");
        readCheckbox.type = "checkbox";
        readCheckbox.checked = book.read;
        readData.appendChild(readCheckbox);
        readCheckbox.bookData = book; //attach book data to checkbox for reference
        readCheckbox.onchange = function(event)
             { event.currentTarget.bookData.toggleRead(); };
        tableRow.appendChild(readData);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        const deleteBtnImg = document.createElement("img");
        deleteBtnImg.src = "trash-can-outline.svg";
        deleteBtn.appendChild(deleteBtnImg);
        deleteBtn.bookData = book; //attach book data to button for reference
        deleteBtn.onclick = deleteBtnClicked;
        tableRow.appendChild(deleteBtn);

        libraryTableBody.appendChild(tableRow);        
    });
}

function deleteBtnClicked(event) {
    const bookToDelete = event.currentTarget.bookData;
    const bookIndex = myLibrary.findIndex((book) => book.id === bookToDelete.id);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        renderLibrary();
    }
}

function initialize() {
    const book = new Book();
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
    addBookToLibrary("1984", "George Orwell", 328, false);
    addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

    const form = document.getElementById('book-form'); // Replace with your form's ID or reference
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      submitAndKeepOpen(event);
    });

    renderLibrary();
}

function submitAndKeepOpen(event) {
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const nPagesInput = document.getElementById("pages");
    const readCheckbox = document.getElementById("read");

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const nPages = parseInt(nPagesInput.value);
    const read = readCheckbox.checked;

    //check if form has valid data
    const form = document.getElementById("book-form");
    const isValid = form.reportValidity();
    if (!isValid) {
        return;
    }

    addBookToLibrary(title, author, nPages, read);
    renderLibrary();        
    // Clear input fields after submission
    titleInput.value = "";
    authorInput.value = "";
    nPagesInput.value = "";    
}

function submitAndCloseDialog() {
    submitAndKeepOpen();
    closeDialog();
}

initialize();