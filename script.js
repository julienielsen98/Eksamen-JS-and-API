let usersArray = [];
let ownCardArray = [];

const loadResults = async () => {
  const objects = await fetch(
    "https://randomuser.me/api/?page=2&results=100&seed=abc"
  );

  const users = await objects.json();

  users.results.forEach((users) => {
    usersClass = new Users(
      users.picture,
      users.name,
      users.gender,
      users.dob,
      users.location,
      users.email,
      users.phone
    );

    usersArray.push(usersClass);

    displayResults();
    displaySearchResults(usersArray);
  });
};

class Users {
  constructor(picture, name, gender, dob, location, email, phone) {
    this.picture = picture.medium;
    this.name = name.first;
    this.gender = gender;
    this.dob = dob.age;
    this.location = `${location.country} , ${location.city} - ${location.street.name},${location.street.number} `;
    this.email = email;
    this.phone = phone;
  }
}

//Searchbar

let searchResults = document.getElementById(`searchResults`);
const resultsList = document.createElement(`ul`);

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  searchResults.append(resultsList);
  searchResults.style.backgroundColor = "white";
  searchResults.style.width = "250px";
});

resultsList.addEventListener("mouseout", () => {
  resultsList.remove();
  searchResults.style.backgroundColor = null;
  searchResults.style.width = null;
});

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredResults = usersArray.filter((usersClass) => {
    return (
      usersClass.name.toLowerCase().includes(searchString) ||
      usersClass.gender.toLowerCase().includes(searchString) ||
      usersClass.location.toLowerCase().includes(searchString)
    );
  });
  displaySearchResults(filteredResults);
});

const displaySearchResults = (usersClass) => {
  const htmlString = usersClass
    .map((users) => {
      return ` 
       <p> ${users.name},
 ${users.dob}, ${users.gender} 
  ${users.location} - 
   mail: ${users.email} , Phone: ${users.phone} </p> - `;
    })
    .join("");
  resultsList.innerHTML = htmlString;
};

//Herosection

const highestRateList = document.getElementById(`highestRateList`);
const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", () => {
  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  const result = getRandomItem(usersArray);

  highestRateList.innerHTML = `<li class="cards" > <img src="${result.picture}" alt="users-images"/> 
      <h3> ${result.name},   ${result.dob} </h3> 
        <p> ${result.location} </p>
        <p> Mail: ${result.email} </p>
        <p> Phone: ${result.phone} </p>
       </li> `;
});

window.addEventListener("load", () => {
  loadResults();
});

function displayResults() {
  highestRateList.innerHTML = `<li class="cards" > <img src="${usersClass.picture}" alt="users-images"/> 
      <h3> ${usersClass.name},   ${usersClass.dob} </h3> 
        <p> ${usersClass.location} </p>
        <p> Mail: ${usersClass.email} </p>
        <p> Phone: ${usersClass.phone} </p>
       </li> 
       `;
}

//Herosection Slideshow

var i = 0;
var images = [];

var slideTime = 4000;

images[0] =
  "https://cdn.pixabay.com/photo/2016/11/01/10/29/dog-1787835_1280.jpg";
images[1] =
  "https://cdn.pixabay.com/photo/2017/03/27/13/23/dog-2178696_1280.jpg";
images[2] =
  "https://cdn.pixabay.com/photo/2022/02/09/20/52/labrador-retriever-7004193_1280.jpg";

function changePicture() {
  let section = document.querySelector("section");
  section.style.backgroundImage = "url(" + images[i] + ")";

  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }
  setTimeout(changePicture, slideTime);
}

window.onload = changePicture;

//Main; All users + list of favorites

const usersList = document.getElementById(`usersList`);

const favoriteList = document.getElementById(`favoriteList`);

let maleBtn = document.getElementById(`male`);
maleBtn.addEventListener("click", () => {
  displayUsers(`male`);
});
let femaleBtn = document.getElementById(`female`);
femaleBtn.addEventListener("click", () => {
  displayUsers(`female`);
});

