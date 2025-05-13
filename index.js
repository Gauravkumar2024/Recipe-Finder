const inputBox=document.querySelector('#searchBox')
const searchButton=document.querySelector('#searchbtn')
const reciepeContainer=document.querySelector('.container')
const reciepeClose=document.querySelector('.close-button')
const reciepeData=document.querySelector('.reciepe-details-data')
const reciepeDetailsContainer=document.querySelector('.reciepe-details-container')

// functio for reciepe
 async function getRecipe(dish) {
    console.log(dish);
    reciepeContainer.innerHTML="<h2>Fetching Recipes...</h2>"
    
    try {
        const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`).then((res)=>{return res.json()})
        console.log(data.meals[0]);
        let result=''
        inputBox.value=""
        reciepeContainer.innerHTML=``
       data.meals.forEach(meal => {
           const para = document.createElement("div");
           para.innerHTML = ` <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class='cards'>
           <h2>${meal.strMeal}</h2>
           <p>${meal.strCategory}</P>
           <p> <span>${meal.strArea}</span> dish</p>
           `
   
           const button=document.createElement('button')
           button.textContent='view reciepe'
           para.appendChild(button)
           para.classList.add('recipe')
           reciepeContainer.appendChild(para);
   
   
           button.addEventListener('click',()=>{
               viewData(meal)
           }
           )
           
       });
    } catch (error) {
        
        reciepeContainer.innerHTML=`
         <img src="chef.jpg" alt="error" class="error-mg">
        `
    }
     
}
 



const showIngredients=(list)=>{
    // console.log(list);
    let IngredientList=""
    for(i=1;i<=20;i++)
    {
        const Ingredient=list[`strIngredient${i}`];
        if (Ingredient) {
            const measurements=list[`strMeasure${i}`]
            IngredientList +=`<li>${measurements} ${Ingredient}</li>`
        } else {
         break   
        }
    }
    
    return IngredientList
}

const viewData=(data)=>{
   reciepeData.innerHTML=`
   <h2 class="ingredientName">${data.strMeal}</h2>
   <h3>Ingredients:</h3>
   <ul class="reciepeUL">${showIngredients(data)}</ul>
   <div class="instruction">
        <h3>how to make?</h3>
        <p>${data.strInstructions}</p>
   </div>
   `
   reciepeDetailsContainer.style.display='block'
}

searchButton.addEventListener('click',(e)=>{
    e.preventDefault()
    // console.log('button click');
    const getData=inputBox.value.trim()
    getRecipe(getData)
})
// close popup
reciepeClose.addEventListener('click',()=>
{
    reciepeDetailsContainer.style.display='none'
})