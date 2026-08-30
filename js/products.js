import {
  auth,
  db
} from "./firebase.js";

import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const products = {

  freefire: {

    title: "🔥 Free Fire",

    options: [

      {
        name: "70 Diamond",
        price: 10000
      },

      {
        name: "140 Diamond",
        price: 19000
      },

      {
        name: "355 Diamond",
        price: 48000
      },

      {
        name: "720 Diamond",
        price: 95000
      },

      {
        name: "1450 Diamond",
        price: 185000
      }

    ]

  },


  ml: {

    title: "🎮 Mobile Legends",

    options: [

      {
        name: "86 Diamond",
        price: 20000
      },

      {
        name: "172 Diamond",
        price: 39000
      },

      {
        name: "257 Diamond",
        price: 57000
      },

      {
        name: "344 Diamond",
        price: 75000
      }

    ]

  },


  vps: {

    title: "🖥️ VPS",

    options: [

      {
        name: "VPS 1GB RAM - 1 CPU",
        price: 25000
      },

      {
        name: "VPS 2GB RAM - 1 CPU",
        price: 40000
      },

      {
        name: "VPS 4GB RAM - 2 CPU",
        price: 75000
      },

      {
        name: "VPS 8GB RAM - 4 CPU",
        price: 140000
      }

    ]

  }

};


window.openProduct = function(type) {

  const product =
    products[type];

  const modal =
    document.getElementById(
      "productModal"
    );

  const title =
    document.getElementById(
      "modalTitle"
    );

  const options =
    document.getElementById(
      "productOptions"
    );

  title.textContent =
    product.title;

  options.innerHTML = "";

  product.options.forEach(item => {

    const div =
      document.createElement("div");

    div.className = "option";

    div.innerHTML = `

      <div>

        <strong>
          ${item.name}
        </strong>

        <br>

        <span>
          Rp${item.price.toLocaleString("id-ID")}
        </span>

      </div>

      <button
        class="btn"
        onclick='createOrder(
          ${JSON.stringify(item)}
        )'>

        Beli

      </button>

    `;

    options.appendChild(div);

  });

  modal.style.display = "flex";

};


window.closeProduct = function() {

  document.getElementById(
    "productModal"
  ).style.display = "none";

};


window.createOrder = async function(item) {

  if (!auth.currentUser) {

    alert(
      "Silakan login terlebih dahulu."
    );

    window.location.href =
      "login.html";

    return;

  }


  try {

    await addDoc(
      collection(db, "orders"),
      {

        userId:
          auth.currentUser.uid,

        customerEmail:
          auth.currentUser.email,

        product:
          item.name,

        price:
          item.price,

        paymentStatus:
          "pending",

        orderStatus:
          "pending",

        createdAt:
          serverTimestamp()

      }
    );


    alert(
      "Pesanan berhasil dibuat."
    );

    window.location.href =
      "orders.html";

  } catch (error) {

    alert(error.message);

  }

};


window.buyService = function(service) {

  createOrder({

    name: service,

    price: 0

  });

};