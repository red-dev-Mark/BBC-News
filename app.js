const API_KEY = `a5eea815621a4e13b2b7c866d42d0d8e`;

const BBC_url = new URL(
  `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`
);
const Times_url = new URL(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
);
let url = new URL(`https://markwon-jsstudy-news.netlify.app/top-headlines`);

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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class = "alert alert-danger" role = "alert">
  ${errorMessage}
  </div>`;

  document.querySelector(".news-board").innerHTML = errorHTML;
};

//매개변수가 있을 때 : 함수 호출 시 인자를 받음 (url) getNews 속 url은 인자의 url -> 인자로 전달되는 것이 변수 url
// 없을 때 : 함수 호출 시 인자가 없어도 됨 (변수 url) getNews 속에서 url이 변수 url을 받음
const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search..");
      } else {
        newsList = data.articles;
        render();
      }
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
    console.log("error : ", error.message);
  }
};

const getLatestNews = async () => {
  // getNews(url);
  getNews();
};

getLatestNews();

const getNewsByCategory = async (e) => {
  let category = e.target.textContent.toLowerCase();
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    `https://markwon-jsstudy-news.netlify.app/top-headlines?category=${category}`
  );
  getNews(url);
  // getNews();
};

const getNewsByKeyword = async () => {
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword.value}&apiKey=${API_KEY}`
    `https://markwon-jsstudy-news.netlify.app/top-headlines?q=${keyword.value}`
  );
  getNews(url);
  // getNews();
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
  console.log("a");
};

const openNav = () => {
  document.getElementById("mySidenav").style.width = "50vw";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
