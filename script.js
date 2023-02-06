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
class Book {
  constructor(bookName, author, pageCount, read) {
    this.bookName = bookName;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
  }
  addBook() {
    // console.log(this.bookName, this.author, this.pageCount, this.read);
    myLibrary.push(this);
    this.displayBook();
    this.readBtn = document
      .querySelectorAll('.read')
      .forEach(btn => btn.addEventListener('click', e => this.readToggle(e)));
    this.removeBtn = document
      .querySelectorAll('.remove')
      .forEach(btn => btn.addEventListener('click', e => this.readToggle(e)));
    closeModal();
  }
  displayBook() {
    container.innerHTML = '';
    myLibrary.forEach((_, i) => {
      let div = document.createElement('div');
      div.className = 'card';

      let bookNameP = document.createElement('p');
      bookNameP.innerText = `"${this.bookName}"`;
      div.appendChild(bookNameP);

      let authorP = document.createElement('p');
      authorP.innerText = this.author;
      div.appendChild(authorP);

      let pageCountP = document.createElement('p');
      pageCountP.innerText = `${this.pageCount} Pages`;
      div.appendChild(pageCountP);

      let readBtn = document.createElement('button');
      readBtn.setAttribute('data_id', i);
      readBtn.type = 'button';
      readBtn.className = `read-btn ${this.read === true ? ' read' : ''}`;
      readBtn.innerText = this.read === true ? 'Read' : 'Not read';
      div.appendChild(readBtn);

      let removeBtn = document.createElement('button');
      removeBtn.setAttribute('data_remove', i);
      removeBtn.type = 'button';
      removeBtn.className = 'remove';
      removeBtn.innerText = 'Remove Book';
      div.appendChild(removeBtn);

      let html = div;
      container.insertAdjacentElement('beforeend', html);
    });
  }
  readToggle(e) {
    if (e.target.hasAttribute('data_remove')) {
      let bookId = e.target.getAttribute('data_remove');
      console.log(myLibrary[bookId]);
      myLibrary.splice(bookId, 1);
      this.displayBook();
    }
    if (e.target.hasAttribute('data_id')) {
      // Get the value of the data attribute
      let bookId = e.target.getAttribute('data_id');
      let bookElement = document.querySelector(`[data_id="${bookId}"]`);
      console.log(myLibrary[bookId]);
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
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const bookName = nameInput.value;
  const author = authorInput.value;
  const pageCount = pageCountInput.value;
  const read = JSON.parse(readInput.value);

  const book = new Book(bookName, author, pageCount, read);
  book.addBook();
  // remove = document.querySelector('.remove');
});

// function
//   closeModal();
// }

addBook.addEventListener('click', function () {
  form.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

overlay.addEventListener('click', closeModal);

// moveBook(e) {
// if (e.target.hasAttribute('data_remove')) {
//   let bookId = e.target.getAttribute('data_remove');
//   console.log(myLibrary[bookId]);
//   myLibrary.splice(bookId, 1);
//   displayBook();
// }
// if (e.target.hasAttribute('data_id')) {
//   // Get the value of the data attribute
//   let bookId = e.target.getAttribute('data_id');
//   let bookElement = document.querySelector(`[data_id="${bookId}"]`);
//   console.log(myLibrary[bookId]);
//   bookElement.classList.toggle('read');

//   //toggles read status of books
//   myLibrary[bookId].read === true
//     ? (myLibrary[bookId].read = false)
//     : (myLibrary[bookId].read = true);
//   bookElement.innerHTML === `Not read`
//     ? (bookElement.innerHTML = `Read`)
//     : (bookElement.innerHTML = `Not read`);

// Use the value of the data attribute
// console.log(bookId);
