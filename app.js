// get event listeners
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const form = document.querySelector('form');
const booksContainer = document.querySelector('.books-container');

const currentTime = document.querySelector('#current-time');
const booksSection = document.getElementById('books-section');
const addBookSection = document.getElementById('add-book-form');
const contactSection = document.getElementById('contact');
const navLinks = document.querySelectorAll('.nav-item');

setInterval(() => {
  currentTime.innerHTML = new Date();
});

document.addEventListener('DOMContentLoaded', displayComponents(navLinks))

// books collection
let booksCollection = JSON.parse(localStorage.getItem('books-collection')) || [];

class Book{
  constructor(author, title, id){
    this.author = author;
    this.title = title;
    this.id = id;
  }
}

function createCollection(book) {
  const content = `
      <div class="booklist">
        <article class="book">
          <div>
            <p>"${book.author.charAt(0).toUpperCase() + book.author.slice(1)}" by ${book.title.charAt(0).toUpperCase() + book.title.slice(1)}</p>
          </div>
          <div>
            <button class="removeBtn" id="${book.id}" type="submit">Remove</button>
          </div>
        </article>
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



// create book
function createBook(book) {
  const booksMarkup = `
        <div class="booklist">
          <article class="book">
            <div>
              <p>"${book.author.charAt(0).toUpperCase() + book.author.slice(1)}" by ${book.title.charAt(0).toUpperCase() + book.title.slice(1)}</p>
            </div>
            <div>
              <button class="removeBtn" id="${book.id}" type="submit">Remove</button>
            </div>
          </article>
        </div>
    `;

  booksContainer.insertAdjacentHTML('beforeend', booksMarkup);
}

// add a new book
function addBook() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = titleInput.value;
    let author = authorInput.value;
    let id = `${new Date().getTime().toString()}${Math.trunc(Math.random() * 100)}`;

    const book = new Book(title, author, id)

    createBook(book);
    booksCollection.push(book);

    localStorage.setItem('books-collection', JSON.stringify(booksCollection));
    form.reset();
  });
}

addBook();

// remove book
booksContainer.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('.removeBtn');

  if (!removeBtn) return;
  const { id } = removeBtn;

  booksCollection = booksCollection.filter((book) => book.id !== id);

  injectContent(booksCollection);
  localStorage.setItem('books-collection', JSON.stringify(booksCollection));
});


function displayComponents(id) {
  switch(id) {
    case 'books-section': 
      booksSection.style.display = "block";
      addBookSection.style.display = "none";
      contactSection.style.display = "none";
      break;
    
    case 'add-book-form': 
      booksSection.style.display = "none";
      addBookSection.style.display = "block";
      contactSection.style.display = "none";
      break;
  
    case 'contact': 
      booksSection.style.display = "none";
      addBookSection.style.display = "none";
      contactSection.style.display = "block";
      break;
    default:
      booksSection.style.color = "block";
      addBookSection.style.display = "none";
      contactSection.style.display = "none";
  }
};

console.log(contactSection)

function navItemClicked(navLinks) {
  navLinks.forEach((item) => {
    item.addEventListener('click', e => {
      const id = e.target.getAttribute('displayComponent');
      console.log(id)
      displayComponents(id)
    })
});
};


displayComponents(navLinks)
injectContent(booksCollection);
navItemClicked(navLinks)
