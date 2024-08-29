const API_KEY = "3e9e7254fcbb4b9387d0afc945eca55b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("latest"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try{
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        console.log(data);
        bindData(data.articles);
    }catch (error){
        console.error("Error fetching news", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    console.log(article);  // Log the article to check the fields

    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    // Added if-else statements to make it easy to see which part gives the error.

    if (newsImg) {
        newsImg.src = article.urlToImage || "default-image.jpg"; // Fallback to a default image
    } else {
        console.error("news-img element not found");
    }
    if (newsTitle) {
        newsTitle.innerHTML = article.title || "No title available";
    } else {
        console.error("news-title element not found");
    }
    if (newsDesc) {
        newsDesc.innerHTML = article.description || "No description available";
    } else {
        console.error("news-desc element not found");
    }

    if (newsSource) {
        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });
        newsSource.innerHTML = `${article.source.name} · ${date}`;
    } else {
        console.error("news-source element not found");
    }

    const clickableElement = cardClone.firstElementChild;
    if (clickableElement) {
        clickableElement.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
    } else {
        console.error("No clickable element found to attach event listener");
    }
}

// Function for giving color to the active tab and fetching the news. 

function onNavItemClick(id) {
    // Remove 'active' class from all nav items
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => item.classList.remove("active"));

    // Add 'active' class to the clicked item
    const activeItem = document.getElementById(id);
    if (activeItem) {
        activeItem.classList.add("active");
    }

    // Fetch news based on the clicked item
    fetchNews(id);
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    
    // Remove 'active' class from all nav items
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => item.classList.remove("active"));
});

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    body.classList.toggle('dark-mode');

    // Switch the icon and tooltip
    if (body.classList.contains('dark-mode')) {
        themeIcon.src = "sun.png";  // Change to the sun icon
        themeIcon.alt = "Switch to Light Mode";
    } else {
        themeIcon.src = "moon.png";  // Change to the moon icon
        themeIcon.alt = "Switch to Dark Mode";
    }
}
