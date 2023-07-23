## Relaxer App

A relaxing breathing app with a visual director to tell you when to breathe in, hold and breathe out

## Project Specifications

- Create circle and gradient circle with CSS
- Create and animate pointer (Small circle)
- Create grow and shrink animations
- Add JavaScript to create the breath animation effect

## Notable JavaScript
A few bits of code of note.

### Timing of breathe
To get the correct timing for the breathing in and out animations in Javascript, the following code was used:

```js
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
```

This would lead to `breathTime` equaling 3000ms (3 seconds) and `holdTime` to equal 1500ms (1.5 seconds). 
Each breath in and out should equal to 3 seconds (6 seconds total) and hold breath for 1.5 seconds, to total 7.5 seconds.

Dividing the `totalTime` to 5 parts allows for the correct time calculation to occur for each action.

