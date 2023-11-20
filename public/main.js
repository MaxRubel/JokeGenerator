// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
// import { render } from 'sass';

const htmlStructure = () => {
  const app = document.getElementById('app');
  app.innerHTML = `        
    <h2 id="jokeBody"></h2>
    <h3 id="punchLineBody"></h3>
    <button type="button" class="btn btn-success" id="jokeLol">Click me to hear a joke.</button></div> `;
};

const events = () => {
  let setup;
  let punchLine;
  let i = 0;
  const punchLineBody = document.getElementById('punchLineBody');
  const jokeBody = document.getElementById('jokeBody');
  const jokeButton = document.getElementById('jokeLol');

  const endpoint = 'https://v2.jokeapi.dev/joke/Any?format=json&safe-mode&type=twopart';
  const getRequest = () => new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
        setup = data.setup;
        punchLine = data.delivery;
      })
      .catch(reject);
  });

  getRequest();

  const JokeSequence = () => {
    if (i === 1) {
      setTimeout(() => {
        jokeBody.innerHTML = setup;
        jokeButton.innerHTML = 'Get the Punchline.';
      }, 200);
    }
    if (i === 2) {
      setTimeout(() => {
        punchLineBody.innerHTML = punchLine;
        jokeButton.innerHTML = 'Lol. Hear another one?';
      }, 200);
    }
    if (i === 3) {
      getRequest();
      i = 0;
      setup = '';
      punchLine = '';
      jokeBody.innerHTML = '';
      punchLineBody.innerHTML = '';
      jokeButton.innerHTML = 'Click me to hear a joke';
      console.warn(i);
    }
  };

  document.getElementById('jokeLol').addEventListener('click', () => {
    i += 1;
    JokeSequence();
  });
};
const startApp = () => {
  htmlStructure();
  events();
};

startApp();
