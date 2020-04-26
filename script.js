const words = [
  "cat", "dog", "hat", "rat", "book", "hook", "picture", "music",
  "robot", "knight", "sorcerer", "man", "bird", "lion", "boy", "girl",
  "woman", "tree", "tiger", "wolf", "bear", "snake", "reptile", "fox", "rabbit",
  "wizard", "barbarian", "skeleton", "alien", "mutant", "moose", "bull", "cow", "crow",
  "petrol", "oil", "gas", "refrigerator"
];


let displayedWords = [];

const generateWord = () => {
  const word = document.createElement("div");
  word.className = "word";
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  for (let i = 0; i < randomWord.length; i++) {
    word.innerHTML  +=  `<span>${randomWord[i]}</span>`;
  }
  document.querySelector("#arena").appendChild(word);
  displayedWords.push({name:randomWord, count:0});
}

generateWord();
generateWord();
generateWord();
console.log(displayedWords);
//setTimeout(generateWord, 1000);

const typeLetters = (event) => {
  const currentWords = document.querySelectorAll(".word");
  for (let a = 0; a < displayedWords.length; a++) {
      if (event.key === displayedWords[a].name[displayedWords[a].count]) {
          currentWords[a].childNodes[displayedWords[a].count].style.color = "red";
          currentWords[a].childNodes[displayedWords[a].count].style.fontWeight = "bold";
          displayedWords[a].count += 1;
        } else {
          displayedWords[a].count = 0;
          console.log(displayedWords[a]);
          for (let b = 0; b < document.querySelectorAll(".word")[a].childNodes.length; b++) {
             document.querySelectorAll(".word")[a].childNodes[b].style.color = "black";
             document.querySelectorAll(".word")[a].childNodes[b].style.fontWeight = "normal";
           }
        }
        if (displayedWords[a].count === displayedWords[a].name.length) {
          document.querySelectorAll(".word")[a].style.backgroundColor = "black";
          setTimeout(() => {
            document.querySelector("#arena").removeChild(document.querySelectorAll(".word")[a]);
            displayedWords = displayedWords.filter(word => word.name != displayedWords[a].name);
            console.log(displayedWords);
          }, 1000);
        }
  }



}

window.addEventListener("keypress", typeLetters);
