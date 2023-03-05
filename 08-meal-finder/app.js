const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultsHeading = document.getElementById('result-heading')
    single_mealEl = document.getElementById('single-meal');


// Functions ⚡️
function searchMeal(e){
    e.preventDefault();

    // Clear single meal
    single_mealEl.innerHTML = ``;

    // Get the Search term
    const term = search.value;
    
    //check if empty
    if(term.trim()){
        console.log(term);
        //www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            resultsHeading.innerHTML = `<h2>Search results for '${term}':</h2>`
            if(data.meals === null){
                resultsHeading.innerHTML = `<p>No results found. Please try again.</p>`
            } else {
                mealsEl.innerHTML = data.meals.map(meal =>
                    `<div class="meal">
                        <img src="${meal.strMealThumb}" alt="Meal Image" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                    `
                ).join('');
            }
            // Clear search text
            search.value = '';
        })
    } else {
        alert('Please enter a search term');
    }



}
// Fetch Meal by ID
function getMealById(mealid){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
    .then(res => res.json())
    .then(data =>{
        const meal = data.meals[0];
        addMealToDOM(meal);
    })
}

// Fetch Random Meal
function getRandomMeal(e){
    // Clear any previous searches
    mealsEl.innerHTML = '';
    resultsHeading.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data =>{
       const meal = data.meals[0];
       addMealToDOM(meal)

    })

}

function addMealToDOM(meal){
    // console.log(meal)
    const ingredients = [];
    for(let i = 1; i < 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }else{
            break;
        }
    }
    single_mealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>
    `
    // Scroll into view
    document.getElementById('single-meal').scrollIntoView({
        behavior:"smooth"
    })
}
// Event Listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click',e=>{
    /* We look at the composed path to find if a class exists, and if so
    * return a value only if the class is meal-info.
    */
    const mealInfo = e.composedPath().find(item =>{
        if(item.classList){
            return item.classList.contains('meal-info')
        } else{
            return false;
        }
    })
    // Get the meal info DATA attribute from the returned value
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
    
})