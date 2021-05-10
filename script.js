const APIKEY = "?api_key=ee80fe331d257a1b7ebf79fa7f931357&language=en-US";
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const IMG_SRC = "https://image.tmdb.org/t/p/original/";
const MODAL_POSTER_BASE = "https://api.themoviedb.org/3/movie/";
//api.themoviedb.org/3/movie/460465
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

// https: //api.themoviedb.org/3/movie/popular?api_key=ee80fe331d257a1b7ebf79fa7f931357&language=en-US&page=1
// https: //api.themoviedb.org/3/movie/now_playing?api_key=ee80fe331d257a1b7ebf79fa7f931357&language=en-US&page=1
// https: //api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
// https: //api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1

const TABS = {
  HOME: "HOME",
  LIKED_LIST: "LISKED_LIST",
};

const model = {
  movieList: [],
  likedList: [460465, 804435],
  currentPage: 1,
  activeTab: TABS.HOME,
  currentMovie: null,
  currentCategory: "popular",
  totalPage: 1,
};

// view
const createCard = (id, imgSrc, title, rating, liked) => {
  const card = document.createElement("movie-grid");
  card.id = id;

  cardHTML = `
    <div class="card">
      <div>
          <img src="${imgSrc}" alt="Movie poster" />
      </div>
      
      <div class="movie-title">${title}</div>

      <div class="rate-like">
        <div>
          <i class="fas fa-star" style="color:orange"></i>
              ${rating}
        </div>

        <div id="liked-button">
          <i  class="like-icon icon ${
            liked ? "fas fa-heart" : "far fa-heart"
          }"></i>
        </div>
            
      </div>
    </div>
 `;
  card.innerHTML = cardHTML;
  return card;
};

const renderCardlist = (tab, list) => {
  const movieGrid = document.querySelector(tab);
  movieGrid.innerHTML = "";

  list.forEach((movie) => {
    const id = movie.id;
    const imgSrc = `${IMG_SRC}${movie.poster_path}`;
    const isLiked = model.likedList.some((liked) => liked.id === id);
    const card = createCard(
      id,
      imgSrc,
      movie.title,
      movie.vote_average,
      isLiked
    );
    movieGrid.appendChild(card);
  });
};

const renderHomeList = () => {
  renderCardlist(".movie-grid", model.movieList);
};

const renderLikedList = () => {
  renderCardlist(".liked", model.likedList);
};

const renderList = () => {
  renderHomeList();
  renderLikedList();
};

const fetchMovieList = () => {
  const url = `${BASE_URL}${model.currentCategory}${APIKEY}&page=${model.currentPage}`;
  return fetch(url)
    .then((resp) => resp.json())
    .then((films) => {
      model.movieList = films.results;
      renderHomeList();
      // console.log(model.movieList);
    });
};

// const fetchLikedList = () => {
//   const likedList = model.likedList;
//   const newList = [];

//   likedList.forEach((id) => {
//     const url = `${BASE_URL}${id}${APIKEY}&language=en-US`;

//     return fetch(url)
//       .then((resp) => resp.json())
//       .then((films) => {
//         // console.log("film", films);
//         newList.push(films);
//         // console.log("list", newList);
//       });
//   });
// };
// fetchLikedList();
// // renderLikedList();

// const handleLikeButton = (e) => {
//   const target = e.target;
//   const id = target.id;
//   const likedList = model.likedList;
//   likedList.appendChild(id);
// };

// handleLikeButton()
// const handleLikeClick = () => {
//   const likedButton = document.querySelector("#liked-button");
//
// };
// handleLikeClick();

const renderPageNumber = () => {
  const pageNumber = document.querySelector("#pageNumber");
  pageNumber.innerHTML = model.currentPage;
};
renderPageNumber();

const handelPageClick = (e) => {
  const target = e.target;

  if (target.id === "prev") {
    model.currentPage = model.currentPage - 1;
    renderPageNumber();
    fetchMovieList();
  }

  if (target.id === "next") {
    model.currentPage = model.currentPage + 1;

    renderPageNumber();
    fetchMovieList();
  }
};

const getCategory = () => {
  const selectElement = document.querySelector("#category");
  model.currentCategory = selectElement.value;
  model.currentPage = 1;
  renderPageNumber();
  fetchMovieList(model.currentCategory, model.currentPage);
  // console.log(model.currentCategory);
};

fetchMovieList(model.currentCategory, model.currentPage);

const loadEvent = () => {
  const selectCategory = document.querySelector("#category");
  const pageNumber = document.querySelector(".page-nav");
  // const likedButton = document.querySelector("#liked-tab");
  const LikedListTab = document.querySelector("#liked-tab");

  selectCategory.addEventListener("change", getCategory);
  pageNumber.addEventListener("click", handelPageClick);
  // likedButton.addEventListener("click", fetchLikedList);
  LikedListTab.addEventListener("click", renderLikedList);
};

loadEvent();

const btn = document.getElementById("#liked-button");
console.log("likebutton", btn.innerHTML);
// const fetchMovieDetail = () => {
//   const url = `https://api.themoviedb.org/3/movie/460465?api_key=ee80fe331d257a1b7ebf79fa7f931357&language=en-US`;
//   return fetch(url)
//     .then((resp) => resp.json())
//     .then((data) => console.log(data));
// };

// fetchMovieDetail();

// const creatModal = () => {
//   const modal = document.createElement("div");
//   modal.innerHTML = "";

//   modalHTML = `
//       <img src=${}${} alt="" class="poster" />
//       <div class="movie-info">
//         <h4>Movie title</h4>
//         <h5>Overview</h5>
//         <p>${currentMovie.overview}</p>
//         <h5>Genres</h5>
//         <ul class="genres">${currentMovie.genres}</ul>
//         <h5>Rating</h5>
//         <p>${currentMovie.vote_average}</p>
//         <h5>Production Companies</h5>
//         <ul>
//           ${currentMovie.production_companies}
//         </ul>
//   `;
//   modal.innerHTML = modalHTML;
//   return modal
// };

// const renderModal = (movie) => {
//   const modal = document.querySelector(".modal-movie-container");
//   movieModal.innerHTML = "";

//     const imgSrc = `${IMG_SRC}${movie.id}`;
//     const isLiked = model.likedList.some((liked) => liked.id === id);
//     const card = createModal(
//       imgSrc,
//       movie.title,
//       movie.vote_average,
//       isLiked
//     );
//     movieGrid.appendChild(card);

// };

//   const renderModal = () => {
//   const movieData = model.currentMovie;
//   movieGrid.innerHTML = "";
//   list.forEach((movie) => {
//     const id = movie.id;
//     const imgSrc = `${MODAL_POSTER_BASE}${movie.poster_path}`;
//     const isLiked = model.likedList.some((liked) => liked.id === id);
//     const card = createCard(
//       id,
//       imgSrc,
//       movie.title,
//       movie.vote_average,
//       isLiked
//     );
//     movieGrid.appendChild(card);
//   });
// };

// let modal = document.querySelector(".modal");
// let closeBtn = document.querySelector(".close-btn");
// const showModal = function () {
//   modal.style.display = "block";
// };
// const closeModal = function () {
//   modal.style.display = "none";
// };
// const handleWindoClick = function (e) {
//   if (e.target == modal) {
//     modal.style.display = "none";
//   }
// };

// controler
// const updateView () => {

// }

// <i class = "far fa-heart"></i>
//         <i class="fas fa-heart"></i>
