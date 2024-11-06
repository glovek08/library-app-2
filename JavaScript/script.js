const root = document.documentElement;
const themeCheckbox = document.querySelector('#theme-checkbox');
const themeCheckboxSpan = document.querySelector('#theme-checkbox-span');
const libraryContainer = document.querySelector('#library-container');
const bookDeleteBtn = document.querySelector('.book-delete-btn');
const confirmDeleteModal = document.querySelector('#confirm-delete-modal');

//Add Book Modal
const addBookModal = document.querySelector("#modal-container");
const addBookBtn = document.querySelector("#add-book-btn");
const closeBookModal = document.querySelector("#close-modal-btn");
const modalCancelBtn = document.querySelector("#modal-cancel-btn");
const bookSubmitForm = document.querySelector("#add-book-form");

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
});

closeBookModal.addEventListener('click', () => {
  addBookModal.close()
});

modalCancelBtn.addEventListener("click", () => {
  addBookModal.close();
});

bookSubmitForm.addEventListener('submit', (e) => {
  if (!bookSubmitForm.checkValidity()) {
    e.preventDefault();
    alert("Missing Fields");
  }
  addBookToLibrary();
});
confirmDeleteModal.addEventListener('submit', (e) => {

}); 

/*
  TODO:
  1 - Add functionality to remove a book. **COMPLETED**
  2 - Add a toggle to change read status. **COMPLETED*
  3 - Handle the cover for the book. 
  4 - Test the shit out of this, deadline: TOMORROW!
*/ 


function Book(title, author, year, numberOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.numberOfPages = numberOfPages;
  this.haveRead = (haveRead === 'Yes') ? true : false;
  console.log("Book created: " + this.displayInfo());
};
Book.prototype.displayInfo = function () {
  return `${this.title}, ${this.author}, ${this.year}, ${this.numberOfPages}, ${this.haveRead}`;
};

function addBookToLibrary() {
  const titleInput = document.querySelector('[name="book-title"]').value;
  const authorInput = document.querySelector('[name="book-author"]').value;
  const yearInput = document.querySelector('[name="book-year"]').value;
  const numberOfPages = document.querySelector('[name="number-of-pages"]').value;
  const haveRead = document.querySelector('[name="have-read"]:checked')?.value;
  console.log("Book Data: " + titleInput, authorInput, yearInput, numberOfPages, haveRead);
  const book = new Book(titleInput, authorInput, yearInput, numberOfPages, haveRead);
  myLibrary.push(book);
  refreshLibrary();
};

function refreshLibrary() {
  let i = 0;
  while (libraryContainer.firstChild) {
    libraryContainer.removeChild(libraryContainer.firstChild);
    i++;
    console.log(`${i} Element removed`);
  };
  i = 0;
  myLibrary.forEach(bookObject => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.index = myLibrary.indexOf(bookObject);
    const bookCover = document.createElement('img');
    bookCover.src = bookObject.cover;
    bookCover.alt = 'Book Cover';
    bookCover.classList.add('book-cover-img');
    bookCover.height = 320;
    bookCover.width = 220;
    bookCard.appendChild(bookCover);

    const bookToolbar = document.createElement('div');
    bookToolbar.classList.add('book-toolbar');
    const readStatusLabel = document.createElement('label');
    const readStatusCheckboxSpan = document.createElement('span');
    readStatusCheckboxSpan.classList.add('material-symbols-outlined');
    readStatusCheckboxSpan.classList.add('read-status-checkbox-span');
    readStatusCheckboxSpan.textContent = 'check_box_outline_blank';
    readStatusLabel.appendChild(readStatusCheckboxSpan);
    const checkboxSpanTextContent = document.createElement('span');
    checkboxSpanTextContent.classList.add('checkbox-span-text-content');
    checkboxSpanTextContent.classList.add('hide');
    checkboxSpanTextContent.textContent = "Have Read";
    readStatusLabel.appendChild(checkboxSpanTextContent);

    const readStatusCheckbox = document.createElement('input');
    readStatusCheckbox.type = 'checkbox'
    readStatusCheckbox.name = 'read-status';
    readStatusCheckbox.classList.add('read-status-checkbox');

    //This event is to change the have read status of each book in myLibrary when the user toggles the have-read checkbox.
    readStatusCheckbox.addEventListener('click', (event) => {
      const bookCardContainer = event.target.closest('.book-card');
      if (readStatusCheckbox.checked) {
        readStatusCheckboxSpan.textContent = 'check_box';
        readStatusCheckboxSpan.classList.add('yes');
        myLibrary[bookCardContainer.dataset.index].haveRead = !true;
        console.log(`Book: ${bookObject.title} has been read? ${bookObject.haveRead}`);
      } else {
        readStatusCheckboxSpan.textContent = 'check_box_outline_blank';
        readStatusCheckboxSpan.classList.remove('yes');
        myLibrary[bookCardContainer.dataset.index].haveRead = !false;
        console.log(`Book: ${bookObject.title} has been read? ${bookObject.haveRead}`);
      };
    });

    // Checks if haveRead is true and changes the checkbox state and the color of the span with the checkbox symbol.
    if (bookObject.haveRead) {
      readStatusCheckboxSpan.classList.add("yes");
      readStatusCheckbox.checked = true;
      console.log(bookObject.title+" set to true.")
      readStatusCheckboxSpan.textContent = 'check_box';
    }
    readStatusLabel.appendChild(readStatusCheckbox);
    bookToolbar.appendChild(readStatusLabel);

    const bookDeleteBtn = document.createElement('button');
    bookDeleteBtn.classList.add('book-delete-btn');
    bookDeleteBtn.classList.add('material-symbols-outlined-btn');
    bookDeleteBtn.title = 'DELETE BOOK';
    const deleteBtnSpan = document.createElement('span');
    deleteBtnSpan.classList.add('book-delete-btn-span');
    deleteBtnSpan.classList.add('material-symbols-outlined');
    deleteBtnSpan.textContent = 'delete';
    deleteBtnSpan.addEventListener('click', (event) => {
      confirmDeleteModal.showModal();
      // const bookCardContainer = event.target.closest('.book-card');
      // if(bookCard) {
      //   myLibrary.splice(bookCardContainer.dataset.index, 1);
      //   console.log(`${bookCardContainer.dataset.index} - Book Title: ${bookObject.title} removed`);
      //   refreshLibrary();
      // };
    });
    bookDeleteBtn.appendChild(deleteBtnSpan);
    bookToolbar.appendChild(bookDeleteBtn);
    bookCard.appendChild(bookToolbar);

    const bookInfoContainer = document.createElement('div');
    bookInfoContainer.classList.add('book-info-container');
    bookCard.appendChild(bookInfoContainer);

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = bookObject.title;
    bookTitle.classList.add('book-title');
    bookInfoContainer.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = bookObject.author;
    bookAuthor.classList.add('book-author');
    bookInfoContainer.appendChild(bookAuthor);

    const bookYear = document.createElement('p');
    bookYear.textContent = bookObject.year;
    bookYear.classList.add('book-year');
    bookInfoContainer.appendChild(bookYear);

    libraryContainer.appendChild(bookCard);
  });
  console.log('Library refreshed.')
};
