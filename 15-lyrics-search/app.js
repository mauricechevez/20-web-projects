const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");
const apiURL = "https://api.lyrics.ovh";

// Event Listeners

async function searchSongs(term) {
  // async await syntax
  const response = await fetch(`${apiURL}/suggest/${term}`);
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
    `
  });
}

form.addEventListener("submit", (e) => {
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("Please enter a search term");
  } else {
    e.preventDefault();
    searchSongs(searchTerm);
  }
});
