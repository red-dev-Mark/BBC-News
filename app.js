const author = document.querySelector(".author");
const title = document.querySelector(".author");

const API_KEY = "a5eea815621a4e13b2b7c866d42d0d8e";
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
  );
  const response = await fetch(url);
  const data = await response.json();
  return data.articles;
};

getLatestNews().then((articles) => {
  //   authors.innerText = news.author;
  for (let article of articles) {
    const liAuthor = document.createElement('li')
    liAuthor.innerText = article.author;
    author.append(liAuthor)

    const liTitle = document.createElement('li')
    liTitle.innerText = article.title;
    title.append(liTitle)
  }
});
// // const url = new URL(
// //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
// // );
// // const getLatestNews = () => {
// //   const response = fetch(url);
// //   response
// //     .then((res) => {
// //       return res.json();
// //     })
// //     .then((data) => {
// //       console.log(data.articles[0].author);
// //     })
// //     .catch(() => {
// //       console.log("ERROR");
// //     });
// // };

// // getLatestNews();
