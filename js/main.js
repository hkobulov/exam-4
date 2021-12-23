// DOM elements
let elUsersList = document.querySelector('.user-list');
let elUserCount = document.querySelector('.api-user__counting');
let elPostsList = document.querySelector('.post-list');
let elPostCount = document.querySelector('.api-post__counting');
let elCommentsList = document.querySelector('.comment-list');
let elCommentCount = document.querySelector('.api-comment__counting');

// Documnet fragments
let elUsersTemp = document.querySelector('.user-list-temp').content;
let elPostsTemp = document.querySelector('.post-list-temp').content;
let elCommentTemp = document.querySelector('.comment-list-temp').content;
// let elPostsTemp = document.querySelector('.post-list-temp').content;

// Render
function renderUsers(array, wrapper){
    if(array){
        let userDocFragment = document.createDocumentFragment();
        
        array.forEach(item => {
            let userClone = elUsersTemp.cloneNode(true);
            
            userClone.querySelector('.user-list__heading').textContent = item.name;
            userClone.querySelector('.user-list__mail').textContent = item.email;
            userClone.querySelector('.user-list__mail').href = `mailto:${item.email}`;
            userClone.querySelector('.user-list__company').textContent = item.company.name;
            userClone.querySelector('.user-list__address').textContent = item.address.city;
            userClone.querySelector('.user-list__address').href = `https://www.google.com/maps/place/${item.address.geo.lat},${item.address.geo.lng}`;
            userClone.querySelector('.user-list__btn').dataset.userId = item.id;
            
            userDocFragment.appendChild(userClone);
        })
        
        elUserCount.textContent = `Count of users: ${array.length}`;
        wrapper.innerHTML = null;
        wrapper.appendChild(userDocFragment);
    }
}

function renderPosts(array, wrapper){
    if(array){
        let postDocFragment = document.createDocumentFragment();
        
        array.forEach(item => {
            let postClone = elPostsTemp.cloneNode(true);
            
            postClone.querySelector('.post-list__heading').textContent = item.title;
            postClone.querySelector('.post-list__desc').textContent = item.body;
            postClone.querySelector('.post-list__btn').dataset.postId= item.id;
            
            postDocFragment.appendChild(postClone)
        })
        
        elPostCount.textContent = `Count of users: ${array.length}`;
        wrapper.innerHTML = null
        wrapper.appendChild(postDocFragment)
    } else {
        elPostCount.textContent = `ERROR`;
    }
}

function renderComments(array, wrapper){
    if(array){
        let commentDocFragment = document.createDocumentFragment();
        
        array.forEach(item => {
            let commentClone = elCommentTemp.cloneNode(true);
            
            commentClone.querySelector('.comment-list__heading').textContent = item.name;
            commentClone.querySelector('.comment-list__mail').textContent = item.email;
            commentClone.querySelector('.comment-list__desc').textContent = item.body;
            
            commentDocFragment.appendChild(commentClone)
        })
        
        elCommentCount.textContent = `Count of users: ${array.length}`;
        wrapper.innerHTML = null;
        wrapper.appendChild(commentDocFragment)
    } else {
        elCommentCount.textContent = `ERROR`;
    }
}

fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(data => renderUsers(data, elUsersList))

elUsersList.addEventListener('click', evt => {
    let findID = evt.target.dataset.userId

    renderComments([], elCommentsList)
    
    fetch(`https://jsonplaceholder.typicode.com/user/${findID}/posts`)
    .then(response => response.json())
    .then(data => renderPosts(data, elPostsList))
})

elPostsList.addEventListener('click', evt => {
    let findCommentId = evt.target.dataset.postId
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${findCommentId}/comments`)
    .then(response => response.json())
    .then(data => renderComments(data, elCommentsList))
})

