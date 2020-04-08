document.addEventListener("DOMContentLoaded", function() {
    const list  = document.querySelector("#list")
    const show = document.querySelector("#show-panel")
    let current_user  = {"id":1, "username":"pouros"}
    
    

function getBooks() {
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        renderBooks(data)
    })
}


function renderBooks(books)  { 
    const ul = document.createElement("li")
     books.forEach(element =>  {
        console.log(element.title)
        const book= document.createElement("li")
        book.innerText =  element.title;
        book.addEventListener("click", event =>  showBook(element))

        list.append(book)
        
    })
}

function showBook(book)
{   while (show.hasChildNodes()) {  
      show.removeChild(show.firstChild);
  }
    const a = document.createElement("img")
    const p = document.createElement("p")
    const button = document.createElement("button")
    const users = book.users.map(x => x.username)
    let userList = document.createElement("p")
    userList.id = "users"
    button.innerText = "like"
    button.addEventListener('click',event =>  updateUsers(book, users) )
    a.src = book.img_url
    p.innerText = book.description
    userList.innerText = users
    show.append(a,p,button,userList)
}


function updateUsers(book, users) {
    
    
   
    if(!users.includes(current_user.username))
    {
    
     book.users.push(current_user)
     fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH" ,
        body: JSON.stringify({ users: book.users }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
     })
    showBook(book)
    } 
else {
    console.log("you failed")
} 

}





  
getBooks();


});
