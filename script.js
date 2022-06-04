const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  infoText = wrapper.querySelector(".info-text"),
  synonymsList = wrapper.querySelector(".synonyms .list"),
  volume = wrapper.querySelector(".word i"),
  close = wrapper.querySelector(".material-icons");
let audio;

// data function

function data(result, word) {
  if (result.title) {
    infoText.style.color = "red";
    infoText.innerHTML = `Sorry, we couldn't find the meaning of "${word}".`;
  } else {
    console.log(result);

    wrapper.classList.add("active");

    let definitions = result[0].meanings[0].definitions[0],
      phonetics = `${result[0].meanings[0].partOfSpeech} ${result[0].phonetics[0].text}`,
      synonymWord = result[0].meanings[0];
    //Passing particular response to respective html element.

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText = definitions.definition;

    audio = new Audio(result[0].phonetics[0].audio);

    if (result[0].meanings[0].synonyms[0] === undefined) {
      synonymsList.parentElement.style.display = "none";
    } else {
      synonymsList.parentElement.style.display = "block";
      synonymsList.innerHTML = "";
      for (let i = 0; i < 2; i++) {
        // Getting max 2 synonyms.
        let tag = `<span onclick="search('${result[0].meanings[0].synonyms[i]}')">${result[0].meanings[0].synonyms[i]}</span>`;
        synonymsList.insertAdjacentHTML("beforeend", tag); // Listing all synonyms.
      }
    }
  }
}

function search(word) {
  searchInput.value = word;
  fetchApi(word);
}

//Fetch API function
function fetchApi(word) {
  infoText.innerHTML = `Searching the meaning of "${word}".`;

  let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(api).then((res) => res.json().then((result) => data(result, word)));
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
});

volume.addEventListener("click", () => {
  audio.play();
});

close.addEventListener("click", () => {
  searchInput.value = "";
});
