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