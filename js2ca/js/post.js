let blogPosts = [];

const form = document.getElementById("blogPostForm");
const blogPostContainer = document.getElementById("blogPosts");

window.addEventListener("load", loadBlogPosts);

form.addEventListener("submit", handleFormSubmit);

function renderBlogPosts(posts) {
  blogPostContainer.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "blogPost";
    div.id = `blogPost-${post.id}`;

    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>By ${post.author}</p>
      <p>${post.content}</p>
      <button class="editButton" onclick="editBlogPost(${post.id})">Edit</button>
      <button class="deleteButton" onclick="deleteBlogPost(${post.id})">Delete</button>
    `;

    blogPostContainer.appendChild(div);
  });
}

function loadBlogPosts() {
  const storedPosts = localStorage.getItem("blogPosts");

  if (storedPosts) {
    blogPosts = JSON.parse(storedPosts);
    renderBlogPosts(blogPosts);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const contentInput = document.getElementById("content");

  if (!titleInput.value || !authorInput.value || !contentInput.value) {
    alert("Please fill in all fields.");
    return;
  }

  const now = new Date();

  const newPost = {
    id: now.getTime(),
    title: titleInput.value,
    author: authorInput.value,
    content: contentInput.value
  };

  blogPosts.push(newPost);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

  titleInput.value = "";
  authorInput.value = "";
  contentInput.value = "";

  renderBlogPosts(blogPosts);
}

function editBlogPost(id) {
  const postToEdit = blogPosts.find(post => post.id === id);

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const contentInput = document.getElementById("content");

  titleInput.value = postToEdit.title;
  authorInput.value = postToEdit.author;
  contentInput.value = postToEdit.content;

  blogPosts = blogPosts.filter(post => post.id !== id);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

  renderBlogPosts(blogPosts);
}

function deleteBlogPost(id) {


blogPosts = blogPosts.filter(post => post.id !== id);
localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

renderBlogPosts(blogPosts);
}