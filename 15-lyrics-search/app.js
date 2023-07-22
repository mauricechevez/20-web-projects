const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const apiURL = 'https://api.lyrics.ovh';

// Event Listeners

async function searchSongs(term) {
  // async await syntax
  const response = await fetch(`${apiURL}/suggest/${term}`);
  const data = await response.json();

  showData(data);
}
// Get Prev and Next results - songs
async function getMoreSongs(url) {
  // CORS Anywhere used to get around the CORS error
  const corsFullURL = `https://cors-anywhere.herokuapp.com/${url}`;
  const response = await fetch(corsFullURL);
  const data = await response.json();
  showData(data);
}

function showData(data) {
  let output = ``;
  data.data.forEach((song) => {
    output += `
        <li>
            <span><strong>
                ${song.artist.name}
            </strong> - ${song.title}
            
            </span>
            <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>
        `;
    result.innerHTML = `
    <ul class="songs">
        ${output}
    </ul>
    `;

    // Conditions
    if (data.prev || data.next) {
      more.innerHTML = `
        ${
          data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Previous</button>`
            : ''
        }
        ${
          data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ''
        }
    `;
    } else {
      more.innerHTML = 'huh?';
    }
  });
}

async function getLyrics(artist, songTitle) {
  const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await response.json();
  const lyrics = data.lyrics.replace('/(\r\n|\r|\n)/g', `<br>`);
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>
  `;
  more.innerHTML = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert('Please enter a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// Get Lyrics button click
result.addEventListener('click', (e) => {
  const clickedElement = e.target;
  if (clickedElement.tagName === 'BUTTON') {
    const artist = clickedElement.getAttribute('data-artist');
    const songTitle = clickedElement.getAttribute('data-songtitle');
    getLyrics(artist, songTitle);
  }
});
