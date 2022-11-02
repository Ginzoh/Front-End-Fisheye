function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  document.querySelector("body").focus();
}

//check if a String is an email
const isEmail = function (email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
};

//checking the first name
document.getElementById("first").addEventListener("input", checkFirstName);

//checking the last name
document.getElementById("last").addEventListener("input", checkLastName);

//checking the email
document.getElementById("email").addEventListener("input", checkEmail);

//checking the email
document.getElementById("message").addEventListener("input", checkMessage);

let firstNameBool = false;
let LastNameBool = false;
let emailBool = false;
let messageBool = false;

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

function checkMessage() {
  const text = document.getElementById("message");
  if (text.value.length < 5) {
    toggleError(".checkMessage");
    messageBool = false;
  } else if (text.value.length >= 5) {
    toggleError(".checkMessage", "none");
    messageBool = true;
  }
}
function toggleError(selector, display = "block") {
  document.querySelector(selector).style.display = display;
}
function validate() {
  event.preventDefault();
  checkFirstName();
  if (!firstNameBool) {
    toggleError(".checkName");
    alert("Please enter a valid first name");
    return false;
  }
  if (!LastNameBool) {
    toggleError(".checkLast");
    alert("Please enter a valid last name");
    return false;
  }
  checkEmail();
  if (!emailBool) {
    toggleError(".checkEmail");
    alert("Please enter a valid email");
    return false;
  }
  console.log(
    document.getElementById("first").value,
    document.getElementById("last").value,
    document.getElementById("email").value,
    texdocument.getElementById("message").value
  );
  return true;
}
