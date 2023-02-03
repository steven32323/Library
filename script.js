'use strict';

const container = document.querySelector('.container');
// const readBtn = document.querySelectorAll('.read-btn');
const addBook = document.querySelector('.addBook');
const form = document.querySelector('form');
const nameInput = document.querySelector('.bookName');
const authorInput = document.querySelector('.bookAuthor');
const pageCountInput = document.querySelector('.pageCount');
const readInput = document.querySelector('.readBox');
const overlay = document.querySelector('.overlay');

const closeModal = function () {
  overlay.classList.add('hidden');
  form.classList.add('hidden');
};

let myLibrary = [];
function Book(name, author, pageCount, read) {
  this.name = name;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;

  function addBook() {
    myLibrary.push({ name, author, pageCount, read });
  }
  addBook();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const author = authorInput.value;
  const pageCount = pageCountInput.value;
  const read = JSON.parse(readInput.value);

  const book = new Book(name, author, pageCount, read);
  displayBook();
});

function displayBook() {
  container.innerHTML = '';
  myLibrary.forEach((book, i) => {
    let html = `<div class="card">
        <p>"${book.name}"</p>
        <p>${book.author}</p>
        <p>${book.pageCount} Pages</p>
        <button data_id="${i}" type="button" class="read-btn ${
      book.read === true ? ' read"> Read</button>' : '">Not read</button>'
    }
        <button type="button" data_remove="${i}"  class="remove">Remove Book</button></div>`;
    container.insertAdjacentHTML('beforeend', html);
  });
  closeModal();
}

addBook.addEventListener('click', function () {
  form.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

overlay.addEventListener('click', closeModal);
displayBook();

document.addEventListener('click', function (e) {
  if (e.target.hasAttribute('data_remove')) {
    let bookId = e.target.getAttribute('data_remove');
    console.log(myLibrary[bookId]);
    myLibrary.splice(bookId, 1);
    displayBook();
  }
  if (e.target.hasAttribute('data_id')) {
    // Get the value of the data attribute
    let bookId = e.target.getAttribute('data_id');
    let bookElement = document.querySelector(`[data_id="${bookId}"]`);
    console.log(myLibrary[bookId]);
    // if (e.target.) {
    //   myLibrary[bookId].pop();
    //   displayBook();
    //   return;
    // }
    bookElement.classList.toggle('read');

    //toggles read status of books
    myLibrary[bookId].read === true
      ? (myLibrary[bookId].read = false)
      : (myLibrary[bookId].read = true);
    bookElement.innerHTML === `Not read`
      ? (bookElement.innerHTML = `Read`)
      : (bookElement.innerHTML = `Not read`);

    // Use the value of the data attribute
    // console.log(bookId);
  }
});
