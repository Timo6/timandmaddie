// Define allowed pages and their corresponding passwords
const allowedPages = [
    { page: "invite.html", password: "FURLONG" },
    { page: "howtofindus.html", password: "FURLONG" },
    { page: "gifts.html", password: "FURLONG" },
    { page: "recommendations.html", password: "FURLONG" },
    { page: "faqs.html", password: "FURLONG" },
    { page: "contact.html", password: "FURLONG" },
    { page: "photos.html", password: "FURLONG" },
    { page: "live.html", password: "FURLONG" },
    // Add more pages here as needed
];

// Function to set session token in local storage
function setSessionToken(password) {
    localStorage.setItem(`authToken_${password}`, 'true');
}

// Function to check if session token exists in local storage
function checkSessionToken(password) {
    return localStorage.getItem(`authToken_${password}`) === 'true';
}

// Function to clear session token from local storage
function clearSessionToken(password) {
    localStorage.removeItem(`authToken_${password}`);
}

// Function to extract password from the current page URL
function getPasswordFromUrl() {
    const currentPage = window.location.pathname.split('/').pop();
    const page = allowedPages.find(page => page.page === currentPage);
    return page ? page.password : null;
}

// Function to check if the current page is index.html
function isIndexPage() {
    return window.location.pathname.endsWith("/index.html");
}

// Redirect to the landing page if authentication is not successful
function redirectToIndex() {
    if (!isIndexPage()) {
        window.location.href = "index.html";
    }
}

// Function to normalize password input (case insensitive, remove spaces)
function normalizePassword(password) {
    return password.toUpperCase().replace(/\s/g, '');
}


// Check session token and password on page load
window.addEventListener("DOMContentLoaded", function() {
    const password = normalizePassword(getPasswordFromUrl());

    if (!password || !checkSessionToken(password)) {
        redirectToIndex();
        return; // Stop execution to prevent further rendering
    }

    // Remove loading screen if authentication is successful
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        loadingScreen.remove();
    }

    // Display content after authentication succeeds
    const content = document.getElementById("content");
    if (content) {
        content.style.display = "block";
    }
});

document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    var password = normalizePassword(document.getElementById("password").value);

    // Check password and redirect accordingly
    const page = allowedPages.find(page => page.password === password);

    if (page) {
        window.location.href = `${page.page}`;
        setSessionToken(password);
    } else {
        alert("Incorrect password. Please try again.");
    }
});
