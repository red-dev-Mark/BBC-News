const API_KEY = `a5eea815621a4e13b2b7c866d42d0d8e`;

const BBC_url = new URL(
  `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=a5eea815621a4e13b2b7c866d42d0d8e`
);
const noona_url = new URL(
  `https://markwon-jsstudy-news.netlify.app/top-headlines`
);

let newList = [];

const getLatestNews = async () => {
  const resource = await fetch(BBC_url);
  const data = await resource.json();
  newList = data.articles;

  render();

  console.log(newList);
};

const render = () => {
  const showNews = newList
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

const render2 = () => {
  const showNews = newList
    .map(
      (news) => `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size"
                src=${news.urlToImage} alt="">
        </div>
        <div class="col-lg-8 context">
            <h2>
              ${news.title}
            </h2>
            <p>
              ${news.description}
            </p>
            <div>
            ${news.source.name} * ${news.publishedAt}
            </div>
        </div>
      </div>`
    )
    .join("");

  document.querySelector(".news-board").innerHTML = showNews;
};
