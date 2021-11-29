let allLinks = document.querySelectorAll('aside ul li');
let searchBar = document.querySelector('main nav #search-area input')
let contentBox = document.querySelector('#content-box');

let postsArr = []
let commentsArr = []
let albumsArr = []
let photosArr = []
let todosArr = []
let usersArr = []

let resources = ['posts', 'comments', 'albums', 'photos', 'todos', 'users']

const getData = async (resource) => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/${resource}`)
    return response.json()
}


// Fetching application data on page load
resources.forEach(res => {
    getData(res)
        .then(data => {
            if (res === 'posts') {
                postsArr = [...data]
            } else if (res === 'comments') {
                commentsArr = [...data]
            } else if (res === 'albums') {
                albumsArr = [...data]
            } else if (res === 'photos') {
                photosArr = [...data]
            } else if (res === 'todos') {
                todosArr = [...data]
            } else {
                usersArr = [...data]
            }
        })
})

function showPosts (data) {
    let postCards = data.map(post => {
        return `
            <div class="post-item" id="${post.id}">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </div>
        `
    })

    contentBox.innerHTML = postCards.join('')
}

function showComments (data) {
    let commentCards = data.map(comment => {
        return `
            <div class="comment-item" id="${comment.id}">
                <h2>${comment.name}</h2>
                <h5>${comment.email}</h5>
                <p>${comment.body}</p>
            </div>
        `
    })

    contentBox.innerHTML = commentCards.join('')
}

function showAlbums (data) {
    let albumCards = data.map(album => {
        return `
            <div class="album-item" id="${album.id}">
                <h2>${album.id}</h2>
                <h5>${album.title}</h5>
            </div>
        `
    })

    contentBox.innerHTML = albumCards.join('')
}

function showPhotos (data) {
    let photoCards = data.map(photo => {
        return `
            <div class="photo-item" id="${photo.id}">
                <img src="${photo.url}">
                <h2>${photo.title}</h2>
            </div>
        `
    })

    contentBox.innerHTML = photoCards.join('')
}

function showTodos (data) {
    let todoCards = data.map(todo => {
        return `
            <div class="todo-item" id="${todo.id}">
                <h2>${todo.title}</h2>
                <p>${
                    todo.completed ? 'This item has been completed' :
                    'This item has not been completed'
                }</p>
            </div>
        `
    })

    contentBox.innerHTML = todoCards.join('')
}

function showUsers (data) {
    let userCards = data.map(user => {
        return `
            <div class="user-item" id="${user.id}">
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Website: ${user.website}</p>
            </div>
        `
    })

    contentBox.innerHTML = userCards.join('')
}

allLinks.forEach(link => {
    link.addEventListener('click', () => {
        let linkText = link.textContent.toLowerCase().trim()
        if (linkText === 'posts') {
            showPosts(postsArr)
        } else if (linkText === 'comments') {
            showComments(commentsArr)
        } else if (linkText === 'albums') {
            showAlbums(albumsArr)
        } else if (linkText === 'photos') {
            showPhotos(photosArr)
        } else if (linkText === 'todos') {
            showTodos(todosArr)
        } else {
            showUsers(usersArr)
        }
    })
})

searchBar.oninput = (evt) => {
    const value = evt.target.value
    let allItems = contentBox.querySelectorAll('div')
    allItems.forEach(item => {
        if (!item.textContent.includes(value)) {
            item.remove()
        }
    })
}