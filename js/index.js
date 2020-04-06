const booksURL = "http://localhost:3000/books"

const bookList = document.getElementById("list")
const bookShow = document.getElementById("show-panel")
const currentUser = {"id":1, "username":"pouros"}

document.addEventListener("DOMContentLoaded", function() {


    function renderBooks(books)
    {
        books.forEach(book => renderBook(book))
    }
    
    function renderBook(book)
    {
        const newBook = document.createElement("li")
        newBook.innerText = book.title

        newBook.addEventListener("click", e => {
            fetch(`${booksURL}/${book.id}`).then(res => res.json()).then(book => showBook(book))
        })
        
        bookList.append(newBook)
    }

    function showBook(book)
    {
        bookShow.innerText = " "

        const image = document.createElement("img")
        image.src = book.img_url
        const description = document.createElement("p")
        description.innerText = book.description

        bookShow.append(image, description)

        addUsers(book.users)
        addLikeButton(book)

    }

    function addUsers(users)
    {
        const userList = document.createElement("ul")
        bookShow.append(userList)
        users.forEach(user => {
            const name = document.createElement("li")
            name.innerText = user.username
            userList.append(name)
        })
    }

    function addLikeButton(book)
    {
        const likeButton = document.createElement("button")
        likeButton.innerText = "Like me"


        likeButton.addEventListener("click", () => {

            const userLikes = book.users

            const checker = userLikes.find(user => user.id === currentUser.id)
            
            checker === undefined ? userLikes.push(currentUser) : userLikes.pop(currentUser)

            console.log(book.users)
            const postingLike = {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "users": userLikes
                  })
            }
            fetch(`${booksURL}/${book.id}`, postingLike)
            .then(res => res.json())
            .then(book => showBook(book))
        })

        bookShow.append(likeButton)
    }


    fetch(booksURL).then(res => res.json()).then(books => renderBooks(books))
});
