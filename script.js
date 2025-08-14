const movies = [
 
  {
  title: "Jarlik",
  img: "https://asilmedia.org/rasmlar/images/2025/02/20/xThe-Gorge-2025.webp.pagespeed.ic.P0PUQh1cvc.webp",
  video: "https://vk.com/video_ext.php?oid=1037388299&id=456239017",
  genre: ["jangari", "ramantika", "fantastika"]
},

  {
  title: "Yurak ko'z qotil",
  img: "https://uzmove.net/uploads/posts/2025-03/medium/1741533008144.jpg",
  video: "https://vk.com/video_ext.php?oid=880825019&id=456239767",
  genre: ["ramantika"]
},

  {
  title: "Usta ishchi",
  img: "https://asilmedia.org/rasmlar/images/2025/04/05/x2093948.jpg.pagespeed.ic.o9gPwWmPk_.jpg",
  video: "https://vk.com/video_ext.php?oid=-229908696&id=456239045",
  genre: ["jangari"]
},

  {
  title: "Momaqaldiroqlar",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8mVT3oaiNh8R0swlF9Qrbis8VFck_1LYXA&s",
  video: "https://vk.com/video_ext.php?oid=-229908696&id=456239306",
  genre: ["jangari", "fantastika"]
},

  {
  title: "Gunohkorlar",
  img: "https://uzmovicom.net/uploads/posts/2025-04/1745068171_formatovscreenshot_1.webp",
  video: "https://vk.com/video_ext.php?oid=-226865826&id=456239329",
  genre: ["qo'rqinchli"]
},

{
  title: "Vayronagarchilik",
  img: "https://uzhd.org/uploads/posts/2025-03/1741702767_000000000.webp",
  video: "https://vk.com/video_ext.php?oid=-226865826&id=456239318",
  genre: ["jangari"]
},
{
  title: "Elektr shtati",
  img: "https://cdn.photolink.uz/c9144598b85b46.jpg",
  video: "https://vk.com/video_ext.php?oid=-230363337&id=456239020",
  genre: ["fantastika"]
},


  { title: "Avatar 2", 
   img: "https://m.media-amazon.com/images/I/71s3cEqEZTL.jpg", 
   video: "https://vk.com/video_ext.php?oid=-229908696&id=456239141",
  genre: ["jangari", "fantastika"] },
  
{
  title: "Deadpool",
  img: "https://m.media-amazon.com/images/I/71hIvv4-7TS._AC_UF894,1000_QL80_.jpg",
  video: "https://vk.com/video_ext.php?oid=-229908696&id=456239182",
  genre: ["jangari", "komediya", "fantastika"] },

];

const series = [
  {
    title: "Bizning oxirgimiz",
    img: "https://freekino.net/img/poster/bizning-oxirgimiz-songimiz-1-2-3-4-5-6-7-8-9-10-11-12-qism-tarjima-serial_1674061141.jpg",
    genre: ["jangari", "qo'rqinchli"] ,
    episodes: [
      { title: "1-qism", video: "https://vk.com/video_ext.php?oid=547544824&id=456239020" },
      { title: "2-qism", video: "https://vk.com/video_ext.php?oid=547544824&id=456239050" },
      { title: "3-qism", video: "https://vk.com/video_ext.php?oid=547544824&id=456239055" },
      { title: "4-qism", video: "https://vk.com/video_ext.php?oid=547544824&id=456239054" },

      
    ]
  },
  
];

const modal = document.getElementById('modal');
const videoPlayer = document.getElementById('videoPlayer');
const closeModal = document.getElementById('closeModal');
const movieList = document.getElementById('movie-list');
const seriesList = document.getElementById('series-list');
const searchInput = document.getElementById('search');
const commentInput = document.getElementById('commentInput');
const sendComment = document.getElementById('sendComment');
const commentsList = document.getElementById('commentsList');
const pagination = document.getElementById('pagination');

// Janr tugmalari uchun
const genreButtons = document.querySelectorAll('.genres button');

let currentPage = 1;
const moviesPerPage = 8;
const seriesPerPage = 4;
let searchTerm = '';
let selectedGenre = 'barchasi';  // Dastlab "barchasi" tanlangan

// Janr tugmalari bosilganda ishga tushadi
genreButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Barcha tugmalardan active klassini olib tashlash
    genreButtons.forEach(btn => btn.classList.remove('active'));
    // Bosilgan tugmaga active klassini berish
    button.classList.add('active');

    // Tanlangan janrni o‘zgartirish
    selectedGenre = button.dataset.genre;

    // Sahifani 1-betga qaytarish
    currentPage = 1;

    // Kartalarni yangilash
    renderCards();
  });
});

