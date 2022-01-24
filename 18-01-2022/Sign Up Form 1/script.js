
// alert msg for already registered email id
function alertEmailExits() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            alert("Email already exists.");
            resolve();
        }, 5);
    });
}

// set error for incorrect user input
function setErrorMsg(element, errorMessage) {
    return new Promise ((resolve, reject) =>{
        setTimeout(() => {
            const parent = element.parentElement;
            parent.className = "form-control error";
            const err = parent.querySelector(".errorMessage");
            err.innerText = errorMessage;
            err.style.visibility = "visible";
            element.focus();
            resolve();
        }, 1);
    })
}

// set success for correct user input
function setSuccessMsg(element) {
    const parent = element.parentElement;
    parent.className = "form-control success";
    const err = parent.querySelector(".errorMessage");
    err.style.visibility = "hidden";
}

// reset style to table to the normal
function resetTableStyle() {
    const allInputFields = document.querySelectorAll("p.errorMessage");
    allInputFields.forEach(input => {
        input.style.visibility = "hidden";
    });

    const allInputDiv = document.querySelectorAll("div.form-control");
    allInputDiv.forEach(div => {
        div.className = "form-control";
    });
}

// name validation
function validateName(name) {
    const nameVal = name.value.trim();
    let errorMessage = '';

    if (!nameVal) {
        errorMessage = "This field is required";
    } else if (nameVal.length < 3) {
        errorMessage = "Name cannot have less than 3 characters";
    } else if (nameVal.length > 50) {
        errorMessage = "Name cannot have more than 50 characters";
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
    let errorMessage = "";

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
    let errorMessage = '';

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
    let errorMessage = '';

    if (!mobileVal) {
        errorMessage = "This field is required.";
    } else if (isNaN(mobileVal)) {
        errorMessage = "Mobile number must be a number";
    } else if (mobileVal.length < 10) {
        errorMessage = "Mobile number should not be less than 10 digits";
    } else if (mobileVal.length > 10) {
        errorMessage = "Mobile number should not be greater than 10 digits";
    } else if (mobileVal < 6000000000) {
        errorMessage = "Mobile number must start with 6, 7, 8 or 9";
    } else {
        setSuccessMsg(mobile);
        return true;
    }
    setErrorMsg(mobile, errorMessage);
    return false;
}

// password validation
function validatePassword(password) {

    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialCharacters = /[^a-zA-Z\d]/g;

    const passwordVal = password.value.trim();
    let errorMessage = '';

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
    let errorMessage = '';

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
function validateInput(currentData){
    let isValid = true;
    const currentId = currentData.id;
    switch (currentId) {
        case "name":
            isValid = validateName(currentData);
            break;
        case "age":
            isValid = validateAge(currentData);
            break;
        case "email":
            isValid = validateEmail(currentData);
            break;
        case "mobile":
            isValid = validateMobile(currentData);
            break;
        case "password":
            isValid = validatePassword(currentData);
            break;
        case "cnfpassword":
            isValid = validateConfirmPassword(currentData);
            break;
        default:
            setSuccessMsg(currentId);
    }
    return isValid;
}

// Global declaration of variable
let selectedIndex = null;
let userDataArray = [];
let editFlag = false;

// populate the table by retrieving user data from local storage
function editData(index){
    const userObject = userDataArray[index];
    document.querySelectorAll("input").forEach(field => {
        field.value = userObject[field.id];
    });
    document.querySelector("#cnfpassword").value = "";
    document.querySelector("#submit").innerHTML = "update";
    document.querySelector("#email").disabled = true;

    resetTableStyle();
    selectedIndex = index;
    editFlag = true;
}

// remove data from the local storage at given index
function deleteData(index) {

  if(editFlag){
      alert("Please update your data first.");
      return;
  }
  if(confirm('Do you want to delete this record?')){
      userDataArray.splice(index, 1);
      localStorage.userRecord = JSON.stringify(userDataArray);
      init();
  }
}

// reset the sign up form
function onFormReset(){
    document.querySelectorAll('input').forEach(inputTag => {
        inputTag.value = '';
    })
    document.querySelector("#submit").innerHTML = "submit";
    document.querySelector("#email").disabled = false;
    document.querySelector("#name").focus();

    resetTableStyle();
    selectedIndex = null;
    editFlag = false;
}

// insert data in the local storage
function onFormSubmit(){
    const allInputs = document.querySelectorAll("input");
    if (!Array.from(allInputs).every(validateInput)) return; // validate all user input in the form

    // retrieve value of each input and store it in an object
    let userObject = {};
    for (let i = 0; i < allInputs.length - 1; i++) {
        userObject[allInputs[i].id] = allInputs[i].value;
    }

    // for new user registration, check its email id with already registered users
    if (!editFlag) {
        for (let i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i].email === userObject.email) {
                const email = document.getElementById("email");
                setErrorMsg(email, "Please enter a new email id").then(alertEmailExits);
                return;
            }
        }
    }

    // putting user data in the local storage
    if (selectedIndex === null) {
        userDataArray.push(userObject);
    } else {
        userDataArray.splice(selectedIndex, 1, userObject);
    }
    localStorage.userRecord = JSON.stringify(userDataArray);
    init();
    onFormReset();
}

// show data in the table
function showData(userData, index) {
    const table = document.querySelector("#tablerows");
    const newRow = table.insertRow(-1);
    let cell = newRow.insertCell(-1);
    cell.innerHTML = index + 1 + '.';

    for ( let property in userData) {
        if( property === 'password') continue; // to not show password in the table
        cell = newRow.insertCell(-1);
        cell.innerHTML = userData[property];
    }

    // insert edit and delete buttons for each row of table
    cell = newRow.insertCell(-1);
    cell.innerHTML = '<button onClick="editData('+index+')"> Edit </button> <button onClick="deleteData('+index+')"> Delete </button>';
}

// populate the table when page reloads or an operation is performed
function init(){
    document.getElementById("tablerows").innerHTML = "";
    if(localStorage.userRecord){
        userDataArray = JSON.parse(localStorage.userRecord);
        userDataArray.forEach(showData);
    }
}

// on Enter key press
document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        onFormSubmit();
    }
});