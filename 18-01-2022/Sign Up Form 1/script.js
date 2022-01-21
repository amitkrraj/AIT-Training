
let selectedIndex = -1;
let userArray = [];

// Set Error
function setErrorMsg(element, errorMessage) {
    const parent = element.parentElement;
    const err = parent.querySelector("p");
    parent.classList.add("error");
    err.innerText = errorMessage;
}

// Set Success
function setSuccessMsg(element) {
    const parent = element.parentElement;
    parent.className = "form-control success";
}

// Name Validation
function validateName(name) {
    const nameVal = name.value.trim();
    let errorMessage = '';

    if (!nameVal) {
        errorMessage = "This field is required";
    } else if (nameVal.length < 3) {
        errorMessage = "Name cannot be less than 3 characters";
    } else if (nameVal.length > 50) {
        errorMessage = "Name cannot be more than 50 characters";
    } else if (!isNaN(nameVal)) {
        errorMessage = "Name must have at least a letter";
    } else {
        setSuccessMsg(name);
        return true;
    }
    setErrorMsg(name, errorMessage);
    return false;
}

// Age Validation
function validateAge(age) {
    const ageVal = age.value.trim();
    let errorMessage='';

    if (!ageVal) {
        errorMessage = "This field is required.";
    } else if (isNaN(ageVal)) {
        errorMessage = "Age must be a number";
    } else if (ageVal <= 0 || ageVal >= 150) {
        errorMessage = "Age must be in between 0 and 150";
    } else {
        setSuccessMsg(age);
        return true;
    }
    setErrorMsg(age, errorMessage);
    return false;
}

// Email Validation
function isEmail(emailVal) {
    const atSymbolFirst = emailVal.indexOf("@");
    const atSymbolLast = emailVal.lastIndexOf("@");

    if(!(atSymbolFirst === atSymbolLast)) return false;
    if (atSymbolLast === emailVal.length - 1) return false;

    const dot = emailVal.lastIndexOf(".");
    if (dot === emailVal.length - 1 ||emailVal[dot + 1] === "." ||dot <= atSymbolLast + 3) return false;

    return true;
}

function validateEmail(email) {
    const emailVal = email.value.trim();
    let errorMessage='';

    if (!emailVal) {
        errorMessage = "This field is required.";
    } else if (!emailVal.match("@")) {
        errorMessage = "@ is missing";
    } else if (!isEmail(emailVal)) {
        errorMessage = "Not a valid email";
    } else {
        setSuccessMsg(email);
        return true;
    }
    setErrorMsg(email, errorMessage);
    return false;
}

// Mobile Number Validation
function validateMobile(mobile) {
    const mobileVal = mobile.value.trim();
    let errorMessage='';

    if (!mobileVal) {
        errorMessage = "This field is required.";
    } else if (isNaN(mobileVal)) {
        errorMessage = "Mobile number must be digits";
    } else if (mobileVal.length != 10) {
        errorMessage = "Mobile number must be equal to 10 digits";
    } else {
        setSuccessMsg(mobile);
        return true;
    }
    setErrorMsg(mobile, errorMessage);
    return false;
}

// Password Validation
function validatePassword(password) {
    const passwordVal = password.value.trim();

    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialCharacters = /[^a-zA-Z\d]/g;

    let errorMessage='';

    if (!passwordVal) {
        errorMessage = "This field is required";
    } else if (passwordVal.length < 6) {
        errorMessage = "Password cannot be less than 6 characters";
    } else if (passwordVal.length > 15) {
        errorMessage = "Password cannot be more than 15 characters";
    } else if (!passwordVal.match(lowerCaseLetters)) {
        errorMessage = "Password must contain a lower case";
    } else if (!passwordVal.match(upperCaseLetters)) {
        errorMessage = "Password must contain an upper case";
    } else if (!passwordVal.match(numbers)) {
        errorMessage = "Password must contain a number";
    } else if (!passwordVal.match(specialCharacters)) {
        errorMessage = "Password must contain a special character";
    } else {
        setSuccessMsg(password);
        return true;
    }
    setErrorMsg(password, errorMessage);
    return false;
}
// Confirm Password
function validateConfirmPassword(cnfpassword, password) {
    const cnfpasswordVal = cnfpassword.value.trim();
    const passwordVal = password.value.trim();
    let errorMessage='';

    if (!cnfpasswordVal) {
        errorMessage = "This field is required.";
    } else if (cnfpasswordVal != passwordVal) {
        errorMessage = "Password do not match";
    } else {
        setSuccessMsg(cnfpassword);
        return true;
    }
    setErrorMsg(cnfpassword, errorMessage);
    return false;
}

