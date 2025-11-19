let myLibrary = [];
function Book(title, author, page, isRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.page = page;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
    this.info = function () {
        return this.title + " by " + this.author + ", " + this.page + " pages, " + this.isRead + "."
    }
}

function addBookToLibrary(obj) {
    // take params, create a book then store it in the array
    myLibrary.push(obj)
    showEveryBook(myLibrary)
}
function showEveryBook(library) {
    let bookCase = document.querySelector("#bookcase")
    bookCase.innerHTML = ""


    library.forEach(element => {
        let div = document.createElement("div");
        div.classList.add("book")
        div.id = element.id


        let title = document.createElement("div")
        title.textContent = element.title

        let author = document.createElement("div")
        author.textContent = "-written by " + element.author

        let page = document.createElement("div")
        page.textContent = element.page + " pages"

        let isitRead = document.createElement("div")
        isitRead.textContent = element.isRead
        if (element.isRead == "is-read") {
            isitRead.textContent = " ✅ The book is read";
        } else {
            isitRead.textContent = "❌ The book is not read";
        }


        div.appendChild(title)
        div.appendChild(author)
        div.appendChild(page)
        div.appendChild(isitRead)
        let changeReadStatus = document.createElement("button");
        changeReadStatus.id = "changeReadStatus"
        changeReadStatus.innerText = "Toggle Read"
        let deleteTheBook = document.createElement("button");
        deleteTheBook.id = "deleteTheBook"
        deleteTheBook.innerText = "Delete"

        //delete book
        deleteTheBook.addEventListener("click", (event) => {
            //console.log(event.target.parentElement.id)
            let idToRemove = event.target.parentElement.id

            //otherlibrary = myLibrary.filter(book => book.id !== idToRemove)
            //myLibrary = [...otherlibrary]
            myLibrary = myLibrary.filter(book => book.id !== idToRemove)

            showEveryBook(myLibrary)
        })

        //toggle read status 
        changeReadStatus.addEventListener("click", (event) => {
            let idToChange = event.target.parentElement.id
            //console.log(idToChange)
            let book = myLibrary.find(a => a.id == idToChange)
            if (book) {
                book.isRead = (book.isRead === "is-read") ? "not-read" : "is-read";
                showEveryBook(myLibrary)
            }

            //console.log(book)




        })


        div.appendChild(changeReadStatus)
        div.appendChild(deleteTheBook)
        bookCase.appendChild(div)

    });
}

const dune = new Book("Dune", "Frank Herbert", 560, "is-read")
console.log(dune.info())

addBookToLibrary(dune)
//console.log(myLibrary)

/*
myLibrary.forEach(element => {
    let div = document.createElement("div");
    div.classList.add("book")

    let title = document.createElement("div")
    title.textContent = element.title

    let author = document.createElement("div")
    author.textContent = "-written by " + element.author

    let page = document.createElement("div")
    page.textContent = element.page + " pages"

    let isitRead = document.createElement("div")
    isitRead.textContent = element.isRead
    if (element.isitRead == "is-read") {
        isitRead.textContent = " ✅ The book is read";
    }

    div.appendChild(title)
    div.appendChild(author)
    div.appendChild(page)
    div.appendChild(isitRead)
    let removeButton = document.createElement("button");
    removeButton.id = "remove-button"


    removeButton.addEventListener("click", removeTheBook)

    let bookCase = document.querySelector("#bookcase")

    bookCase.appendChild(div)

});
*/
function removeTheBook(e) {
    console.log(e)
}

let newBookButton = document.querySelector("#new-books");
let form = document.querySelector("#form");
newBookButton.addEventListener("click", () => {
    form.reset();
    form.classList.remove("hide");
});

//when you click submit or nevermind form is hidden yet again
let addBookButton = document.querySelector("#add");
let hideTheForm = document.querySelector("#hide-form");

addBookButton.addEventListener("click", () => {
    form.classList.add("hide");
});

hideTheForm.addEventListener("click", () => {
    form.classList.add("hide");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let bookTitle = document.querySelector("#book-title").value
    //console.log(bookTitle);
    let bookAuthor = document.querySelector("#book-author").value

    let bookPage = document.querySelector("#book-page-number").value

    let bookIsRead = document.querySelector("input[name='is-read']:checked").value
    console.log(bookIsRead);
    if (bookIsRead == "is-read") {
        bookIsRead = "is-read"
    } else {
        bookIsRead = "is not read"
    }
    let book = new Book(bookTitle, bookAuthor, bookPage, bookIsRead)
    addBookToLibrary(book)


});
