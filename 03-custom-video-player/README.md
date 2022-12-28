## Custom Video Player

Custom video player using the HTML5 video element and it's JavaScript API with a custom design

## Project Specifications

- Display custom video player styled with CSS
- Play/pause
- Stop
- Video progress bar
- Set progress bar time
- Display time in mins and seconds

## Note about aspect ratio
The tutorial does not display this behavior, but Chrome browser shows the original poster/picture in its original aspect ratio, while Firefox does not. In other words, if the picture is 4:3 or any other ratio/size, the video player at first display in that aspect ratio until the user begins to play the video, which will show in whatever aspect ratio the video player is.
### Solution to Aspect Ratio issue
You can use the CSS `aspect-ratio` property to force Chrome to use a specified aspect ratio when it loads the video player, so the poster/picture you set in the `video` tag attribute will be displayed as you desired. 

In the code below, for me, **16/10** looked the best, although you may of course use 16/9, or any other ratio you desire.
```css
.screen{
    cursor: pointer;
    background-color: #000;
    width: 60%;
    height: auto;
    aspect-ratio: 16/10;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
```