function displayUsers(filter) {
  usersList.innerHTML = "";

  for (let i = 0; i < usersArray.length; i++) {
    let card = document.createElement("li");
    if (usersArray[i].gender === `${filter}`) {
      card.classList.add("cards");
      card.innerHTML = `<img src="${usersArray[i].picture}" alt="users-images"/> 
      <h3> ${usersArray[i].name},${usersArray[i].dob} </h3>
        <p> ${usersArray[i].location} </p>
        <p> Mail: ${usersArray[i].email}  </p>
        <p> Phone: ${usersArray[i].phone} </p>
         `;

      card.style.backgroundColor = `rgb(${Math.floor(
        Math.random() * 100 + 155
      )}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
        Math.random() * 100 + 155
      )})`;

      //MAP: Aware of issues warning about cookies, decided not to prioritize it, because thrid-party is not involved atm.
      //Used data "city" as referance on map, because API does not generate coordinates+adress+cities that matches a real adress.
      let mapsBtn = document.createElement("button");
      mapsBtn.classList.add("maps-btn");
      mapsBtn.innerHTML = "map";

      mapsBtn.addEventListener("mouseover", () => {
        let map = document.createElement("div");
        map.classList.add("map-container");
        card.append(map);
        map.innerHTML = ` <iframe
              width="300"
              height="200"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q= ${usersArray[i].location} &t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>`;

        map.addEventListener("mouseout", () => {
          map.remove();
        });
      });

      let favoriteBtn = document.createElement("button");
      favoriteBtn.classList.add("favorite-btn");
      favoriteBtn.innerText = "Favorite ";
      card.append(favoriteBtn, mapsBtn);
      usersList.append(card);

      favoriteBtn.addEventListener("click", () => {
        let moveBackBtn = document.createElement("button");
        moveBackBtn.innerText = "remove";
        favoriteBtn.remove();
        card.append(moveBackBtn);
        favoriteList.append(card);

        moveBackBtn.addEventListener("click", () => {
          usersList.append(card);
        });
      });
    }
  }
}

//Create own card

let inputContainer = document.getElementById("input-container");
let createUserBtn = document.createElement("button");
createUserBtn.innerText = "Add user";
let ownCardContainer = document.createElement("ul");
ownCardContainer.classList.add("ownCard");
inputContainer.append(createUserBtn, ownCardContainer);

createUserBtn.addEventListener("click", () => {
  addUser();
});

function addUser() {
  let inputImg = document.getElementById(`img-input`).value;
  let inputName = document.getElementById(`name-input`).value;
  let inputGender = document.getElementById(`gender-input`).value;
  let inputAge = document.getElementById(`dateOfBirth-input`).value;
  let inputLocation = document.getElementById(`location-input`).value;
  let inputEmail = document.getElementById(`email-input`).value;
  let inputPhone = document.getElementById(`phone-input`).value;
  let inputColor = document.getElementById(`color-input`).value;

  const newUser = {
    picture: inputImg,
    name: inputName,
    gender: inputGender,
    dob: inputAge,
    location: inputLocation,
    email: inputEmail,
    phone: inputPhone,
    color: inputColor,
  };

  if (newUser.picture === "" && newUser.gender === "male") {
    newUser.picture = `https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113__340.png`;
  }
  if (newUser.picture === "" && newUser.gender === "female") {
    newUser.picture = `https://cdn.pixabay.com/photo/2016/04/26/07/20/woman-1353803__340.png`;
  }

  if (newUser.name === "" || newUser.gender === "") {
    alert("Name & gender must be filled in");
  } else {
    usersArray.unshift(newUser);
    displayUsers(usersArray);
    ownCardArray.push(newUser);

    console.log(ownCardArray);

    showCard();
  }
}

