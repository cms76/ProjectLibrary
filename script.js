const myLibrary = [];

function Book() {
    if (!new.target) {
        throw 'Book constructor must be called with "new"';
    }
    this.id = crypto.randomUUID();
    this.title = "";
    this.author = "";
    this.nPages = -1;
}

function addBookToLibrary(title, author, nPages) {
    const book = new Book();
    book.title = title;
    book.author = author;
    book.nPages = nPages;
    myLibrary.push(book);
}