// -------------------------------------------------------------------------- INFO MODAL
let lenis;

function disableScroll() {
  if (lenis) lenis.stop();
}

function enableScroll() {
  if (lenis) lenis.start();
}

function checkModalVisibility() {
  var modal = document.getElementById("myModal");

  if (modal && modal.style.display === "flex") {
    disableScroll();
  } else {
    enableScroll();
  }
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  restoreScrollPosition();
  enableScroll();
}

document.getElementById("showCredits").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("myModal").style.display = "flex";
  checkModalVisibility();
  saveScrollPosition();
});

document.getElementById("closeModal").addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  var modal = document.getElementById("myModal");
  if (event.target === modal) {
    event.preventDefault();
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// -------------------------------------------------------------------------- IMAGE PROTECTION
function preventContextMenu(event) {
  const body = document.getElementById("body");
  event.preventDefault();
  console.log("Please don't steal the images!");
}

document.addEventListener("contextmenu", preventContextMenu);

document.addEventListener("DOMContentLoaded", function () {
  var images = document.querySelectorAll('img');

  images.forEach(function (image) {
    image.setAttribute('draggable', 'false');
  });
});

// -------------------------------------------------------------------------- LIGHTBOX
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const triggerElements = document.querySelectorAll(".lightbox-trigger");
  const imgNumber = document.getElementById("lightbox-img-nr");
  let currentIndex = 0;
  let imagesArray = [];

  triggerElements.forEach((trigger, index) => {
    trigger.setAttribute("draggable", "false");

    trigger.addEventListener("click", function () {
      const imgUrl = trigger.getAttribute("src");
      openLightbox(imgUrl, index);
      disableScroll();
    });
  });

  closeBtn.addEventListener("click", function () {
    closeLightbox();
    enableScroll();
  });

  prevBtn.addEventListener("click", function () {
    navigateImages(-1);
  });

  nextBtn.addEventListener("click", function () {
    navigateImages(1);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
      enableScroll();
    } else if (event.key === "ArrowLeft") {
      navigateImages(-1);
    } else if (event.key === "ArrowRight") {
      navigateImages(1);
    }
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      event.preventDefault();
      closeLightbox();
      enableScroll();
    }
  });

  function openLightbox(imgUrl, index) {
    currentIndex = index;
    lightboxImg.setAttribute("src", imgUrl);
    lightbox.style.display = "flex";
    lightboxImg.style.objectFit = "contain";
    imagesArray = Array.from(triggerElements).map((trigger) => trigger.getAttribute("src"));
    updateImageNumber();
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.style.objectFit = "cover";
  }

  function navigateImages(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
      currentIndex = imagesArray.length - 1;
    } else if (currentIndex >= imagesArray.length) {
      currentIndex = 0;
    }
    const imgUrl = imagesArray[currentIndex];
    lightboxImg.setAttribute("src", imgUrl);
    updateImageNumber();
  }

  function updateImageNumber() {
    imgNumber.textContent = `${currentIndex + 1} / ${imagesArray.length}`;
  }
});

// -------------------------------------------------------------------------- NAVIGATION
var lastScrollTop;
var navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  var scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 200) {
    navbar.style.transform = "translateY(-100px)";
  } else {
    navbar.style.transform = "translateY(0px)";
  }

  lastScrollTop = scrollTop;
});

// -------------------------------------------------------------------------- MOBILE OR DESKTOP
function isMobileDevice() {
  return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function initSmoothScrolling() {
  const init = () => {
    lenis = new Lenis({
      lerp: 0.2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  };

  init();
}

if (!isMobileDevice()) {
  initSmoothScrolling();
}

// Prevent iFrame
document.addEventListener('DOMContentLoaded', function () {
  if (window === window.top) {
    var meta = document.createElement('meta');
    meta.setAttribute('http-equiv', 'X-Frame-Options');
    meta.setAttribute('content', 'DENY');
    document.head.appendChild(meta);
  }
});

// Scroll Animations
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  if (hiddenElements.length > 0) {
    hiddenElements.forEach((el) => observer.observe(el));
  } else {
    console.error("No elements with the 'hidden' class found.");
  }
});

// Resize Header on Scroll
document.addEventListener('scroll', function () {
  const fromTranslateY = 0;
  const toTranslateY = 300;
  const resizeElement = document.querySelector('#resizeElement');

  const elementTop = resizeElement.getBoundingClientRect().top + window.scrollY;
  const startScroll = elementTop;
  const endScroll = elementTop + 700;

  const scrollPosition = window.scrollY;

  if (scrollPosition > startScroll && scrollPosition < endScroll) {
    const scrollRange = endScroll - startScroll;
    const translateYRange = toTranslateY - fromTranslateY;
    const scrollFraction = (scrollPosition - startScroll) / scrollRange;
    const newTranslateY = fromTranslateY + translateYRange * scrollFraction;
    resizeElement.style.transform = `translateY(${newTranslateY}px)`;
  } else if (scrollPosition <= startScroll) {
    resizeElement.style.transform = `translateY(${fromTranslateY}px)`;
  } else if (scrollPosition >= endScroll) {
    resizeElement.style.transform = `translateY(${toTranslateY}px)`;
  }
});

function saveScrollPosition() {
  localStorage.setItem("scrollPosition", window.scrollY);
}

function restoreScrollPosition() {
  const scrollPosition = localStorage.getItem("scrollPosition");
  if (scrollPosition) {
    window.scrollTo(0, scrollPosition);
    localStorage.removeItem("scrollPosition");
  }
}
