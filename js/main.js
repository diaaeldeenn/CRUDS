var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var deleteAllBtn = document.getElementById("clearAll");
var search = document.getElementById("search");
var productList = [];
var updateIndex;

if (localStorage.getItem("productsArray") != null) {
  productList = JSON.parse(localStorage.getItem("productsArray"));
  displayProducts(productList);
  counterProducts(productList);
}
updateDeleteAllVisibility();

function checkValidation() {
  if (
    validationInput(productName, "stateNameBadge") &&
    validationInput(productPrice, "statePriceBadge") &&
    validationInput(productCategory, "stateCategoryBadge") &&
    validationInput(productImage, "stateImageBadge") &&
    validationInput(productDescription, "stateDescriptionBadge")
  ) {
    return true;
  } else {
    return false;
  }
}

function validationInput(input, stateBadge) {
  var regex = {
    productName: /(?:\b(?:iphone|ipad|samsung|huawei|xiaomi|oneplus|oppo|realme|google pixel|pixel|sony|nokia|motorola|itel)\b)|(?:\b(?:tv|television|led|oled|qled|smart\s?tv)\b)|(?:\b(?:laptop|notebook|macbook|dell|hp|lenovo|asus|acer|msi)\b)|(?:\b(?:accessory|accessories|charger|case|cover|earbuds|earphones|headphones|powerbank|cable|adapter|type c)\b)|(?:موبايل|هاتف|تليفون|تلفزيون|شاشة|لابتوب|لاب توب|اكسسوار|اكسسوارات|شاحن|كابل|سماعات|باور بانك){3}/iu,
    productPrice: /^(100(\.\d{1,2})?|[1-9]\d{2,4}(\.\d{1,2})?|100000(\.0{1,2})?)$/,
    productDescription: /^[A-Za-zأ-ي0-9\s.,!?\-]{10,300}$/m,
    productCategory: /^(Mobile|TV|Accessories|Laptop)$/i,
    productImage: /^.+\.(jpg|png|jpeg|webp)$/i,
  };
  var badge = document.getElementById(stateBadge);

  if (input.id === "productImage" && input.files.length > 0) {
    var file = input.files[0];

    if (!regex[input.id].test(file.name)) {
      badge.textContent = "❌ Image format must be JPG, JPEG, or PNG";
      badge.classList.remove("d-none");
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      return false;
    }

    if (file.size > 2 * 1024 * 1024) {
      badge.textContent = "⚠️ Image must be less than 2 MB";
      badge.classList.remove("d-none");
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      return false;
    }

    badge.classList.add("d-none");
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  }

  if (regex[input.id].test(input.value) === true) {
    badge.classList.add("d-none");
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    badge.textContent = badge.textContent || "Invalid input";
    badge.classList.remove("d-none");
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}


// add product with local image
// function addProduct() {
//   if(checkValidation()){
//     product = {
//       name: productName.value,
//       price: productPrice.value,
//       category: productCategory.value,
//       description: productDescription.value,
//       image: `images/${
//         productImage.files.length > 0 ? productImage.files[0].name : "noimage.png"
//       }`,
//     };
//     productList.push(product);
//     localStorage.setItem("productsArray", JSON.stringify(productList));
//     displayProducts(productList);
//     counterProducts(productList);
//     updateDeleteAllVisibility();
//     clearInputs();
//   }
// }

// add product with FileReader(Base64)
function addProduct() {
  if (checkValidation()) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      image: "",
    };

    if (productImage.files.length > 0) {
      var reader = new FileReader();
      reader.onload = function (e) {
        product.image = e.target.result;
        productList.push(product);
        localStorage.setItem("productsArray", JSON.stringify(productList));
        displayProducts(productList);
        counterProducts(productList);
        updateDeleteAllVisibility();
        clearInputs();
      };
      reader.readAsDataURL(productImage.files[0]);
    } else {
      product.image = "images/noimage.png";
      productList.push(product);
      localStorage.setItem("productsArray", JSON.stringify(productList));
      displayProducts(productList);
      counterProducts(productList);
      updateDeleteAllVisibility();
      clearInputs();
    }
  }
}

function counterProducts(array) {
  document.getElementById("counterProduct").innerHTML =
    array.length + " " + "Product";
}

function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
  productName.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");
  productImage.classList.remove("is-valid");
}

