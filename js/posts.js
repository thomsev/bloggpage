/**
 * @constant {string} API_BASE_URL - The base URL for the API.
 * @type {HTMLElement} blogContainer - The container element for the blog posts.
 * @type {Object} user - The user object stored in local storage.
 * @property {string} user.accessToken - The access token for the user.
 * @type {string} token - The access token stored in local storage.
 */

const API_BASE_URL = "https://nf-api.onrender.com";
const blogContainer = document.getElementById("blogcontainer");
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("accessToken");

/**
 * Sends a request to the API to retrieve blog posts.
 *
 * @async
 * @function getPosts
 * @throws {Error} If the request fails.
 */
const getPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/social/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return alert(data.errors[0].message);
    }

    /**
     * Renders the blog posts to the container element.
     *
     * @function renderPosts
     * @param {Array<Object>} posts - The blog posts to be rendered.
     */
    const renderPosts = (posts) => {
        blogContainer.innerHTML = "";
        posts.forEach((item) => {
          const postDiv = document.createElement("div");
          postDiv.classList.add("post");
      
          const postTitle = document.createElement("h2");
          postTitle.classList.add("post-title");
          postTitle.innerText = item.title;
      
          const postBody = document.createElement("p");
          postBody.classList.add("post-body");
          postBody.innerText = item.body;
      
          const postMedia = document.createElement("img");
          postMedia.classList.add("post-media");
          postMedia.src = item.media;
      
          const postTags = document.createElement("div");
          postTags.classList.add("post-tags");
      
          item.tags.forEach((tag) => {
            const postTag = document.createElement("span");
            postTag.classList.add("post-tag");
            postTag.innerText = tag;
      
            postTags.appendChild(postTag);
          });
      
          const editButton = document.createElement("button");
          editButton.classList.add("edit-button");
          editButton.innerText = "Edit";
          editButton.addEventListener("click", () => {
            // Call the editPost function when the Edit button is clicked
            editPost(item);
          });
      
          const deleteButton = document.createElement("button");
          deleteButton.classList.add("delete-button");
          deleteButton.innerText = "Delete";
          deleteButton.addEventListener("click", async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/api/v1/social/posts/${item.id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${user.accessToken}`,
                },
              });
      
              const data = await response.json();
      
              if (!response.ok) {
                return alert(data.errors[0].message);
              }
      
              // Reload the blog posts after deleting the post
              getPosts();
            } catch (error) {
              console.log(error);
            }
          });
      
          postDiv.appendChild(postTitle);
          postDiv.appendChild(postBody);
          postDiv.appendChild(postMedia);
          postDiv.appendChild(postTags);
          postDiv.appendChild(editButton);
          postDiv.appendChild(deleteButton);
      
          blogContainer.appendChild(postDiv);
        });
      };
      
      const editPost = (post) => {
        const newTitle = prompt("Enter a new title:", post.title);
        const newBody = prompt("Enter a new body:", post.body);
        const newTags = prompt("Enter new tags, separated by commas:", post.tags.join(","));
        const newMedia = prompt("Enter a new media URL:", post.media);
      
        const updatedPost = {
          title: newTitle || post.title,
          body: newBody || post.body,
          tags: newTags ? newTags.split(",").map((tag) => tag.trim()) : post.tags,
          media: newMedia || post.media,
        };
      
        fetch(`${API_BASE_URL}/api/v1/social/posts/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(updatedPost),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Failed to update post");
            }
          })
          .then((data) => {
            console.log(data);
            getPosts();
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
      renderPosts(data);

/**
 * @type {HTMLInputElement} searchInput - The input element for the search feature.
 */
const searchInput = document.getElementById("search-input");

/**
 * @type {HTMLInputElement} filterInput - The input element for the filter feature.
 */
const filterInput = document.getElementById("filter-input");

/**
 * Listens for changes on the search input and updates the displayed posts accordingly.
 *
 * @function searchCallback
 * @param {Event} event - The event object.
 */
searchInput.addEventListener("input", (event) => {
  const searchString = event.target.value.trim().toLowerCase();
  const filteredPosts = data.filter((post) =>
    post.title.toLowerCase().includes(searchString)
  );
  renderPosts(filteredPosts);
});

/**
 * Listens for changes on the filter input and updates the displayed posts accordingly.
 *
 * @function filterCallback
 * @param {Event} event - The event object.
 */
filterInput.addEventListener("input", (event) => {
  const filterString = event.target.value.trim().toLowerCase();
  const filteredPosts = data.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase().includes(filterString))
  );
  renderPosts(filteredPosts);
});

/**
 * @type {Set<string>} tags - A set containing all of the tags from the blog posts.
 */
const tags = new Set();
data.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));

/**
 * @type {HTMLUListElement} filterMenu - The unordered list element for the filter menu.
 */
const filterMenu = document.getElementById("filter-menu");

/**
 * Creates a list item element for each tag and adds it to the filter menu.
 *
 * @function createFilterMenuItem
 * @param {string} tag - The tag to create a menu item for.
 */
const createFilterMenuItem = (tag) => {
  const menuItem = document.createElement("li");
  menuItem.classList.add("filter-menu-item");
  menuItem.innerText = tag;
  filterMenu.appendChild(menuItem);
};

tags.forEach(createFilterMenuItem);

/**
 * Listens for clicks on the filter menu and updates the displayed posts accordingly.
 *
 * @function filterMenuCallback
 * @param {Event} event - The event object.
 */
filterMenu.addEventListener("click", (event) => {
  if (event.target.classList.contains("filter-menu-item")) {
    filterInput.value = event.target.innerText;
    const filterString = filterInput.value.trim().toLowerCase();
    const filteredPosts = data.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase().includes(filterString))
    );
    renderPosts(filteredPosts);
      }
    });

  } catch (error) {
    console.log(error);
  }
};

/**
 * @type {HTMLFormElement} postForm - The form element for creating a new blog post.
 */
const postForm = document.getElementById("post-form");

/**
 * @type {HTMLInputElement} titleInput - The input element for the title of the new post.
 */
const titleInput = document.getElementById("title-input");

/**
 * @type {HTMLInputElement} bodyInput - The input element for the body of the new post.
 */
const bodyInput = document.getElementById("body-input");

/**
 * @type {HTMLInputElement} tagsInput - The input element for the tags of the new post.
 */
const tagsInput = document.getElementById("tags-input");

/**
 * @type {HTMLInputElement} mediaInput - The input element for the media of the new post.
 */
const mediaInput = document.getElementById("media-input");

/**
 * Listens for submissions on the post form and sends a request to create a new blog post.
 *
 * @function postFormCallback
 * @param {Event} event - The event object.
 */
postForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newPost = {
    title: titleInput.value,
    body: bodyInput.value,
    tags: tagsInput.value.split(",").map((tag) => tag.trim()),
    media: mediaInput.value,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/social/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(newPost),
    });

    const data = await response.json();

    if (!response.ok) {
      return alert(data.errors[0].message);
    }

    titleInput.value = "";
    bodyInput.value = "";
    tagsInput.value = "";
    mediaInput.value = "";

    getPosts();
  } catch (error) {
    console.log(error);
  }
});

/**
 * Calls the getPosts() function to initially fetch and display the blog posts.
 */
getPosts();
