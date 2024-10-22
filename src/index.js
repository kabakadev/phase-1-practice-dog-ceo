console.log("%c HI", "color: firebrick");
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
document.addEventListener("DOMContentLoaded", () => {
  fetch(imgUrl)
    .then((res) => res.json())
    .then((data) => {
      const message = data.message;
      //   console.log(message);
      message.forEach((newMsg) => {
        img = document.createElement("img");
        // console.log(typeof newMsg);
        img.src = newMsg;
        document.querySelector("#dog-image-container").appendChild(img);
      });
    });
  fetch(breedUrl)
    .then((res) => res.json())
    .then((data) => {
      const allBreeds = data.message;
      addBreedsToList(allBreeds);
      //   console.log(allBreeds);

      const breedDropDown = document.querySelector("#breed-dropdown");
      breedDropDown.addEventListener("change", (e) => {
        const selectedLetter = e.target.value;
        filterBreed(allBreeds, selectedLetter);
      });
      function addBreedsToList(breeds) {
        const breedList = document.querySelector("#dog-breeds");
        breedList.innerHTML = "";
        for (const breed in breeds) {
          let newBreed = document.createElement("li");
          newBreed.textContent = breed;
          breedList.appendChild(newBreed);
          newBreed.addEventListener("click", () => {
            // console.log(newBreed);
            newBreed.style.color = "red";
          });
        }
      }
      function filterBreed(breeds, letter) {
        const filterBreeds = {};
        for (const breed in breeds) {
          if (breed.startsWith(letter)) {
            filterBreeds[breed] = breeds[breed];
          }
        }
        addBreedsToList(filterBreeds);
      }
    });
});
