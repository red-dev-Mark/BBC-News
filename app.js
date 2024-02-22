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

let newsList = [];
const newsBoard = document.querySelector(".news-board");
const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
  return btn.addEventListener("click", (e) => {
    return getNewsByCategory(e);
  });
});
const keyword = document.querySelector("#search-input");
const inputBtn = document.querySelector("#search-button");
inputBtn.addEventListener("click", () => getNewsByKeyword());
keyword.addEventListener("keypress", function (e) {
  if (e.key === "Enter") return getNewsByKeyword();
});

const getLatestNews = async () => {
  const response = await fetch(noona_url);
  const data = await response.json();

  newsList = data.articles;
  render();
};

getLatestNews();

const getNewsByCategory = async (e) => {
  let category = e.target.textContent.toLowerCase();
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    `https://markwon-jsstudy-news.netlify.app/top-headlines?category=${category}`
  );
  const response = await fetch(url);
  const data = await response.json();

  newsList = data.articles;
  render();
};

const getNewsByKeyword = async () => {
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword.value}&apiKey=${API_KEY}`
    `https://markwon-jsstudy-news.netlify.app/top-headlines?q=${keyword.value}`
  );
  const response = await fetch(url);
  const data = await response.json();

  newsList = data.articles;
  console.log(data);
  render();
  keyword.value = "";
};

const render = () => {
  const newsHTML = newsList
    .map((news) => {
      if (news.urlToImage !== null) {
        return `
        <div class="news">
            <div class="news-img">
                <img src="${
                  news.urlToImage !== null
                    ? news.urlToImage
                    : "https://www.bbcstudios.com/Resources/NewBBCSFooterlogo.svg"
                }">
            </div>
            <div class="news-content">
                <h2>${news.title !== null ? news.title : "NONE"}
                  </h2>
                <p>${news.description !== null ? news.description : "NONE"}</p>
                <p id="time">${
                  news.publishedAt !== null ? news.publishedAt : "NONE"
                } - 
                  ${news.author !== null ? news.author : "NONE"} - 
                  ${news.source.name}</p>
            </div>
        </div>`;
      }
    })
    .join("");

  newsBoard.innerHTML = newsHTML;
};

const showInput = () => {
  const inputArea = document.querySelector("#top .logo .search .input");
  if (inputArea.style.display === "flex") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "flex";
  }
  // inputArea.classList.toggle("showInputArea")
  console.log('a')
};
