let allFood = document.querySelector(".allFood");
let foodsAdd = [];
let placeSpan = document.querySelector(".cart span");
let span = 0;
let dropdown = document.querySelector(".dropdown-content");
let shop = document.getElementById("shop");

if(localStorage.length > 0){
    let dataStorage = JSON.parse(localStorage.getItem("foodsAdd"));
    foodsAdd = foodsAdd.concat(dataStorage);
    console.log(foodsAdd);
    span = foodsAdd.reduce((total, obj) => total + obj.nbr, 0);
    placeSpan.innerHTML = span;
    //ajouter a cart
    afficherShopFood();
}

function afficherShopFood(){
    dropdown.innerHTML = ""; // Clear the dropdown content before adding new items
    let total = 0;
    foodsAdd.forEach(elm =>{
        total += elm.price * elm.nbr;
        dropdown.innerHTML += `<div class="foodShop">
                                <img src=${elm.image} alt="" class="imgShop"><h4>${elm.nbr}</h4>
                                <h3>${elm.nom}</h3>
                                <h3>${elm.price}</h3>
                                <img src="image/delete.png" alt="" id="delete">
                            </div>`;
    })
    dropdown.innerHTML += `<div class="foodShop">
                            <h2>TOTAL: $${total}</h2>
                        </div>`;
    
    let btnSupprimer = document.querySelectorAll("#delete");
    console.log(btnSupprimer);

    //suprimer un element dans dropdown et localstorige
    btnSupprimer.forEach(elm =>{
        elm.addEventListener("click", function(){
            foodsAdd.forEach((food,index)=>{
                if(food.nom == elm.parentElement.querySelector("h3").innerHTML){
                    foodsAdd.splice(index,1);
                    localStorage.setItem("foodsAdd", JSON.stringify(foodsAdd));
                    afficherShopFood();
                    span = foodsAdd.reduce((total, obj) => total + obj.nbr, 0);
                    placeSpan.innerHTML = span;
                }
            })
        })
    })
}

fetch("restaurant.json")
    .then(rep => rep.json())
    .then(data =>{
        console.log(data);

        //afficher all foods
        data.forEach(elm =>{
            allFood.innerHTML += `<div class="food">
                                    <div class="img">
                                        <img src=${elm.image} alt="">
                                    </div>
                                    <h1>${elm.name}</h1>
                                    <h3>$<span>${elm.price}</span></h3>
                                    <button class="btn">Add To Cart</button>
                                </div>`;
        })

        let allButtons = document.querySelectorAll(".btn");
        console.log(foodsAdd);
        allButtons.forEach(btn =>{
            btn.addEventListener("click", function(){
                let obj = {
                    image: btn.parentElement.querySelector("img").src,
                    nom : btn.parentElement.querySelector("h1").innerHTML,
                    price : parseInt(btn.parentElement.querySelector("h3 span").innerHTML),
                    nbr : 1
                }
            
                let estTrouver = false; 
                foodsAdd.forEach(elm=>{
                    if(elm.nom == obj.nom){
                        elm.nbr++;
                        estTrouver = true;
                        localStorage.setItem("foodsAdd", JSON.stringify(foodsAdd));
                        console.log("repas est modifiee");
                    }
                })
                if(!estTrouver){
                    foodsAdd.push(obj);
                    localStorage.setItem("foodsAdd", JSON.stringify(foodsAdd));
                    console.log("repas est ajoutee");
                }
                console.log(foodsAdd);

                span = foodsAdd.reduce((total, obj) => total + obj.nbr, 0);
                console.log(span);
                placeSpan.innerHTML = span;

                //ajouter a cart
                afficherShopFood();
                
            })
        })

        shop.addEventListener("click",function(){
            dropdown.classList.toggle("toggle");
        })

    })
