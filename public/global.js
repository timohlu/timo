// Check if the device is a mobile device
function isMobileDevice() {
    return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

// Check if the device is a touch device
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// Initialize smooth scrolling
let lenis;

function initSmoothScrolling() {
    if (!isTouchDevice()) {
        lenis = new Lenis({
            lerp: 0.2,
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }
}

// Function to disable smooth scrolling and body overflow
function disableScroll() {
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';
}

// Function to enable smooth scrolling and restore body overflow
function enableScroll() {
    if (lenis) lenis.start();
    document.body.style.overflow = '';
}

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    // Initialize smooth scrolling if not a mobile device and not a touch device
    if (!isMobileDevice() && !isTouchDevice()) {
        initSmoothScrolling();
    }

    // Check modal visibility and adjust scrolling
    function checkModalVisibility() {
        var modal = document.getElementById("myModal");
        if (modal && modal.style.display === "flex") {
            disableScroll();
        } else {
            enableScroll();
        }
    }

    // Close modal and restore scrolling
    function closeModal() {
        document.getElementById("myModal").style.display = "none";
        enableScroll();
    }

    // Event listener for showing modal
    document.getElementById("showCredits").addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("myModal").style.display = "flex";
        checkModalVisibility();
        // Save scroll position if needed
    });

    // Event listener for closing modal
    document.getElementById("closeModal").addEventListener("click", closeModal);

    // Close modal on outside click
    window.addEventListener("click", function (event) {
        var modal = document.getElementById("myModal");
        if (event.target === modal) {
            event.preventDefault();
            closeModal();
        }
    });

    // Close modal on Escape key press
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });
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
var lastScrollTop = 0;
var navbar = document.getElementById("navbar");
var animationInProgress = false;

window.addEventListener("scroll", function () {
    if (animationInProgress) return;
    animationInProgress = true;

    var scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = "translate(-50%, -100px)";
    } else {
        navbar.style.transform = "translate(-50%, 0px)";
    }

    setTimeout(() => {
        animationInProgress = false;
    }, 500);
    lastScrollTop = scrollTop;
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

//---------------------------------------------------------- TIME
function updateTime() {
    const timeElement = document.getElementById('time');
    if (timeElement) {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        // const seconds = currentTime.getSeconds().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        // const formattedTime = `${hours}:${minutes}:${seconds}`; // Seconds added
        timeElement.textContent = formattedTime;
    }
}
updateTime();

setInterval(updateTime, 1000);

// GSAP
// Add this in a <script> tag or global.js after GSAP is loaded
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.project-image').forEach((img, i) => {
    gsap.from(img, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: i * 0.1, // stagger effect based on index
        scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
});

gsap.from(".header-text, .about-text", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
});
