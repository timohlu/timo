// -------------------------------------------------------------------------- INFO MODAL
function disableScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

function checkModalVisibility() {
  var modal = document.getElementById("myModal");

  if (modal && modal.style.display === "flex") {
    disableScroll();
  } else {
    enableScroll();
  }
}

document
  .getElementById("showCredits")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("myModal").style.display = "flex";
    checkModalVisibility();
  });

document
  .getElementById("closeModal")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("myModal").style.display = "none";
    enableScroll();
  });

window.addEventListener("click", function (event) {
  var modal = document.getElementById("myModal");
  if (event.target === modal) {
    event.preventDefault();
    modal.style.display = "none";
    enableScroll();
  }
});

// -------------------------------------------------------------------------- IMAGE PROTECTION
function preventContextMenu(event) {
  const body = document.getElementById("body");
  event.preventDefault();
  console.log("Please don't steal the images!")
}

document.addEventListener("contextmenu", preventContextMenu);

document.addEventListener("DOMContentLoaded", function () {
  var images = document.querySelectorAll('img');

  images.forEach(function (image) {
    image.setAttribute('draggable', 'false');
  });
});

// -------------------------------------------------------------------------- LIGHTBOX
function disableScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

function checkModalVisibility() {
  var modal = document.getElementById("myModal");

  if (modal && modal.style.display === "flex") {
    disableScroll();
  } else {
    enableScroll();
  }
}

document.getElementById("showCredits").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("myModal").style.display = "flex";
  checkModalVisibility();
  saveScrollPosition();
});

document.getElementById("closeModal").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("myModal").style.display = "none";
  restoreScrollPosition();
  enableScroll();
});

window.addEventListener("click", function (event) {
  var modal = document.getElementById("myModal");
  if (event.target === modal) {
    event.preventDefault();
    modal.style.display = "none";
    restoreScrollPosition();
    enableScroll();
  }
});


// function preventContextMenu(event) {
//   event.preventDefault();
// }

// document.addEventListener("contextmenu", preventContextMenu);

// document.addEventListener("DOMContentLoaded", function () {
//   var images = document.querySelectorAll('img');

//   images.forEach(function (image) {
//     image.setAttribute('draggable', 'false');
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const triggerElements = document.querySelectorAll(".lightbox-trigger");
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
  }

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
  let lenis;

  const init = () => {
    lenis = new Lenis({
      lerp: 0.1,
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
