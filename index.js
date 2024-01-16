
let dishesContainer = document.querySelector("#dishesContainer");

//fetch data
fetch("data.json")
.then(res => res.json())
.then(data => { 
    //creates cards for every dish
    data.dishes.forEach(dish => {
        createCard(dish);
       });
    
    //logic that handles the button filtering
    /****************************************/
   let buttons = document.querySelectorAll('.btn-group');

   buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        dishesContainer.innerHTML = '';
        if(e.target.value != 'all') {
            let filteredDishesArr = data.dishes.filter(function (dish) {
                return dish.category == e.target.value;
            })

            filteredDishesArr.forEach(dish => createCard(dish));
        } else {
            data.dishes.forEach(dish => {
                createCard(dish);
            });
        }    
    })
   });

    /*logic that handles the search bar filtering*/
    /*********************************************/
    const searchInput = document.querySelector("[data-search]");
    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase().trim(); //making the user input better to work with
        const cards = dishesContainer.querySelectorAll("div"); // a nodeList of all the cards
        cards.forEach((card) => {
          //hides card only if doesn't match user input by using .includes()
          const title = card.querySelector("h4").textContent;
          const isVisible = title.toLowerCase().includes(value);
          card.classList.toggle("hide", !isVisible);
        });
      });
})

function createCard(dish) {
    let dishCard = document.createElement('div');
    let name = document.createElement('h4');
    name.textContent = dish.dish_name;
    dishCard.classList.add('container');
    dishCard.appendChild(name);
    dishesContainer.appendChild(dishCard);
}