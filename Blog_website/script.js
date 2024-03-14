// Function to filter posts based on search input
const categories = [...new Set(product.map((item) => { return item }))]

        document.getElementById('searchBar').addEventListener('keyup', (e) => {
            const searchData = e.target.value.toLowerCase();
            const filteredData = categories.filter((item) => {
                return (
                    item.title.toLowerCase().includes(searchData)
                )
            })
            displayItem(filteredData)
        });

        const displayItem = (items) => {
            document.getElementById('root').innerHTML = items.map((item) => {
                var { image, title, price } = item;
                return (
                    `<div class='box'>
                        <div class='img-box'>
                            <img class='images' src=${image}></img>
                        </div> 
                        <div class='bottom'>
                            <p>${title}</p>
                            <h2>$ ${price}.00</h2>
                        <button>Add to cart</button>
                        </div>
                    </div>`
                )
            }).join('')
        };
        displayItem(categories);

        window.onload = function() {
            if (window.location.hash) {
                // Get the target element based on the hash
                var targetElement = document.querySelector(window.location.hash);
                
                // Check if the element exists
                if (targetElement) {
                    // Scroll to the corresponding blog post
                    targetElement.scrollIntoView();
                }
            }
        };




// Function to handle comment submission
function submitComment() {
    // Get user input
    var nameInput = document.getElementById('name');
    var commentInput = document.getElementById('comment');

    var name = nameInput.value;
    var comment = commentInput.value;

    // Validate inputs
    if (name.trim() === '' || comment.trim() === '') {
        alert('Please enter both name and comment');
        return;
    }

    // Create a new comment object
    var newComment = {
        name: name,
        comment: comment,
        date: new Date().toLocaleString(),
    };

    // Save the comment (you might want to send it to a server or store it locally)
    // For simplicity, we'll use localStorage here, but a server-side solution is recommended
    saveComment(newComment);

    // Display the comment on the page
    displayComment(newComment);

    // Clear the input fields
    nameInput.value = '';
    commentInput.value = '';
}

// Function to save the comment (localStorage used for simplicity)
function saveComment(comment) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Function to display comments on the page
function displayComment(comment) {
    var commentsSection = document.getElementById('comments-section');

    // Create a new comment element
    var commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    // Populate the comment element
    commentElement.innerHTML = `
        <p><strong>${comment.name}</strong> (${comment.date}):</p>
        <p>${comment.comment}</p>
    `;

    // Append the comment to the comments section
    commentsSection.appendChild(commentElement);
}

// Load existing comments on page load
function loadComments() {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Display each comment
    comments.forEach(function (comment) {
        displayComment(comment);
    });
}

// Call loadComments on page load
window.onload = loadComments;

document.addEventListener("DOMContentLoaded", function () {
    // Set dates for each post
    document.getElementById("19-MARCH-2024").innerText = formatDate(new Date()); // Replace with actual date for post 1
    document.getElementById("14-March-2024").innerText = formatDate(new Date()); // Replace with actual date for post 2
    document.getElementById("25-April-2024").innerText = formatDate(new Date()); // Replace with actual date for post 3

    // Comment functionality
    document.getElementById("comments1").innerHTML = "No comments yet."; // Repeat for other posts
    document.getElementById("comments2").innerHTML = "No comments yet."; // Repeat for other posts
    document.getElementById("comments3").innerHTML = "No comments yet."; // Repeat for other posts
});

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

