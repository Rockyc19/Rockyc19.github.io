// animation cards
let animation = document.querySelectorAll(".animation");

function showScroll() {
  let scrollTop = document.documentElement.scrollTop;
  for (let i = 0; i < animation.length; i++) {
    let heightAnimation = animation[i].offsetTop;
    if (heightAnimation - -450 < scrollTop) {
      animation[i].style.opacity = 1;
      animation[i].classList.add("showUp");
    }
  }
}

window.addEventListener("scroll", showScroll);

// animation timeline

function qs(selector, all = false) {
  return all
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
}

const sections = qs(".time-line-description", true);
const timeline = qs(".timeline");
const line = qs(".line");
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler(e) {
    const { scrollY } = window;
    up = scrollY < prevScrollY;
    down = !up;
    const timelineRect = timeline.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();
  
    const dist = targetY - timelineRect.top;
  
    if (down && !full) {
      set = Math.max(set, dist);
      line.style.bottom = `calc(100% - ${set}px)`;
    } else if (up) {
      set = Math.min(set, dist);
      line.style.bottom = `calc(100% - ${set}px)`;
      full = false;
    }
  
    if (dist > timeline.offsetHeight + 50 && !full) {
      full = true;
      line.style.bottom = "-50px";
    }
  
    sections.forEach((item) => {
      const rect = item.getBoundingClientRect();
  
      if (rect.top + item.offsetHeight / 5 < targetY) {
        item.classList.add("show-me");
      } else if (rect.top + item.offsetHeight / 5 >= targetY) {
        item.classList.remove("show-me");
      }
    });
    prevScrollY = window.scrollY;
  }

scrollHandler();
line.style.display = "block";
window.addEventListener("scroll", scrollHandler);

let slideIndex = 0;

function openPopup(projectId, event) {
  event.preventDefault();
  document.getElementById(`${projectId}-popup`).style.display = "block";
  showSlides(slideIndex);
}

function closePopup(projectId) {
  document.getElementById(`${projectId}-popup`).style.display = "none";
}

function changeSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.querySelectorAll('.popup-slide');
  if (n >= slides.length) { slideIndex = 0 }
  if (n < 0) { slideIndex = slides.length - 1 }
  slides.forEach(slide => slide.classList.remove('active'));
  slides[slideIndex].classList.add('active');
}

// Close the popup when clicking outside of it
window.onclick = function(event) {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  });
}

// Controleer de schermgrootte bij het laden van de pagina en bij het wijzigen van de grootte van het venster
function checkResponsive() {
    const heroButton = document.querySelector('.hero-button');
    if (window.innerWidth <= 768) {
      heroButton.style.display = 'block';
    } else {
      heroButton.style.display = 'none';
    }
  }
  
  window.addEventListener('load', checkResponsive);
  window.addEventListener('resize', checkResponsive);