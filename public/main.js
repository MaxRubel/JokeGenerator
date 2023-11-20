// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
// import { render } from 'sass';

const init = () => {
  const app = document.getElementById('app');

  let setup;
  let punchLine;
  let i = 0;
  let dataArray;
  const renderDom = () => {
    app.innerHTML = `        
    <h2 id="jokeBody"></h2>
    <h3 id="punchLineBody"></h3>
    <button type="button" class="btn btn-success" id="jokeLol">Click me to hear a joke.</button></div> `;
  };

  renderDom();

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
        dataArray = data;
        setup = data.setup;
        punchLine = data.delivery;
      })
      .catch(reject);
  });

  // getRequest();
  getRequest();

  const JokeSequence = () => {
    if (i === 1) {
      console.warn(i);
      jokeBody.innerHTML = setup;
      jokeButton.innerHTML = 'Get the Punchline.';
    }
    if (i === 2) {
      console.warn(i);
      punchLineBody.innerHTML = punchLine;
      jokeButton.innerHTML = 'Lol. Hear another one?';
    }
    if (i === 3) {
      console.warn(i);
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
    console.warn(dataArray);
    i += 1;
    JokeSequence();
  });
};

init();
