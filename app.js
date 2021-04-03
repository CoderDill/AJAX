async function getData() {
  const planets = await axios.get("https://swapi.dev/api/planets/");
  console.log(planets);
  const { next, results } = planets.data;
  console.log(next);
  for (let planet of results) {
    console.log(planet.name);
  }
  const res2 = await axios.get(next);
  const results2 = res2.data.results;
  for (let planet of results2) console.log(planet.name);
}

async function getLaunches() {
  const res = await axios.get(
    "https://api.spacexdata.com/v3/launches/upcoming"
  );
  renderLaunches(res.data);
}

function renderLaunches(launches) {
  const ul = document.querySelector("#launches");
  for (let launch of launches) {
    ul.append(makeLaunchLI(launch));
  }
}

function makeLaunchLI(launch) {
  const newLi = document.createElement("li");
  const mission = document.createElement("B");
  mission.innerText = launch.mission_name;
  newLi.append(mission);
  newLi.innerHTML += ` - ${launch.rocket.rocket_name}`;
  return newLi;
}

const btn = document.querySelector("#getLaunches");
btn.addEventListener("click", getLaunches);

async function getRandomDog() {
  const dog = await axios.get("https://dog.ceo/api/breeds/image/random");
  console.log(dog);
  const image = document.querySelector("#dog");
  image.src = dog.data.message;
}

async function getDogByBreed(breed) {
  try {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    const res = await axios.get(url);
    console.log(res);
    const image = document.querySelector("#dog");
    image.src = res.data.message;
  } catch (e) {
    alert("breed not found, but enjoy this random dog.");
    getRandomDog();
  }
}

const form = document.querySelector("#searchForm");
const input = document.querySelector("#search");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  getDogByBreed(input.value);
  input.value = "";
});

async function getJoke(firstName, lastName) {
  let res = await axios.get(`http://api.icndb.com/jokes/random`, {
    params: { firstName, lastName },
  });
  console.log(res.data.value.joke);
}

getJoke('Matt', 'Dillon')