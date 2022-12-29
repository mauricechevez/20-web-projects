## DOM Array Methods

Project to teach high order array methods and DOM manipulation

## Project Specifications

- Fetch random users from the [randomuser.me](https://randomuser.me) API
- Use forEach() to loop and output user/wealth
- Use map() to double wealth
- Use filter() to filter only millionaires
- Use sort() to sort by wealth
- Use reduce() to add all wealth

## Functions used

## The "every()" high order function

I wanted to check if the array contained any millionares before processing them (filter) to display on the DOM. Without a way to check this, it allows the "Show Only Millionares" button to remove all the users from the list, essentially clearing it out if their wealth value was less than 1,000,000. 

I found the `every()` method to be useful for this task. Here's a quick demo, and below will be the actual function I modified to achieve this task.

**Demo**

```js
function isBelowThreshold(value){
  return value.money < 100;
}
const array1 = [{money:10},{money:5},{money:55}
];

console.log(array1.every(isBelowThreshold));
// expected output: true
```

**showOnlyMillionares()**
```js
function showOnlyMillionares(){
    // Check if any millionares exist:
    if(data.every(isBelowThreshold)){
        alert('No Millionares exist')
    } else {
        data = data.filter(user =>{
        return user.money > 1000000;
    })
    updateDOM();
    }
}

// Used for the every() method
function isBelowThreshold(value){
  return value.money < 1000000;
}
```

The checks above now prevent the screen from clearing (filtering) the DOM if no millionares exist on the list (the `data` array)