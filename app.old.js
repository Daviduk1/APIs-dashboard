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

allLinks.forEach(link => {
    link.addEventListener('click', () => {
        let linkText = link.textContent.toLowerCase().trim()
        getData(linkText)
        .then(data => {
            if (linkText === 'posts') {
                postsArr = [...data]
                console.log(postsArr);
            } else if (linkText === 'comments') {
                commentsArr = [...data]
                console.log(commentsArr);
            } else if (linkText === 'albums') {
                albumsArr = [...data]
                console.log(albumsArr);
            } else if (linkText === 'photos') {
                photosArr = [...data]
                console.log(photosArr);
            } else if (linkText === 'todos') {
                todosArr = [...data]
                console.log(todosArr);
            } else {
                usersArr = [...data]
                console.log(usersArr);
            }
        })
    })
})