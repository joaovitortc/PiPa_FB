
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
          const title = card.querySelector(".card-title").textContent;
          const isVisible = title.toLowerCase().includes(value);
          card.classList.toggle("hide", !isVisible);
        });
      });
})

    function createCard(dish) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '18rem';
    
        const cardImage = document.createElement('img');
        cardImage.className = 'card-img-top';
        cardImage.src = dish.dish_img; 
        cardImage.alt = 'Card image cap';
    
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
    
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = dish.dish_name;
    
        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = "Some quick example text to build on the card title and make up the bulk of the card's content.";
    
        // Appending elements to build the card
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
    
        card.appendChild(cardImage);
        card.appendChild(cardBody);
    
        dishesContainer.appendChild(card);
        return card;
      }
