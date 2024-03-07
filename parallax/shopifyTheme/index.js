let img1 = document.getElementById("first-section-img");
let header = document.querySelector("header"); // More specific targeting
let prevImg1Top = img1.style.top;

window.addEventListener("scroll", () => {
  let valueY = window.scrollY;

  img1.style.top = -100 + valueY * 0.5 + "px";

  if (valueY > 400) {
    console.log("ini5");
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});