// read from data
function readFormData() {
    const name = document.querySelector("#name");
    const age = document.querySelector("#age");
    const email = document.querySelector("#email");
    const mobile = document.querySelector("#mobile");
    const password = document.querySelector("#password");
    const cnfpassword = document.querySelector("#cpassword");

    if (!validateName(name)) return false;
    if (!validateAge(age)) return false;
    if (!validateEmail(email)) return false;
    if (!validateMobile(mobile)) return false;
    if (!validatePassword(password)) return false;
    if (!validateConfirmPassword(cnfpassword, password)) return false;

    const storeDetails = [name.value, age.value, email.value, mobile.value, password.value];
    return storeDetails;

    // formreset(storeDetails);
    // const parent = document.getElementsByClassName('form-control success');
    // parent.className = "form-control error";
}

// edit the data
function editData(index){
  let userObject = userArray[index];
  document.querySelector("#name").value = userObject.name;
  document.querySelector("#age").value = userObject.age;
  document.querySelector("#email").value = userObject.email;
  document.querySelector("#mobile").value = userObject.mobile;
  document.querySelector("#password").value = userObject.password;
  document.querySelector("#submit").innerHTML = 'update';
  selectedIndex = index;
}

// delete data
function deleteData(index) {
  // if(confirm('Do you want to d'))
  userArray.splice(index, 1);
  localStorage.userRecord = JSON.stringify(userArray);
  init();
}

// form reset
function onFormReset(){
    document.querySelector("#name").value = "";
    document.querySelector("#age").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#mobile").value = "";
    document.querySelector("#password").value = "";
    document.querySelector("#cpassword").value = "";
    document.querySelector("#submit").innerHTML = "submit";
    selectedIndex = -1;
}

// insert data
function onFormSubmit(){
  let formData = readFormData();
  if(!formData) return;

  let userObject = {name:formData[0], age:formData[1], email:formData[2], mobile:formData[3], password:formData[4]}

  for(let i = 0; i < userArray.length; i++){
      if(userArray[i].email === userObject.email){
          alert("Email already exists.");
          return;
      }
  }

  if(selectedIndex===-1){
    userArray.push(userObject);
  } else{
    userArray.splice(selectedIndex, 1, userObject);
  }
  localStorage.userRecord = JSON.stringify(userArray);
  init();
  onFormReset();
}

// show data in table
function showData(data) {
    const table = document.querySelector("#tablerows");
    const newRow = table.insertRow();

    for (let i = 0; i < data.length - 1; i++) {
        const cell = newRow.insertCell(i);
        cell.innerHTML = data[i];
    }

    let lastIndexOfData = data.length - 1;
    const cell = newRow.insertCell(lastIndexOfData);
    let index = data[lastIndexOfData];
    cell.innerHTML = '<button onClick="editData('+index+')"> Edit </button><button onClick="deleteData('+index+')"> Delete </button>';
}

// init method to populate the table initially when an operation is performed
function init(){
    document.getElementById("tablerows").innerHTML = "";
    if(localStorage.userRecord){
        userArray = JSON.parse(localStorage.userRecord);
        for(let i = 0; i < userArray.length; i++){
            let dataFound=[userArray[i].name, userArray[i].age, userArray[i].email, userArray[i].mobile, i];
            showData(dataFound);
        }
    }
}
document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        onFormSubmit();
    }
});
