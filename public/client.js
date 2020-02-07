// client-side js
// run by the browser each time your view template referencing it is loaded

// console.log("hello world :o");

const dreams = [];

// define variables that reference elements on our page
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements["dream"];
const descInput = dreamsForm.elements["description"];
const dreamsList = document.getElementById("dreams");
const clearButton = document.querySelector("#clear-dreams");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]



// request the dreams from our app's sqlite database
fetch("/getDreams", {})
  .then(res => res.json())
  .then(response => {
    // response.reverse()
    response.forEach(row => {
      // console.log(row)
      appendNewDream(row);
    });
  });


// Function that turns canvas into a url image
const saveImage = () => {
  
  let canvas = document.getElementById('c');
  let savedCanvas = document.createElement('canvas');
  let dpi = window.devicePixelRatio;
  
  savedCanvas.width = 500 * dpi;
  savedCanvas.height = 330 * dpi;
  
  let paddingLeft = (canvas.width - savedCanvas.width) / 2;
  let paddingTop = (canvas.height - savedCanvas.height) / 2;
  
  let ctx = savedCanvas.getContext('2d');
  ctx.drawImage(canvas, paddingLeft, paddingTop, savedCanvas.width, savedCanvas.height, 0, 0, savedCanvas.width, savedCanvas.height);
  
  let dataURL = savedCanvas.toDataURL('image/png', 1.0);
  
  return(dataURL)
  
};

// function to format timestamp to MON DA, YEAR
const formatTime = function (time) {
  time = time.split("-");
  let sub = time[2].split(" ");
  let m = months[parseInt(time[1]) - 1] + " ";
  let d = sub[0];
  let y = time[0];
  return(m + d + ", " + y);
};


// get submit button
const submitTag = document.querySelector(".submit-section");
const cancelTag = document.querySelector(".cancel");
const formTag = document.forms[0];

// function to reveal the submission form
const openSubmission = function () {
  submitTag.style.right = "0px";
};

// function to close the submission form
const closeSubmission = function () {
  submitTag.style.right = "-440px";
};






// a helper function that creates a list item for a given dream
const appendNewDream = dream => {
  const newListItem = document.createElement("div");
  newListItem.classList.add("flag");
  let thisDream = dream.name;
  let thisDesc = dream.description;
  let thisImage = dream.flag;
  let thisDate = dream.Timestamp
  newListItem.innerHTML =   `
                                <div class="overlay">
                                  <h4>${thisDream}</h4><h4>${thisDate}</h4>
                                  <h5>${thisDesc}</h5>
                                </div>
                                <img src="${thisImage}">
                            `
  // dreamsList.appendChild(newListItem);
  dreamsList.insertBefore(newListItem, dreamsList.childNodes[0]);
};

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = event => {
  // stop our form submission from refreshing the page
  event.preventDefault();
  const data = { flag: saveImage(), dream: dreamInput.value, description: descInput.value};
  console.log(data)
  

  fetch("/addDream", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
    });
  
  // get dream value and add it to the list
  dreams.push(data);
  appendNewDream(data);

  // reset form
  dreamInput.value = "";
  dreamInput.focus();
  descInput.value= "";
  descInput.focus();
  closeSubmission();
};

// clear dreams from list
// clearButton.addEventListener("click", event => {
//   fetch("/clearDreams", {})
//     .then(res => res.json())
//     .then(response => {
//       console.log("cleared dreams");
//     });
//   dreamsList.innerHTML = "";
// });
