const accessKey = "kVqEa14OQ-ITy3FKPN3aHEE7LZ8QRjBp1QSrS4zPy0A";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      const image = document.createElement("img");
      const arrowText = document.createTextNode("     👈🏻")
      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank ";
      imageLink.textContent = result.alt_description;
      imageLink.appendChild(arrowText)

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
      showMore.style.display = "block";
    }
  } catch (error) {
    console.error("error", error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages("");
});

showMore.addEventListener("click", () => {
  searchImages("");
});
