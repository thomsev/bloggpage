function addComment() {

    var name = document.getElementById("name").value;
    var comment = document.getElementById("comment").value;
  
    var newComment = document.createElement("div");
    newComment.classList.add("comment");
  
    var commentHeader = document.createElement("div");
    commentHeader.classList.add("comment-header");
    commentHeader.innerHTML = "<strong>" + name + "</strong><button class='like-button'>Like</button>";
    newComment.appendChild(commentHeader);
  
    var commentText = document.createElement("div");
    commentText.classList.add("comment-text");
    commentText.innerHTML = comment;
    newComment.appendChild(commentText);
  
    var commentsDiv = document.getElementById("comments");
    commentsDiv.appendChild(newComment);
  
    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";
  
    var likeButton = newComment.querySelector(".like-button");
    likeButton.addEventListener("click", function() {
      likeComment(newComment);
    });
  

    return false;
  }
  
  function likeComment(comment) {
    var likeButton = comment.querySelector(".like-button");
    var likeCount = comment.querySelector(".like-count");
  
    if (!likeCount) {
      likeCount = document.createElement("span");
      likeCount.classList.add("like-count");
      likeCount.textContent = "0 likes";
      comment.querySelector(".comment-header").appendChild(likeCount);
    }
  
    if (likeButton.classList.contains("liked")) {
      likeButton.classList.remove("liked");
      likeButton.textContent = "Like";
      var count = parseInt(likeCount.textContent) - 1;
      likeCount.textContent = count + (count == 1 ? " like" : " likes");
    } else {
      likeButton.classList.add("liked");
      likeButton.textContent = "Unlike";
      var count = parseInt(likeCount.textContent) + 1;
      likeCount.textContent = count + (count == 1 ? " like" : " likes");
    }
  }