## Speak Number Guessing Game

Number guessing game where you speak your guess into the microphone using the speech recognition API

## Project Specifications

- Display UI directing user to speak guess
- Implement speech recognition to listen to mic
- Process user's guess and match
- Let user know higher, lower, match or not a number

## Current Issues

### Single digits
Any number from 1 - 9 is being recognized as a word and not a number, therefore if the random number is 8, the speech recognition will detect "eight" which will prompt the message "This is not a valid number".

```
SpeechRecognitionAlternative {transcript: 'two', confidence: 0.009999999776482582} SpeechRecognitionAlternative {transcript: 'three', confidence: 0.009999999776482582}
SpeechRecognitionAlternative {transcript: 'four', confidence: 0.009999999776482582}
SpeechRecognitionAlternative {transcript: 'five', confidence: 0.009999999776482582}
SpeechRecognitionAlternative {transcript: 'six', confidence: 0.009999999776482582}
SpeechRecognitionAlternative {transcript: 'seven', confidence: 0.009999999776482582}
```

**Possible Solution** - Add a switch statement to recognizes those words and return the converted number. This functionality will need to be added through Javascript.


## Issues Resolved
I came across a few issues here which I want to document how it was fixed.

### Not recognizing certain numbers
At first, multiples of 10 (10, 20, 30, 40....100) were not being recognized by the speech recognition functionality.

In an effort to fix this since it wasn't happening in the tutorial, I came across [this](https://www.rst.software/blog/speech-recognition-in-javascript) article which talked about a few of the options you have to add to the SpeechRecogntion object, namely the `maxAlternatives` and `interimResults` properties. 

I also found this [Web Speech API Demonstration](https://www.google.com/intl/en/chrome/demos/speech.html) that seemed to show different behavior from what I saw. First off, when I would say the multiples of 10, they would appear on the screen. I also noticed it would add one number, then another, onto the screen as I uttered the number. For example, if I said "60", The 6 would appear, then the 0 in quick succession. That wasn't happening in my app, so I added the following options based on the previous article.

```js
let recognition = new window.SpeechRecognition();
recognition.maxAlternatives = 2;
recognition.interimResults = true;

```

I think what really did it was the `interimResults` option, as after that was added, the same behavior I saw from Google's demo site was present on my page now - as I would say the number 10, the 1, then 0 would appear on the screen.

## Future plans
I want to add the following to this app:
- Add a button to start speech recognition.
- Add a button to start speech recognition.