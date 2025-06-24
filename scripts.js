const product = [
    {
      id: 0,
      image: 'atta.jpg',
      title: 'Parle Atta',
      price: 120,
    },
    {
      id: 1,
      image: '32.jpg',
      title: 'Chhota BHEEM',
      price: 60,
    },
    {
      id: 2,
      image: 'cake.jpg',
      title: 'Ckes',
      price: 230,
    },
    {
      id: 3,
      image: 'rusk.jpg',
      title: 'Rusk',
      price: 100,
    },
   
    {
        id: 4,
        image: 'me.jpg',
        title: 'snacks',
        price: 100,
      } ,
      
      {
        id: 5,
        image: 'wf.jpg',
        title: 'snacks',
        price: 99,
      },
      {
        id: 6,
        image: 'monac.jpg',
        title: 'Biscuit',
        price: 69,
      },
      {
        id: 7,
        image: 'p.jpg',
        title: 'biscuits',
        price: 20,
      },
      {
        id: 8,
        image: 'krack.jpg',
        title: 'biscuits',
        price: 10,
      },
      {
        id: 9,
        image: 'magix.jpg',
        title: 'biscuits',
        price: 100,
      },
      {
        id: 10,
        image: 'fab.jpg',
        title: 'biscuits',
        price: 99,
      },
      {
        id: 11,
        image: 'mari.jpg',
        title: 'biscuits',
        price: 100,
      },
      {
        id: 12,
        image: 'arovita.jpg',
        title: 'biscuits',
        price: 159,
      },
      {
        id: 13,
        image: 'hide.jpg',
        title: 'biscuits',
        price: 99,
      },
      {
        id: 14,
        image: 'milk.jpg',
        title: 'biscuits',
        price: 150,
      },
      {
        id: 15,
        image: 'seek.jpg',
        title: 'biscuits',
        price: 250,
      },
      {
        id: 16,
        image: 'nutri.jpg',
        title: 'biscuits',
        price: 200,
      },
      {
        id: 17,
        image: 'happy.jpg',
        title: 'biscuits',
        price: 100,
      },
      {
        id: 18,
        image: 'coconut.jpg',
        title: 'biscuits',
        price: 150,
      },
      {
        id: 19,
        image: 'cracker.jpg',
        title: 'biscuits',
        price: 200,
      },
      {
        id: 20,
        image: 'kismi.jpg',
        title: 'Confectionery',
        price: 100,
      },
      {
        id: 21,
        image: '2in1.jpg',
        title: 'Confectionery',
        price: 50,
      },
      {
        id: 22,
        image: 'kaccha.jpg',
        title: 'Confectionery',
        price: 100,
      },{
        id: 23,
        image: 'melody.jpg',
        title: 'Confectionery',
        price: 19,
      },
      {
        id: 24,
        image: 'mango.jpg',
        title: 'Confectionery',
        price: 99,
      },
      {
        id: 25,
        image: 'choco.jpg',
        title: 'Confectionery',
        price: 59,
      }
    
    
    
  ];
  const categories = [...new Set(product.map((item) => { return item }))]
  let i = 0;
  document.getElementById('root').innerHTML = categories.map((item) => {
    var { image, title, price } = item;
    return (
      `<div class='box'>
        <div class='img-box'>
          <img class='images' src=${image}></img>
        </div>
        <div class='bottom'>
          <p>${title}</p>
          <h2>$ ${price}.00</h2>` +
          "<button onclick='addtocart(" + (i++) + ")'>Add to cart</button>" +
        `</div>
      </div>`
    )
  }).join('')
  
  var cart = [];
  
  function addtocart(a) {
    cart.push({ ...categories[a] });
    displaycart();
  }
  function delElement(a) {
    cart.splice(a, 1);
    displaycart();
  }
  
  function displaycart() {
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
      document.getElementById('cartItem').innerHTML = "Your cart is empty";
      document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    }
    else {
      document.getElementById("cartItem").innerHTML = cart.map((items) => {
        var { image, title, price } = items;
        total = total + price;
        document.getElementById("total").innerHTML = "$ " + total + ".00";
        return (
          `<div class='cart-item'>
            <div class='row-img'>
              <img class='rowimg' src=${image}>
            </div>
            <p style='font-size:12px;'>${title}</p>
            <h2 style='font-size: 15px;'>$ ${price}.00</h2>` +
          "<i class='fa-solid fa-trash' onclick='delElement(" + (j++) + ")'></i></div>"
        );
      }).join('');
    }
  }

  function sendCartInfo() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let cartData = cart.map(item => ({
        name: item.title,
        price: item.price,
        quantity: 1  // You can modify this if you support multiple quantities
    }));

    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    let data = {
        cartData: JSON.stringify(cartData),
        totalPrice: totalPrice
    };

    fetch('./cart/placeorder.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        window.location.href = 'index.php'; // Redirect after order
    })
    .catch(error => console.error('Error:', error));
}
