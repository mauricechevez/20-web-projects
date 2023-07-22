## LyricsSearch App

Find songs, artists and lyrics using the [lyrics.ovh](https://lyrics.ovh) API

## Project Specifications

- Display UI with song/artist input
- Fetch songs/artists and put in DOM
- Add pagination
- Add get lyrics functionality and display in DOM


## Notable Javascript

I currently don't use APIs much, so I typically forget the syntax. Just noting the differences between the `.then()` and `async` + `await` methods of doing this

### .then() Syntax
```js
 .then() syntax
   fetch(`${apiURL}/suggest/${term}`)
     .then((res) => res.json())
     .then((data) => console.log(data));
```

```js
  const response = await fetch(`${apiURL}/suggest/${term}`);
  const data = await response.json();
  console.log(data);

```

### Using the .map() syntax for song listings

🛑 Please update this description 🛑

```js
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
        .join('')}
    </ul>
  `;
```

### Using Regular Expression to find line breaks and carriage returns

When the lyrics come in, they have line break and carriage return characters. This regex allows for searching for any of these and replace them with the `<br>` HTML tag to replicate the line breaks in HTML.

```js
const lyrics = data.lyrics.replace('/(\r\n|\r|\n)/g', `<br>`);
```