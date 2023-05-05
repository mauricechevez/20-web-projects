// form fields
const postContainer = document.getElementById('posts-container');

const loading = document.getElementById('loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Asynchronous function to get the requests from the server

async function getPosts(){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    const data = await response.json();
    return data;
}

// fetch posts from API
async function showPostsInDOM(){
    const posts = await getPosts()
    posts.forEach(post =>{
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
          <div class="number">${post.id}</div>
          <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
          </div>
        `;
    
        postContainer.appendChild(postEl);
    })
}

// Show laoder and fetch more posts
function showLoading(){
    loading.classList.add('show');

    setTimeout(function(){
        loading.classList.remove('show');
        // Increment page by 1
        setTimeout(function(){
            page++;
            showPostsInDOM();
        },300)
    },1000)
}

// Filter posts by input
function filterPosts(e){
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post =>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }

    })
}

// show intial posts
showPostsInDOM();

window.addEventListener('scroll', ()=>{
    // console.log(document.documentElement.scrollTop);
    // console.log(document.documentElement.scrollHeight);
    // Destructing the same as above
    const {scrollTop,scrollHeight,clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5){
        showLoading();
    }

})

filter.addEventListener('input',filterPosts)
