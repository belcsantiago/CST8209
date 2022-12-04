$(document).ready(() => {
  const baseUrl = "data.json";
  //validate module
  //validate the profile form
  validateProfile = (e) => {
    e.preventDefault();
    var isValid = true;

    console.log(purchase);

    if (purchase.customer_name.value === "") {
      document.querySelector("#customer_name_error").innerHTML =
        "Please enter a First Name";
      isValid = false;
    }

    if (purchase.customer_birth_date.value == "") {
      document.querySelector("#customer_birth_date_error").innerHTML =
        "Please enter a Last Name";
      isValid = false;
    }

    if (purchase.customer_phone.value == "") {
      document.querySelector("#customer_phone_error").innerHTML =
        "Please enter a Address 1";
      isValid = false;
    }

    if (purchase.customer_address.value == "") {
      document.querySelector("#cityError").innerHTML =
        "Please enter a City Name";
      isValid = false;
    }

    if (purchase.customer_province.value == "") {
      document.querySelector("#provinceError").innerHTML = "Select a Province";
      isValid = false;
    }

    // if (purchase.country.value === "") {
    //   document.querySelector("#countryError").innerHTML = "Select a Country";
    //   isValid = false;
    // }

    if (isValid) {
      alert("Thank you!");
    }

    return isValid;
  };
  document
    .querySelector("#customer_name")
    .addEventListener("blur", function () {
      if (this.value !== "") {
        customer_name_error.innerHTML = "";
      }
    });

  document
    .querySelector("#customer_birth_date")
    .addEventListener("blur", function () {
      if (this.value !== "") {
        customer_birth_date_error.innerHTML = "";
      }
    });

  document
    .querySelector("#customer_phone")
    .addEventListener("blur", function () {
      if (this.value !== "") {
        customer_phone_error.innerHTML = "";
      }
    });

  document
    .querySelector("#customer_address")
    .addEventListener("blur", function () {
      if (this.value !== "") {
        customer_address_error.innerHTML = "";
      }
    });

  document
    .querySelector("#customer_province")
    .addEventListener("blur", function () {
      if (this.value !== "") {
        customer_province_error.innerHTML = "";
      }
    });

  document
    .querySelector("#customer_size")
    .addEventListener("blur", function () {
      if (this.value !== "") {
        customer_size_error.innerHTML = "";
      }
    });

  cleanMessages = () => {
    if (purchase.fName.value === "") {
      document.querySelector("#customer_name_error").innerHTML = "";
    }

    if (purchase.fName.value === "") {
      document.querySelector("#customer_birth_date_error").innerHTML = "";
    }

    if (purchase.lName.value == "") {
      document.querySelector("#customer_phone_error").innerHTML = "";
    }

    if (purchase.address1.value == "") {
      document.querySelector("#customer_address_error").innerHTML = "";
    }

    if (purchase.city.value == "") {
      document.querySelector("#customer_province_error").innerHTML = "";
    }

    if (purchase.province.value == "") {
      document.querySelector("#customer_newsletter_error").innerHTML = "";
    }

    if (purchase.country.value === "") {
      document.querySelector("#customer_size_error").innerHTML = "";
    }
  };

  document.purchase.addEventListener("submit", validateProfile);
  document.purchase.addEventListener("reset", cleanMessages);

  let showShoesList = (shoesList) => {
    let totalItems = shoesList.length;

    for (i = 0; i < totalItems - 1; i++) {
      let currentElement = shoesList[i];
      $("#gallery").append(createCard(currentElement));
    }
  };

  createCard = (element) => {
    let card = document.createElement("div");
    let itemName = document.createElement("p");
    let price = document.createElement("p");
    let quantity = document.createElement("p");
    let image = document.createElement("img");
    $(card).attr("class", "card");
    $(itemName).attr("class", "item-name");
    $(price).attr("class", "item-price");
    $(quantity).attr("class", "item-quantity");

    if (element.quantity < 2) $(quantity).attr("class", "item-quantity-low");

    itemName.textContent = element.name;
    price.textContent = `$ ${element.price}`;
    quantity.textContent = `${element.quantity} items left`;
    image.setAttribute("src", `images/${element.id}.jpg`);
    card.append(image, itemName, price, quantity);
    return card;
  };

  getShoes = async () => {
    await $.get({
      url: `${baseUrl}`,
      type: "GET",
      error: (error) => {
        showToastRequest("error", error.statusText);
      },
      success: (data) => {
        showShoesList(data);
      },
    });
  };

  showToastRequest = (type, content) => {
    Toastify({
      text: `${content}`,
      duration: 2000,
      close: false,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: `${type == "error" ? "red" : "green"}`,
      },
    }).showToast();
  };

  getShoes();
});
