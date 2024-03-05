const accessKey = "1xUJ0Y4bEgdy5UrGDoFU6POSxRoKHy9hkdEg6AxUBbE";
const formEle = document.querySelector("form");
const input = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.querySelector("#show-more");

let inputData = "";
let page = 1;

// Function to fetch images from Unsplash
async function searchImages() {
  inputData = input.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    imageWrapper.style.textAlign = "center";

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    image.style.display = "block";
    image.style.margin = "0 auto";

    const imagesLink = document.createElement("a");
    imagesLink.href = result.links.html;
    imagesLink.target = "_blank";
    imagesLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imagesLink);
    searchResult.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}
formEle.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
