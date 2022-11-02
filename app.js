// get event listeners
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const form = document.querySelector('form');
const booksContainer = document.querySelector('.books-container');

// books collection
let booksCollection = JSON.parse(localStorage.getItem('books-collection')) || [];

function createCollection(book) {
  const content = `
        <div class="booklist">
            <p>${book.title}</p>
            <p>${book.author}</p>
            <button class="removeBtn" id="${book.id}" type="submit">Remove</button>
            <hr>
        </div>
    `;

  return content;
}

function injectContent(arr) {
  let books = '';

  arr.forEach((object) => {
    books += createCollection(object);
  });
  booksContainer.innerHTML = books;
}

injectContent(booksCollection);

// create book
function createBook(book) {
  const booksMarkup = `
        <div class="booklist">
            <p>${book.title}</p>
            <p>${book.author}</p>
            <button class="removeBtn" id="${book.id}" type="submit">Remove</button>
            <hr>
        </div>
    `;

  booksContainer.insertAdjacentHTML('beforeend', booksMarkup);
}

// add a new book
function addBook() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const book = {
      title: titleInput.value,
      author: authorInput.value,
      id: `${new Date().getTime().toString()}${Math.trunc(Math.random() * 100)}`,
    };

    createBook(book);
    booksCollection.push(book);

    localStorage.setItem('books-collection', JSON.stringify(booksCollection));
    form.reset();
  });
}

addBook();

// remove book
booksContainer.addEventListener('click', (e) => {
  const remBtn = e.target.closest('.removeBtn');

  if (!remBtn) return;
  const { id } = remBtn;

  booksCollection = booksCollection.filter((book) => book.id !== id);

  injectContent(booksCollection);
  localStorage.setItem('books-collection', JSON.stringify(booksCollection));
});
