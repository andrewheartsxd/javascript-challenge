
//Creates Library object with 4 shelf objects. Has method to report all books
function library() {
  this.shelves = [new shelf(), new shelf(), new shelf(), new shelf()];
  this.reportContents = function() {
    for (i = 0; i < this.shelves.length; i++) {
      for (x = 0; x < this.shelves[i].books.length; x++) {
        console.log(this.shelves[i].books[x].title);
      }
    };
  }
}

//Creates Book object with title, author, and category properties. Has methods to add new books to shelf, check out, and check in
function book(title, author, category) {
  this.title = title;
  this.author = author;
  this.category = category;
  this.shelfPosition = 0;
  this.addToShelf = function(book, shelf, library) {
    library.books[library.index] = book;
    this.shelfPosition = library.index;
    library.index++;
  };
  this.checkout = function(parentClass, ind) {
    var checkedOut = publicLibrary.shelves[parentClass].books.splice(ind, 1);

    $('li:contains(' + checkedOut[0].title + ')').remove();

    $('.checked-out ul').append('<li>' + checkedOut[0].title + ' - ' + checkedOut[0].author + '</li>');

    var merged = publicLibrary.shelves[3].books.concat(checkedOut);
    publicLibrary.shelves[3].books = merged;
  };
  this.checkin = function(parentClass, ind) {
    var checkedIn = publicLibrary.shelves[parentClass].books.splice(ind, 1);

    $('li:contains(' + checkedIn[0].title + ')').remove();

    switch (checkedIn[0].category) {
      case 0:
        var cat = "fiction";
        break;
      case 1:
        var cat = "non-fiction";
        break;
      case 2:
        var cat = "biography";
        break;
    }

    $('.' + cat + ' ul').append('<li>' + checkedIn[0].title + ' - ' + checkedIn[0].author + '</li>');

    var merged = publicLibrary.shelves[checkedIn[0].category].books.concat(checkedIn);
    publicLibrary.shelves[checkedIn[0].category].books = merged;

  };
}

//Creates Shelf object that contains books. Has a function to report a book's position on the shelf, used to check in and check out books
//Also contains report function to list books on the shelf
function shelf() {
  this.books = new Array();
  this.index = 0;
  this.findBookIndex = function(bookTitle) {
    for (i = 0; i < this.books.length; i++) {
      if (this.books[i].title === bookTitle) {
          return i;
        }
      }
    };
  this.reportContents = function() {
    for (i = 0; i < this.books.length; i++) {
    console.log(this.books[i].title);
    }
  };
}

//Function to add a new book to the library shelf
function addToShelf(book, shelf, library) {
    library.books[library.index] = book;
    library.index++;
  }


//Event listener to check out or check in books, depending on shelf
$(document).on('click', 'li', function() {

  var bookEntry = $(this).text();
  var bookTitle = bookEntry.split(' -')[0];
  var parentClass = $(this).parent().attr('class');

  switch (parentClass) {
    case "fiction":
      parentClass = 0;
      break;
    case "non-fiction":
      parentClass = 1;
      break;
    case "biography":
      parentClass = 2;
      break;
    case "checked-out":
      parentClass = 3;
      break;
  }

  var ind = publicLibrary.shelves[parentClass].findBookIndex(bookTitle);
  console.log('Index: ' + ind);
  console.log('parentClass: ' + parentClass);
  console.log('category: ' + publicLibrary.shelves[parentClass].books[ind].category);


  if (parentClass < 3) {
    publicLibrary.shelves[parentClass].books[ind].checkout(parentClass, ind);
  }
  else {
    publicLibrary.shelves[parentClass].books[ind].checkin(parentClass, ind);
  }
});

//Event listener to add new books
$("#addButton").click(function(){
  inputName = $("#title").val();
  inputAuthor = $("#author").val();
  inputCategory = parseInt($("#category").val());

  var newBook = new book(inputName, inputAuthor, inputCategory);

  switch (inputCategory) {
  case 0:
    inputCategory = "fiction";
    break;
  case 1:
    inputCategory = "non-fiction";
    break;
  case 2:
    inputCategory = "biography";
    break;
}

  newBook.addToShelf(newBook, newBook.category, publicLibrary.shelves[newBook.category]);

  $('.' + inputCategory + ' ul').append('<li>' + inputName + ' - ' + inputAuthor + '</li>');
  alert("Book created");

});

//Event Listeners for Listing Shelf or Library Contents to Console
$("#reportFiction").click(function(){
  publicLibrary.shelves[0].reportContents();
});

$("#reportNonFiction").click(function(){
  publicLibrary.shelves[1].reportContents();
});

$("#reportBiography").click(function(){
  publicLibrary.shelves[2].reportContents();
});

$("#reportCheckedOut").click(function(){
  publicLibrary.shelves[3].reportContents();
});

$("#reportLibrary").click(function(){
  publicLibrary.reportContents();
});



//Creates a new library
var publicLibrary = new library();



