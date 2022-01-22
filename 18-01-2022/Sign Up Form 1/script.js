
// set error for incorrect user input
function setErrorMsg(element, errorMessage) {
    const parent = element.parentElement;
    const err = parent.querySelector("p");
    parent.classList.add("error");
    err.innerText = errorMessage;
}

// set success for correct user input
function setSuccessMsg(element) {
    const parent = element.parentElement;
    parent.className = "form-control success";
}

// name validation
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

// age validation
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

// email validation
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

// mobile number validation
function validateMobile(mobile) {
    const mobileVal = mobile.value.trim();
    let errorMessage='';

    if (!mobileVal) {
        errorMessage = "This field is required.";
    } else if (isNaN(mobileVal)) {
        errorMessage = "Mobile number must be a number";
    } else if (mobileVal.length < 10) {
        errorMessage = "Mobile number should not be less than 10 digits";
    } else if (mobileVal.length > 10) {
        errorMessage = "Mobile number should not be greater than 10 digits";
    } else {
        setSuccessMsg(mobile);
        return true;
    }
    setErrorMsg(mobile, errorMessage);
    return false;
}

// password validation
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

// validate confirm-password
function validateConfirmPassword(cnfpassword) {
    const cnfpasswordVal = cnfpassword.value.trim();
    const passwordVal = document.querySelector("#password").value.trim();
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

// validate every user input data
const isValidData = (currentData) => {

    let valid = true;
    let currentId = currentData.id;
    switch (currentId) {
        case "name":
            valid = validateName(currentData);
            break;
        case "age":
            valid = validateAge(currentData);
            break;
        case "email":
            valid = validateEmail(currentData);
            break;
        case "mobile":
            valid = validateMobile(currentData);
            break;
        case "password":
            valid = validatePassword(currentData);
            break;
        case "cnfpassword":
            valid = validateConfirmPassword(currentData);
            break;
    }
    return valid;
}

// read data from user input
function readFormData() {
    const name = document.querySelector("#name");
    const age = document.querySelector("#age");
    const email = document.querySelector("#email");
    const mobile = document.querySelector("#mobile");
    const password = document.querySelector("#password");
    const cnfpassword = document.querySelector("#cnfpassword");

    const retrieveData = [name, age, email, mobile, password, cnfpassword];
    const isDataCorrect = retrieveData.every(isValidData);

    if (!isDataCorrect) return false;

    const valueOfData = retrieveData.map((data) => {
        return data.value.trim();
    });

    return valueOfData;
}

// Global declaration of variable
let selectedIndex = null;
let userArray = [];
let editFlag = false;

// populate the table by retrieving local storage data
function editData(index){
  let userObject = userArray[index];
  document.querySelector("#name").value = userObject.name;
  document.querySelector("#age").value = userObject.age;
  document.querySelector("#email").value = userObject.email;
  document.querySelector("#email").disabled = true;
  document.querySelector("#mobile").value = userObject.mobile;
  document.querySelector("#password").value = userObject.password;
  document.querySelector("#cnfpassword").value = '';
  document.querySelector("#submit").innerHTML = 'update';
  selectedIndex = index;
  editFlag = true;
}

// remove data from the local storage at given index
function deleteData(index) {
  // if(confirm('Do you want to d'))
  userArray.splice(index, 1);
  localStorage.userRecord = JSON.stringify(userArray);
  init();
}

// reset the sign up form
function onFormReset(){
    document.querySelector("#name").value = "";
    document.querySelector("#age").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#email").disabled = false;
    document.querySelector("#mobile").value = "";
    document.querySelector("#password").value = "";
    document.querySelector("#cnfpassword").value = "";
    document.querySelector("#submit").innerHTML = "submit";
    selectedIndex = null;
    editFlag = false;
}

// insert data in the local storage
function onFormSubmit(){
  let formData = readFormData();
  if(!formData) return;

  let userObject = {name:formData[0], age:formData[1], email:formData[2], mobile:formData[3], password:formData[4]}

  if(!editFlag){
    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i].email === userObject.email) {
            alert("Email already exists.");
            return;
        }
    }
  }

  if(selectedIndex===null){
    userArray.push(userObject);
  } else{
    userArray.splice(selectedIndex, 1, userObject);
  }
  localStorage.userRecord = JSON.stringify(userArray);
  init();
  onFormReset();
}

// show data in the table
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

// populate the table when page reloads or an operation is performed
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

// on Enter key press
document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        onFormSubmit();
    }
});
