const API_KEY = `a5eea815621a4e13b2b7c866d42d0d8e`;

const BBC_url = new URL(
  `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`
);
const Times_url = new URL(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
);
const noona_url = new URL(
  `https://markwon-jsstudy-news.netlify.app/top-headlines`
);

let newList = [];
const keyword = document.querySelector("#search-input");
const menus = document.querySelectorAll(".buttons button");
menus.forEach((menu) =>
  menu.addEventListener("click", (e) => getNewsByCategoty(e))
);

const getLatestNews = async () => {
  const response = await fetch(noona_url);
  const data = await response.json();
  newsList = data.articles;

  render();
};

const getNewsByCategoty = async (e) => {
  const category = e.target.textContent.toLowerCase();
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;

  render();
};

const getNewsByKeyword = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&q=${keyword.value}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;

  render();
  keyword.value = "";
};

const render = () => {
  const showNews = newsList
    .map((news) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img class="news-img" src="${news.urlToImage}" alt="">
    </div>
    <div class="col-lg-8 context">
      <h2>
        ${news.title}
      </h2>
      <p>
      ${news.description}
      </p>
      <div>
      ${news.publishedAt}
      </div>
    </div>
  </div>`;
    })
    .join("");

  document.querySelector(".news-board").innerHTML = showNews;
};

getLatestNews();
