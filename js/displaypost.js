const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

const blogContainer = document.getElementById('blog-container');

blogPosts.forEach((post) => {
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  const postTitle = document.createElement('h2');
  postTitle.innerText = post.title;

  const postContent = document.createElement('p');
  postContent.innerText = post.content;

  const postAuthor = document.createElement('h4');
  postAuthor.innerText = post.author;

  postElement.appendChild(postTitle);
  postElement.appendChild(postContent);
  postElement.appendChild(postAuthor);

  blogContainer.appendChild(postElement);
});