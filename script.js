async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

let offer = [{
        "name": "Burrito Mexican Brisket",
        "description": "mit zartem Mexican Brisket, frischem Koriander Limetten Reis, duftendem Weizentortilla, cremiger Frijoles Refritos, fruchtigem Pico de Gallo, zartschmelzendem Käse und milder Sour Cream",
        "image": "images/burrito1.png",
        "price": 10.99,
        "amount": 1,
        "total": 11.99
    },
    {
        "name": "Quesadilla Pulled Chicken Tinga",
        "description": "mit duftendem Weizentortilla, spicy Pulled Chicken Tinga, zartschmelzendem Käse, würziger Guacamole, fruchtigem Pico de Gallo, würziger Guacamole, cremiger Frijoles Refritos, spritziger Limette, Salz und Pfeffer",
        "image": "images/burrito1.png",
        "price": 6.99,
        "amount": 1,
        "total": 7.99
    },
    {
        "name": "Bowl Chicken Tinga",
        "description": "mit frischem Koriander Limetten Reis, spicy Pulled Chicken Tinga, würziger Guacamole, fruchtigem Pico de Gallo, cremiger Frijoles Refritos, knusprigen Tortilla Chips, knackigem mini Romana, spritziger Limette und frischem Koriander",
        "image": "images/burrito1.png",
        "price": 10.49,
        "amount": 1,
        "total": 11.49
    },
    {
        "name": "Burrito Pulled Chicken Tinga",
        "description": "mit Spicy Pulled Chicken Tinga, frischem Koriander Limetten Reis, duftendem Weizentortilla, cremiger Frijoles Refritos, fruchtigem Pico de Gallo, zartschmelzendem Käse und milder Sour Cream",
        "image": "images/burrito1.png",
        "price": 9.99,
        "amount": 1,
        "total": 10.99
    },
    {
        "name": "Burrito al Pastor",
        "description": "mit würzigem Schweinefleisch al Pastor, frischem Koriander Limetten Reis, duftendem Weizentortilla, cremiger Frijoles Refritos, fruchtigem Pico de Gallo, zartschmelzendem Käse und milder Sour Cream",
        "image": "images/burrito1.png",
        "price": 9.99,
        "amount": 1,
        "total": 10.99
    },
];



let basket = [];

function render() {

    let card = document.getElementById('card');

    card.innerHTML = '';

    for (let i = 0; i < offer.length; i++) {
        const food = offer[i];
        card.innerHTML += `
         <div class="menuCard">
             <div><h4>${food['name']}</h4></div>
               <div class="description">${food['description']}</div>
               <div class="price">${food['price'].toString().replace(".",",")}&nbsp;€</div>  
               <div class="image"><img src="${food['image']}"></div>
               <div onclick="addToBasket(${i})"><i class="order fa-solid fa-plus"></i></div>
        </div>
        `;
    }
}

function renderBasket() {
    let basket = document.getElementById('basket');
    basket.innerHTML = '';
    basket.innerHTML += `
    
    <div class="emptyBasket">Dein Warenkorb ist leer.</div>
    <div class="shopping"><img src="images/basket.png"></div>
    <div class="deliveryInfo">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</div>
    <div class="x2" onclick="closeBasket()">x</div>
   `;
}

function renderFilledBasket() {
    let basketIndex = document.getElementById('basket')

    basketIndex.innerHTML = '';
    if (basket.length >= 1) {
        for (let i = 0; i < basket.length; i++) {
            let basketContent = basket[i];
            basketIndex.innerHTML += `
           
        <div class="basketContent">
           <div class="basketDescription"><strong>${basketContent['amount']}</strong></div>
           <div class="basketDescription"><strong>${basketContent['name']}</strong></div>
           <div class="basketDescription">${basketContent['price'].toString().replace(".",",")}&nbsp;€</div>
          <div class="basketButton1" onclick="deleteAmount(${i})">-</div>
          <div class="basketButton2" onclick="addAmount(${i})">+</div>
        </div>
        
     `;
        }
        basketIndex.innerHTML += `
        <div id="sumBetween"></div>
        <div class="pay">
        <button onclick="overflowAuto()" id="total" class="payButton"></button>
        </div>
        
        `;

    } else {
        renderBasket();

    }
}



function addToBasket(i) {
    let x = basket.indexOf(offer[i]);
    if (basket.includes(offer[i])) {
        basket[x].amount++;
        renderFilledBasket();

    } else {
        basket.push(offer[i]);
        renderFilledBasket();
    }
    calc();

}

