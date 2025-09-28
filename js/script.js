document.addEventListener("DOMContentLoaded", () => {
  const dropBtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");
  const dropdownLinks = dropdownContent.querySelectorAll("a");

  dropBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dropdownContent.classList.toggle("show");
  });

  dropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      dropdownContent.classList.remove("show");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      dropdownContent.classList.remove("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  const slideItems = document.querySelectorAll(".slides img");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots");

  let index = 0;
  const totalSlides = slideItems.length;

  slideItems.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => moveToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function moveToSlide(slideIndex) {
    index = slideIndex;
    slides.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
  }

  function showNext() {
    index = (index + 1) % totalSlides;
    moveToSlide(index);
  }

  function showPrev() {
    index = (index - 1 + totalSlides) % totalSlides;
    moveToSlide(index);
  }

  next.addEventListener("click", showNext);
  prev.addEventListener("click", showPrev);

  setInterval(showNext, 5000);
});

const dots = document.querySelectorAll('.dot');
const slider = document.querySelector('.slider');

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    slider.scrollTo({
      left: index * 220,
      behavior: 'smooth'
    });
    document.querySelector('.dot.active').classList.remove('active');
    dot.classList.add('active');
  });
});

fetch('movies.json')
  .then(res => res.json())
  .then(data => {
    let container = document.getElementById('movie-slider');

    data.forEach(movies => {
      container.innerHTML += `
        <div class="movie-card">
          <img src="${movies.poster}" alt="Poster phim">
          <div class="tags">
            <span class="age">${movies.age}</span>
            <span class="sub">${movies.subtitle}</span>
            <span class="format">${movies.format}</span>
          </div>
          <h3>${movies.movieTitle}</h3>
          <p>Thể loại phim: <span>${movies.genre}</span></p>
        </div>
      `;
    });

    const movieSlider = document.querySelector(".movie-slider");
    const cards = document.querySelectorAll(".movie-card");
    const prevBtn = document.querySelector(".prev-movie");
    const nextBtn = document.querySelector(".next-movie");
    const dotsContainer = document.querySelector(".movie-dots");

    let index = 0;
    const cardWidth = cards[0].offsetWidth + 16;
    const visibleCards = Math.floor(movieSlider.offsetWidth / cardWidth);
    const totalSlides = cards.length - visibleCards + 1;

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => moveToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll("span");

    function updateDots() {
      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }

    function moveToSlide(i) {
      index = i;
      movieSlider.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
      updateDots();
    }

    function showNext() {
      index = (index + 1) % totalSlides;
      moveToSlide(index);
    }

    function showPrev() {
      index = (index - 1 + totalSlides) % totalSlides;
      moveToSlide(index);
    }

    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);
  });