function displayProducts(array) {
  var cards = "";
  for (var i = 0; i < array.length; i++) {
    var realIndex = productList.indexOf(array[i]);
    cards += `<div class="col-md-6 col-lg-6">
            <div class="card position-relative">
              <img
                src="${array[i].image}"
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <div class="product-badge">${array[i].category}</div>
                <h3 class="card-title">${array[i].name}</h3>
                <p class="card-text text-muted">${array[i].description}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="product-price fs-4"><span>${array[i].price}</span><span class="price-currency">EGP</span></div>
                  <div class="d-flex card-actions">
                    <button
                      onclick="deleteProduct(${realIndex})"
                      id="deleteProduct"
                      class="btn btn-outline-danger rounded-end-0"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                    <button
                      onclick="getProductToUpdate(${realIndex})"
                      id="updateProduct"
                      class="btn btn-outline-warning rounded-start-0"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  }
  document.getElementById("rowData").innerHTML = cards;
}

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    productList.splice(index, 1);
    localStorage.setItem("productsArray", JSON.stringify(productList));
    displayProducts(productList);
    counterProducts(productList);
    updateDeleteAllVisibility();
  }
}

function deleteAll() {
  productList.splice(0);
  displayProducts(productList);
  counterProducts(productList);
  updateDeleteAllVisibility();
  localStorage.removeItem("productsArray");
}

function updateDeleteAllVisibility() {
  if (productList.length === 0) {
    deleteAllBtn.classList.add("d-none");
  } else {
    deleteAllBtn.classList.remove("d-none");
  }
}

function searchByName() {
  var searchArray = [];
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .trim()
        .toLowerCase()
        .includes(search.value.trim().toLowerCase()) === true
    ) {
      searchArray.push(productList[i]);
    }
  }
  displayProducts(searchArray);
  counterProducts(searchArray);
}

function getProductToUpdate(index) {
  updateIndex = index;
  productName.value = productList[updateIndex].name;
  productPrice.value = productList[updateIndex].price;
  productCategory.value = productList[updateIndex].category;
  productDescription.value = productList[updateIndex].description;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  validationInput(productName, "stateNameBadge");
  validationInput(productPrice, "statePriceBadge");
  validationInput(productCategory, "stateCategoryBadge");
  validationInput(productImage, "stateImageBadge");
  validationInput(productDescription, "stateDescriptionBadge");
}

// update product with local image
// function updateProduct() {
//   if(checkValidation()){
//     productList[updateIndex].name = productName.value;
//     productList[updateIndex].price = productPrice.value;
//     productList[updateIndex].category = productCategory.value;
//     productList[updateIndex].description = productDescription.value;
//     productList[updateIndex].image = `images/${
//       productImage.files.length > 0 ? productImage.files[0].name : "noimage.png"
//     }`;
//     displayProducts(productList);
//     clearInputs();
//     localStorage.setItem("productsArray", JSON.stringify(productList));
//     addBtn.classList.remove("d-none");
//     updateBtn.classList.add("d-none");
//   }
// }

// update product with FileReader(Base64)
function updateProduct() {
  if (checkValidation()) {
    productList[updateIndex].name = productName.value;
    productList[updateIndex].price = productPrice.value;
    productList[updateIndex].category = productCategory.value;
    productList[updateIndex].description = productDescription.value;

    if (productImage.files.length > 0) {
      var reader = new FileReader();
      reader.onload = function (e) {
        productList[updateIndex].image = e.target.result;
        localStorage.setItem("productsArray", JSON.stringify(productList));
        displayProducts(productList);
        clearInputs();
        addBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
      };
      reader.readAsDataURL(productImage.files[0]);
    } else {
      localStorage.setItem("productsArray", JSON.stringify(productList));
      displayProducts(productList);
      clearInputs();
      addBtn.classList.remove("d-none");
      updateBtn.classList.add("d-none");
    }
  }
}

function filterByCategory() {
  var selectedCategory = document.getElementById("filterCategory").value;
  if (selectedCategory === "all") {
    displayProducts(productList);
    counterProducts(productList);
  } else {
    var filteredArray = productList.filter(function (product) {
      return product.category.toLowerCase() === selectedCategory.toLowerCase();
    });

    displayProducts(filteredArray);
    counterProducts(filteredArray);
  }
}

function toggleMode() {
  var body = document.body;
  var btn = document.getElementById("modeBtn");

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    btn.innerHTML = "🌙 Dark Mode";
    btn.className = "btn mode-btn btn-outline-dark";
  } else {
    body.classList.add("dark-mode");
    btn.innerHTML = "☀️ Light Mode";
    btn.className = "btn mode-btn btn-dark";
  }
}