// Kinolar va seriallarni qidiruv va janr bo‘yicha filtrlash funksiyasi
function filterItems() {
  let filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  let filteredSeries = series.filter(serie =>
    serie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

 if (selectedGenre !== 'barchasi') {
  filteredMovies = filteredMovies.filter(movie => Array.isArray(movie.genre) && movie.genre.includes(selectedGenre));
  filteredSeries = filteredSeries.filter(serie => Array.isArray(serie.genre) && serie.genre.includes(selectedGenre));

  }

  return { filteredMovies, filteredSeries };
}

// Kinolar va seriallarni sahifalash bilan render qilish
function renderCards() {
  const { filteredMovies, filteredSeries } = filterItems();

  const startMovie = (currentPage - 1) * moviesPerPage;
  const startSeries = (currentPage - 1) * seriesPerPage;

  const paginatedMovies = filteredMovies.slice(startMovie, startMovie + moviesPerPage);
  const paginatedSeries = filteredSeries.slice(startSeries, startSeries + seriesPerPage);

  movieList.innerHTML = '';
  seriesList.innerHTML = '';
const fullscreenBtn = document.getElementById('fullscreenBtn');
const videoPlayer = document.getElementById('videoPlayer');

fullscreenBtn.onclick = () => {
  if (!document.fullscreenElement) {
    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    } else if (videoPlayer.webkitRequestFullscreen) { /* Safari */
      videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) { /* IE11 */
      videoPlayer.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

  // Kinolarni ekranga chiqarish
  paginatedMovies.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<img src="${item.img}" alt="${item.title}" class="card-img"><h3>${item.title}</h3>`;
    div.onclick = () => openModal(item.video);
    movieList.appendChild(div);
  });

  // Seriallarni ekranga chiqarish
  paginatedSeries.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<img src="${item.img}" alt="${item.title}" class="card-img"><h3>${item.title}</h3>`;
    div.onclick = () => openEpisodeList(item);
    seriesList.appendChild(div);
  });

  renderPagination(filteredMovies, filteredSeries);
}

// Sahifalash tugmalarini yaratish
function renderPagination(filteredMovies, filteredSeries) {
  const totalPages = Math.max(
    Math.ceil(filteredMovies.length / moviesPerPage),
    Math.ceil(filteredSeries.length / seriesPerPage)
  );

  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.onclick = () => {
      currentPage = i;
      renderCards();
    };
    pagination.appendChild(btn);
  }
}

// Modalni ochish
function openModal(videoLink) {
  modal.style.display = 'flex';
  videoPlayer.src = videoLink;
  commentsList.innerHTML = '';
  commentInput.value = '';
}

// Serial qismlarini ko‘rsatish
function openEpisodeList(series) {
  const list = series.episodes.map(ep =>
    `<li><a href="#" onclick="playEpisode('${ep.video}')">${ep.title}</a></li>`
  ).join('');
  videoPlayer.src = '';
  modal.style.display = 'flex';
  commentsList.innerHTML = `<h3>${series.title} qismlar:</h3><ul>${list}</ul>`;
  commentInput.value = '';
}

// Epizodni o‘ynash funksiyasi
window.playEpisode = function(videoLink) {
  videoPlayer.src = videoLink;
};

// Modal yopish
closeModal.onclick = () => {
  modal.style.display = 'none';
  videoPlayer.src = '';
};

// Izoh yuborish
sendComment.onclick = () => {
  const comment = commentInput.value.trim();
  if (comment) {
    const li = document.createElement('li');
    li.textContent = comment;
    commentsList.appendChild(li);
    commentInput.value = '';
  }
};

// Qidiruv inputiga event qo‘shish
searchInput.addEventListener('input', () => {
  searchTerm = searchInput.value;
  currentPage = 1;
  renderCards();
});

// Boshlang‘ich render
renderCards();
fullscreenBtn.onclick = () => {
  if (!document.fullscreenElement) {
    videoPlayer.requestFullscreen().then(() => {
      // Agar fullscreen muvaffaqiyatli bo‘lsa, orientatsiyani landscape ga o‘zgartiramiz
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(err => {
          console.warn('Orientatsiyani o‘zgartirib bo‘lmadi:', err);
        });
      }
    }).catch(err => {
      console.error('Fullscreenga o‘ta olmadi:', err);
    });
  } else {
    document.exitFullscreen().then(() => {
      // Chiqishda orientatsiyani qayta tiklash (ixtiyoriy)
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    });
  }
};
