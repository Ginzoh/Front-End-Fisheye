function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

//check if a String is an email
const isEmail = function (email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
};

let firstNameBool = false;
let LastNameBool = false;
let emailBool = false;

function checkFirstName() {
  const text = document.getElementById("first");
  if (text.value.length < 2 || !/^[a-zA-Z,.'-]+$/.test(text.value)) {
    toggleError(".checkName");
    firstNameBool = false;
  } else if (text.value.length >= 2) {
    toggleError(".checkName", "none");
    firstNameBool = true;
  }
}

function checkLastName() {
  const text = document.getElementById("last");
  if (text.value.length < 2 || !/^[a-zA-Z,.'-]+$/.test(text.value)) {
    toggleError(".checkLast");
    LastNameBool = false;
  } else if (text.value.length >= 2) {
    toggleError(".checkLast", "none");
    LastNameBool = true;
  }
}

function checkEmail() {
  const text = document.getElementById("email");
  if (isEmail(text.value)) {
    toggleError(".checkEmail", "none");
    emailBool = true;
  } else {
    toggleError(".checkEmail");
    emailBool = false;
  }
}

function validate() {
  event.preventDefault();
  checkFirstName();
  if (!firstNameBool) {
    toggleError(".checkName");
    alert("Please enter a valid first name");
    return false;
  }
}
