const root = document.documentElement;
const themeCheckbox = document.querySelector('#theme-checkbox');

const myLibrary = [
  {
    title: "Prelude to Foundation",
    author: "Isaac Asimov",
    year: 1988,
    bookCover: "Assets/book covers/Prelude_to_Foundation_cover.jpg",
  },
  {
    title: "Taras Bulba",
    author: "Nikolai Gogol",
    year: 1835,
    bookCover: "Assets/book covers/Taras_bulba_cover.jpg",
  }
];

themeCheckbox.addEventListener('click', () => {
  console.log(themeCheckbox.checked);
})


function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}