function deleteBasket(i) {
    if (basket[i].amount <= 1) {
        basket.splice(i, 1);
        renderFilledBasket();
    } else {
        basket[i].amount--;
        basket[i].total -= basket[i].price;
        renderFilledBasket();
    }
    calc();
}

function calc() {
    let sum = 1;
    let sum2 = 0;
    for (let i = 0; i < basket.length; i++) {
        sum += basket[i].price * basket[i].amount;
        sum2 += basket[i].price * basket[i].amount;
    }

    document.getElementById('total').innerHTML += `
    Bezahlen ( ${sum.toFixed(2).toString().replace(".",",")} € )
    `;
    document.getElementById('sumBetween').innerHTML += `
    <div class="betweenSum">
    <div>Zwischensumme ${sum2.toFixed(2).toString().replace(".",",")}&nbsp;€</div>
    <div>Lieferkosten 1,00&nbsp;€</div>
    <div>Gesamt ${sum.toFixed(2).toString().replace(".",",")}&nbsp;€</div>
    <div class="x" onclick="closeBasket()">x</div>
    </div>
    `;

    document.getElementById('responsivePay').innerHTML = `
    Bezahlen ( ${sum.toFixed(2).toString().replace(".",",")} € )
    `;
}

function responsiveBasket() {
    let mobileBasket = document.getElementById('rightDiv');
    mobileBasket.classList.remove('basket');
    document.getElementById('bodyFlow').style.overflow = 'hidden';
}

function addAmount(i) {
    basket[i].amount++;
    basket[i].total += basket[i].price;
    renderFilledBasket();
    calc();
}

function deleteAmount(i) {
    if (basket[i].amount <= 1) {
        basket.splice(i, 1);
        renderFilledBasket();
    } else {
        basket[i].amount--;
        basket[i].total -= basket[i].price;
        renderFilledBasket();
    }
    document.getElementById('responsivePay').innerHTML = `
    Warenkorb
    `;

    calc();

}

function closeBasket() {
    let mobileBasket = document.getElementById('rightDiv');
    mobileBasket.classList.add('basket');
    document.getElementById('bodyFlow').style.overflow = 'auto';

}

function overflowAuto() {
    let mobileBasket = document.getElementById('rightDiv');
    mobileBasket.classList.add('basket');
    document.getElementById('bodyFlow').style.overflow = 'hidden';
}



/*function responsiveCalc() {
    let sum = 0;
    let sum2 = 0;
    for (let i = 0; i < basket.length; i++) {
        sum += basket[i].price * basket[i].amount + 1;
        sum2 += basket[i].price * basket[i].amount;
    }


    document.getElementById('newResponsiveBasket').innerHTML += `
    <div class="betweenSum">
    <div>Zwischensumme ${sum2.toFixed(2).toString().replace(".",",")}&nbsp;€</div>
    <div>Lieferkosten 1,00&nbsp;€</div>
    <div>Gesamt ${sum.toFixed(2).toString().replace(".",",")}&nbsp;€</div>
    </div>
    `;

    document.getElementById('responsivePay').innerHTML = `
    Bezahlen ( ${sum.toFixed(2).toString().replace(".",",")} € )
    `;
}

function renderResponsiveBasket() {

    let basketIndex = document.getElementById('newResponsiveBasket');


    basketIndex.innerHTML = '';
    if (basket.length >= 1) {
        for (let i = 0; i < basket.length; i++) {
            let basketContent = basket[i];
            basketIndex.innerHTML = `
           
        <div class="basketContent">
           <div class="basketDescription"><b>${basketContent['amount']}</b></div>
           <div class="basketDescription"><b>${basketContent['name']}</b></div>
           <div class="basketDescription">${basketContent['price'].toString().replace(".",",")}&nbsp;€</div>
          <div class="basketButton1" onclick="deleteResponsiveBasket(${i})">-</div>
          <div class="basketButton2" onclick="addResponsiveBasket(${i})">+</div>
        </div>
       
        `;
        }

        basketIndex.innerHTML += `
        <div id="sumBetween"></div>
        <div class="pay">
        <button id="responsivePay" class="payButton"></button>
        </div>
        `;


        responsiveCalc();


    }
}

function addResponsiveBasket(i) {
    let x = basket.indexOf(offer[i]);
    if (basket.includes(offer[i])) {
        basket[x].amount++;
        renderResponsiveBasket();

    } else {
        basket.push(offer[i]);
        renderResponsiveBasket();
    }
    responsiveCalc();

}

function deleteResponsiveBasket(i) {
    if (basket[i].amount <= 1) {
        basket.splice(i, 1);
        renderResponsiveBasket();
    } else {
        basket[i].amount--;
        renderResponsiveBasket();
    }
    responsiveCalc();
}

*/