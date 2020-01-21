const pages = document.querySelectorAll("section")
const w = window.innerWidth


pages.forEach(section => {
  section.addEventListener("click", function(event) {
    // event.preventDefault()
    pages.forEach(section => {
      section.classList.remove("open");
    })
    section.classList.add("open")
  })
});


const closeTag = document.querySelector("#close");
const helpBox = document.querySelector("#helpbox");
const helpButtonTag = document.querySelector("#help__button")


const closeHelpbox = function () {
  helpBox.style.visibility = "hidden"
};

const openHelpbox = function () {
  helpBox.style.visibility = "visible"
  // show help link to bring helpbox back
};

closeTag.addEventListener("click", function () {
  closeHelpbox()
});

helpButtonTag.addEventListener("click", function () {
  openHelpbox()
});

// event listener to bring helpbox back



const viewSizes = document.querySelectorAll(".view-size a");
const gridLink = document.querySelector(".view-grid");
const listLink = document.querySelector(".view-list");

viewSizes.forEach( size => {
  size.addEventListener("click", function () {
    const allFlags = document.querySelectorAll(".flag");
    console.log(allFlags)
    event.preventDefault()
    if (this.classList.contains("view-grid")) {
      allFlags.forEach(flag => {
        listLink.classList.remove("selected")
        flag.style.width = "220px";
      })
    }
    if (this.classList.contains("view-list")) {
      allFlags.forEach(flag => {
        gridLink.classList.remove("selected")
        flag.style.width = "500px"
      })
    }
    size.classList.add("selected")
  })
});




