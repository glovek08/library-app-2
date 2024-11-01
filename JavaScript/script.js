const root = document.documentElement;
const themeCheckbox = document.querySelector('#theme-checkbox');
const themeCheckboxSpan = document.querySelector('#theme-checkbox-span');
const libraryContainer = document.querySelector('#library-container');

//Add Book Modal
const addBookModal = document.querySelector("#modal-container");
const addBookBtn = document.querySelector("#add-book-btn");
const closeBookModal = document.querySelector("#close-modal-btn");
const modalCancelBtn = document.querySelector("#modal-cancel-btn");
const modalSubmitBtn = document.querySelector("#modal-submit-btn");

const myLibrary = [
  {
    title: "Prelude to Foundation",
    author: "Isaac Asimov",
    year: 1988,
    numberOfPages: 403,
    haveRead: true,
    cover: "Assets/book covers/Prelude_to_Foundation_cover.jpg",
  },
  {
    title: "Taras Bulba",
    author: "Nikolai Gogol",
    year: 1835,
    numberOfPages: 150,
    haveRead: true,
    cover: "Assets/book covers/Taras_bulba_cover.jpg",
  },
  {
    title: "The Silmarillion",
    author: 'J. R. R. Tolkien',
    year: 1977,
    numberOfPages: 380,
    haveRead: true,
    cover: "Assets/book covers/The_Silmarillion_cover.jpg",
  },
  {
    title: "The Teacher",
    author: "Freida McFadden",
    year: 2024,
    numberOfPages: 400,
    haveRead: false,
    cover: "Assets/book covers/The_Teacher_cover.jpg"
  },
  {
    title: "Poor Dad, Poor Dad",
    author: "Ronald Sashimi",
    year: 2022,
    numberOfPages: 420,
    haveRead: true,
    cover: "Assets/book covers/Poor_Dad_Poor_Dad_cover.jpg"
  }
];

refreshLibrary();

if (localStorage.getItem('theme') === 'light') {
  root.classList.remove('dark');
  root.classList.add('light');
  themeCheckboxSpan.textContent = 'dark_mode';
  themeCheckbox.checked = true;
} else {
  root.classList.remove('light');
  root.classList.add('dark');
  themeCheckboxSpan.textContent = 'light_mode';
  themeCheckbox.checked = false;
};

themeCheckbox.addEventListener('click', () => {
  console.log(themeCheckbox.checked);
  if (themeCheckbox.checked) {
    root.classList = '';
    themeCheckboxSpan.textContent = 'dark_mode';
    localStorage.setItem('theme', 'light');
  } else {
    root.classList = 'dark';
    themeCheckboxSpan.textContent = 'light_mode';
    localStorage.setItem('theme', 'dark');
  }
});

addBookBtn.addEventListener('click', () => {
  addBookModal.showModal();
})
closeBookModal.addEventListener('click', () => {
  addBookModal.close()
})
modalCancelBtn.addEventListener("click", () => {
  addBookModal.close();
})
modalSubmitBtn.addEventListener('click', () => {
  addBookToLibrary();
});


function Book(title, author, year, numberOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.numberOfPages = numberOfPages;
  this.haveRead = haveRead;
  console.log(this.displayInfo());
}
Book.prototype.displayInfo = function () {
  return `${this.title}, ${this.author}, ${this.year}, ${this.numberOfPages}, ${this.haveRead}`;
}

function addBookToLibrary() {
  const titleInput = document.querySelector('[name="book-title"]').value;
  const authorInput = document.querySelector('[name="book-author"]').value;
  const yearInput = document.querySelector('[name="book-year"]').value;
  const numberOfPages = document.querySelector('[name="number-of-pages"]').value;
  const haveRead = document.querySelector('[name="have-read"').value;
  console.log("Shit is: " + titleInput, authorInput, yearInput, numberOfPages, haveRead);
  const book = new Book(titleInput, authorInput, yearInput, numberOfPages, haveRead);
  myLibrary.push(book);
  refreshLibrary();
}

function refreshLibrary() {
  let i = 0;
  while (libraryContainer.firstChild) {
    libraryContainer.removeChild(libraryContainer.firstChild);
    i++;
    console.log(`${i} Element removed`);
  }
  i = 0;
  myLibrary.forEach(el => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const bookCover = document.createElement('img');
    bookCover.src = el.cover;
    bookCover.alt = 'Book Cover';
    bookCover.classList.add('book-cover-img');
    bookCover.height = 320;
    bookCover.width = 220;

    bookCard.appendChild(bookCover);

    const bookInfoContainer = document.createElement('div');
    bookInfoContainer.classList.add('book-info-container');
    bookCard.appendChild(bookInfoContainer);

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = el.title;
    bookTitle.classList.add('book-title');
    bookInfoContainer.appendChild(bookTitle);

    const bookAuthor = document.createElement('small');
    bookAuthor.textContent = el.author;
    bookAuthor.classList.add('book-author');
    bookInfoContainer.appendChild(bookAuthor);

    const bookYear = document.createElement('small');
    bookYear.textContent = el.year;
    bookYear.classList.add('book-year');
    bookInfoContainer.appendChild(bookYear);

    libraryContainer.appendChild(bookCard);
  })
  console.log('Library refreshed.')
}