function showCard() {
  ownCardContainer.innerHTML = "";
  usersList.innerHTML = "";

  for (let i = 0; i < ownCardArray.length; i++) {
    ownCardContainer.innerHTML += `<li class="cards" style=background-color:${ownCardArray[i].color};> <img src="${ownCardArray[i].picture}" alt="users-images"/> 
      <h3> ${ownCardArray[i].name},${ownCardArray[i].dob} </h3>
        <p> ${ownCardArray[i].location} </p>
        <p> Mail: ${ownCardArray[i].email}  </p>
        <p> Phone: ${ownCardArray[i].phone} </p>
        <button onclick="deleteCard(${i})"> delete </button>
        </li>
       `;
  }
}

function deleteCard(i) {
  ownCardArray.splice(i, 1);
  usersArray.splice(i, 1);
  showCard();
}

//Quiz

let body = document.querySelector("body");
let quizBtn = document.getElementById("quizBtn");
let quizWrapper = document.getElementById("quizWrapper");
let quizQuestion = document.getElementById("quiz-question");

quizBtn.onclick = function () {
  body.replaceWith(quizWrapper);

  let submitBtn = document.createElement("button");

  submitBtn.innerText = "Check results";

  quizWrapper.append(submitBtn);

  submitBtn.id = "submit";

  function generateQuiz(questions, quizContainer, resultsContainer, submitBtn) {
    function showQuestions(questions, quizContainer) {
      var output = [];
      var answers;

      for (var i = 0; i < questions.length; i++) {
        answers = [];

        for (letter in questions[i].answers) {
          answers.push(
            "<label>" +
              '<input type="radio" name="question' +
              i +
              '" value="' +
              letter +
              '">' +
              letter +
              ": " +
              questions[i].answers[letter] +
              "</label>"
          );
        }

        output.push(
          '<div class="question">' +
            questions[i].question +
            "</div>" +
            '<div class="answers">' +
            answers.join("") +
            "</div>"
        );
      }

      quizContainer.innerHTML = output.join("");
    }

    showQuestions(questions, quizContainer);

    function showResults(questions, quizContainer, resultsContainer) {
      var answerContainers = quizContainer.querySelectorAll(".answers");

      var userAnswer = "";
      var numCorrect = 0;

      for (var i = 0; i < questions.length; i++) {
        userAnswer = (
          answerContainers[i].querySelector(
            "input[name=question" + i + "]:checked"
          ) || {}
        ).value;

        if (userAnswer === questions[i].correctAnswer) {
          numCorrect++;
          answerContainers[i].style.color = "lightgreen";
        } else {
          answerContainers[i].style.color = "red";
        }
      }

      resultsContainer.innerHTML = numCorrect + " out of " + questions.length;
    }

    submitBtn.onclick = function () {
      showResults(questions, quizContainer, resultsContainer);
    };

    showQuestions(questions, quizContainer);
  }
  var myQuestions = [
    {
      question: "How many teeth does an adult dog have?",
      answers: {
        a: "51",
        b: "42",
        c: "27",
      },
      correctAnswer: "b",
    },
    {
      question: "Which sense do dogs use most?",
      answers: {
        a: "Sense of sight",
        b: "Sense of hearing",
        c: "Sense of smell",
      },
      correctAnswer: "c",
    },
    {
      question:
        "What percentage of all dogs actually sleep in their owners’ bed?",
      answers: {
        a: "45%",
        b: "20%",
        c: "70%",
      },
      correctAnswer: "a",
    },
  ];
  var quizContainer = document.getElementById("quizContainer");
  var resultsContainer = document.createElement("p");
  quizWrapper.append(resultsContainer);

  generateQuiz(myQuestions, quizContainer, resultsContainer, submitBtn);

  let returnBtn = document.createElement("button");
  returnBtn.innerText = "Go back";

  quizWrapper.append(returnBtn);

  returnBtn.addEventListener("click", returnToMain);
  function returnToMain() {
    quizWrapper.replaceWith(body);
    returnBtn.remove();
    submitBtn.remove();
    resultsContainer.remove();
  }
};
