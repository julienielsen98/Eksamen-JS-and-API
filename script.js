let usersArray = [];
let ownCardArray = [];

const loadResults = async () => {
  const objects = await fetch(
    "https://randomuser.me/api/?page=3&results=10&seed=abc"
  );

  const users = await objects.json();
  console.log("header array:", usersArray);

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

let searchResults = document.getElementById(`searchResults`);
const resultsList = document.createElement(`ul`);

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  searchResults.append(resultsList);
});

resultsList.addEventListener("mouseout", () => {
  resultsList.remove();
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
 ${users.dob}, ${users.gender} -
  ${users.location} - 
   mail: ${users.email} , Phone: ${users.phone} </p> - `;
    })
    .join("");
  resultsList.innerHTML = htmlString;
};

const randomeList = document.getElementById(`randomeList`);
const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", () => {
  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  const result = getRandomItem(usersArray);

  randomeList.innerHTML = `<li class="cards" > <img src="${result.picture}" alt="users-images"/> 
      <h3> ${result.name},   ${result.dob} </h3> 
        <p> ${result.location} </p>
        <p> Mail: ${result.email} </p>
        <p> Phone: ${result.phone} </p>
       </li> `;
});

window.addEventListener("load", (event) => {
  loadResults();
});

function displayResults() {
  randomeList.innerHTML = `<li class="cards" > <img src="${usersClass.picture}" alt="users-images"/> 
      <h3> ${usersClass.name},   ${usersClass.dob} </h3> 
        <p> ${usersClass.location} </p>
        <p> Mail: ${usersClass.email} </p>
        <p> Phone: ${usersClass.phone} </p>
       </li> 
       `;
}

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
    let li = document.createElement("li");
    if (usersArray[i].gender === `${filter}`) {
      li.classList.add("cards");
      li.innerHTML = `<img src="${usersArray[i].picture}" alt="users-images"/> 
      <h3> ${usersArray[i].name},${usersArray[i].dob} </h3>
        <p> ${usersArray[i].location} </p>
        <p> Mail: ${usersArray[i].email}  </p>
        <p> Phone: ${usersArray[i].phone} </p>
         `;
      let mapsBtn = document.createElement("button");
      mapsBtn.classList.add("maps-btn");
      mapsBtn.innerHTML = "map";

      mapsBtn.addEventListener("mouseover", () => {
        let map = document.createElement("div");
        map.classList.add("map-container");
        li.append(map);
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
      li.append(favoriteBtn, mapsBtn);
      usersList.append(li);

      favoriteBtn.addEventListener("click", () => {
        let moveBackBtn = document.createElement("button");
        moveBackBtn.innerText = "remove";
        favoriteBtn.remove();
        li.append(moveBackBtn);
        favoriteList.append(li);

        moveBackBtn.addEventListener("click", () => {
          usersList.append(li);
        });
      });
    }
  }
}

let inputContainer = document.getElementById("input-container");
let createUserBtn = document.createElement("button");
createUserBtn.innerText = "Add user";
let ownCardContainer = document.createElement("ul");
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

  const newUser = {
    picture: inputImg,
    name: inputName,
    gender: inputGender,
    dob: inputAge,
    location: inputLocation,
    email: inputEmail,
    phone: inputPhone,
  };
  if (newUser.picture === "" || newUser.gender === "male") {
    newUser.picture = `https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113__340.png`;
  }
  if (newUser.picture === "" || newUser.gender === "female") {
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

let deleteBtn = document.createElement("button");
deleteBtn.innerText = "remove";

function showCard() {
  ownCardContainer.innerHTML = "";
  usersList.innerHTML = "";

  for (let i = 0; i < ownCardArray.length; i++) {
    ownCardContainer.innerHTML += `<div class="cards"> <img src="${ownCardArray[i].picture}" alt="users-images"/> 
      <h3> ${ownCardArray[i].name},${ownCardArray[i].dob} </h3>
        <p> ${ownCardArray[i].location} </p>
        <p> Mail: ${ownCardArray[i].email}  </p>
        <p> Phone: ${ownCardArray[i].phone} </p> </div>
       `;

    ownCardContainer.append(deleteBtn);
  }
}

deleteBtn.addEventListener("click", () => {
  deleteCard();
});

function deleteCard(i) {
  ownCardArray.splice(i, 1);
  usersArray.splice(i, 1);

  showCard();
}

console.log("OwnC array:", ownCardArray);
console.log("Users array:", usersArray);

/*----------QUIZ------------------------*/
let body = document.querySelector("body");
let quizButton = document.getElementById("quizButton");
let Quiz = document.getElementById("Quiz");
let quizQuestion = document.getElementById("quiz-question");

quizButton.onclick = function () {
  body.replaceWith(Quiz);

  let submitButton = document.createElement("button");

  submitButton.innerText = "Sjekk resultatet";

  Quiz.append(submitButton);

  submitButton.id = "submit";

  function generateQuiz(
    questions,
    quizContainer,
    resultsContainer,
    submitButton
  ) {
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

    submitButton.onclick = function () {
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
  Quiz.append(resultsContainer);

  generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

  let returnBtn = document.createElement("button");
  returnBtn.innerText = "Tilbake";

  Quiz.append(returnBtn);

  returnBtn.addEventListener("click", returnToMain);
  function returnToMain() {
    Quiz.replaceWith(body);
    returnBtn.remove();
    submitButton.remove();
    resultsContainer.remove();
  }
};
