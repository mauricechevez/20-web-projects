## Hangman Game

Select a letter to figure out a hidden word in a set amount of chances

## Project Specifications

- Display hangman pole and figure using SVG
- Generate a random word
- Display word in UI with correct letters
- Display wrong letters
- Show notification when select a letter twice
- Show popup on win or lose
- Play again button to reset game


## Displaying the Hangman Parts
This part was confusing to me until I broke it down. 
1. We're using `figureParts` variable to contain the SVG elements that make up the Hangman's body. (queryselectorall)
2. We loop through this variable to pass through each of them and change their display property.
3. The `errors` variable contains the amount of array elements in the `wrongletters` array. We get this by using the `.length` method
4. We compare the amount of `wrongletters` to the index **of each** SVG element by using the `index` parameter as part of the loop
5. To break down that part of the loop, we'll go through a scenario:
   1. `wrongletters` array is ["a"], which means length of 1. Therefore the `errors` variable in the loop is equal to 1.
   2. We know `figureParts` will always have a length of 6, so it will be index 0 through 5.
   3. Is 1 less than 6? Yes. Display the part. Hide the rest.
   4. `wrongletters` now has another value. ["a","z"]
   5. Is 1 less than 6? Yes. Is 2 less than 6? Yes. Display 2 parts, hide the rest.
   6. `wrongletters` now has 3 values. ["a","z","r"]
   7. Is 1 less than 6? Yes. Is 2 less than 6? Yes. Is 3 less than 6? Yes. Display 3 parts. hide the rest.

```javascript
// Display each part of the hangman
    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length;
        if(index < errors){
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })
```