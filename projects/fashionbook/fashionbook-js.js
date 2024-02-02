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

// Anchor Handling
$(document).ready(function () {
  // Function to handle scroll events
  function handleScroll() {
    var scrollPosition = $(window).scrollTop();

    $('.section').each(function () {
      var sectionId = $(this).attr('id');
      var sectionTop = $(this).offset().top;
      var sectionHeight = $(this).outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        $('.section-link').removeClass('underline');
        $('[data-section="' + sectionId + '"]').addClass('underline');
      }
    });
  }

  // Attach the handleScroll function to the scroll event
  $(window).on('scroll', handleScroll);

  // Smooth scroll to anchor links without adding #name to the URL
  $('.section-link').on('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    var targetSection = $(this).attr('href'); // Get the target section from the href attribute
    $('html, body').animate({
      scrollTop: $(targetSection).offset().top
    }, 800); // Adjust the scroll speed if needed
  });
});