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
    let errorMessage;

    if (!nameVal) {
        errorMessage = "This field is required";
        setErrorMsg(name, errorMessage);
        return false;
    } else if (nameVal.length <= 2) {
        errorMessage = "Length must be greater than or equal to 3 letters";
        setErrorMsg(name, errorMessage);
        return false;
    } else if(!isNaN(nameVal)){
        errorMessage = "Name must have at least an alphabet";
        setErrorMsg(name, errorMessage);
        return false;

    }
    else {
        setSuccessMsg(name);
    }
    return true;
}

// Age Validation
function validateAge(age) {
    const ageVal = age.value.trim();
    let errorMessage;

    if (!ageVal) {
        errorMessage = "Field can't be empty";
        setErrorMsg(age, errorMessage);
        return false;
    } else if (isNaN(ageVal)) {
        errorMessage = "Age must be a number";
        setErrorMsg(age, errorMessage);
        return false;
    } else if (ageVal <= 0 || ageVal >= 150) {
        errorMessage = "Age must be in between 0 and 150";
        setErrorMsg(age, errorMessage);
        return false;
    } else {
        setSuccessMsg(age);
    }
    return true;
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
    let errorMessage;

    if (!emailVal) {
        errorMessage = "Field can't be empty";
        setErrorMsg(email, errorMessage);
        return false;
    } else if (!emailVal.match("@")) {
        errorMessage = "@ is missing";
        setErrorMsg(email, errorMessage);
        return false;
    } else if (!isEmail(emailVal)) {
        errorMessage = "Not a valid email";
        setErrorMsg(email, errorMessage);
        return false;
    } else {
        setSuccessMsg(email);
    }
    return true;
}

// Mobile Number Validation
function validateMobile(mobile) {
    const mobileVal = mobile.value.trim();
    let errorMessage;

    if (!mobileVal) {
        errorMessage = "Field can't be empty";
        setErrorMsg(mobile, errorMessage);
        return false;
    } else if (isNaN(mobileVal)) {
        errorMessage = "Mobile number must be digits";
        setErrorMsg(mobile, errorMessage);
        return false;
    } else if (mobileVal.length != 10) {
        errorMessage = "Mobile number must be equal to 10 digits";
        setErrorMsg(mobile, errorMessage);
        return false;
    } else if (mobileVal < 6000000000) {
        errorMessage = "Not a valid number";
        setErrorMsg(mobile, errorMessage);
        return false;
    } else {
        setSuccessMsg(mobile);
    }
    return true;
}

// Password Validation
function validatePassword(password) {
    const passwordVal = password.value.trim();

    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialCharacters = /[^a-zA-Z\d]/g;

    let errorMessage;

    if (!passwordVal) {
        errorMessage = "Field can't be empty";
        setErrorMsg(password, errorMessage);
        return false;
    } else if (passwordVal.length <6 || passwordVal.length>25) {
        errorMessage = "Password length must be between 6 to 25";
        setErrorMsg(password, errorMessage);
        return false;
    } else if (!passwordVal.match(lowerCaseLetters)) {
        errorMessage = "Password must contain a lower case";
        setErrorMsg(password, errorMessage);
        return false;
    } else if (!passwordVal.match(upperCaseLetters)) {
        errorMessage = "Password must contain an upper case";
        setErrorMsg(password, errorMessage);
        return false;
    } else if (!passwordVal.match(numbers)) {
        errorMessage = "Password must contain a number";
        setErrorMsg(password, errorMessage);
        return false;
    } else if (!passwordVal.match(specialCharacters)) {
        errorMessage = "Password must contain a special character";
        setErrorMsg(password, errorMessage);
        return false;
    } else {
        setSuccessMsg(password);
    }
    return true;
}
// Confirm Password
function validateConfirmPassword(cnfpassword, password) {
    const cnfpasswordVal = cnfpassword.value.trim();
    const passwordVal = password.value.trim();
    let errorMessage;

    if (!cnfpasswordVal) {
        errorMessage = "Field can't be empty";
        setErrorMsg(cnfpassword, errorMessage);
        return false;
    } else if (cnfpasswordVal != passwordVal) {
        errorMessage = "Password do not match";
        setErrorMsg(cnfpassword, errorMessage);
        return false;
    } else {
        setSuccessMsg(cnfpassword);
    }
    return true;
}

let selectedRow = null;
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

function insertNewRecord(formData) {

  const table = document.querySelector("#storeData").getElementsByTagName('tbody')[0];
  const newRow = table.insertRow(table.length);

  for (let i = 0; i < 5; i++) {
      const cell = newRow.insertCell(i);
      cell.innerHTML = formData[i];
  }
  const cell = newRow.insertCell(5);
  cell.innerHTML = `<button onClick='editData(this)'> Edit </button>
                    <button onClick='deleteData(this)'> Delete </button>`;
}

// edit the data
function editData(td){
  selectedRow = td.parentElement.parentElement;
  document.querySelector("#name").value = selectedRow.cells[0].innerHTML;
  document.querySelector("#age").value = selectedRow.cells[1].innerHTML;
  document.querySelector("#email").value = selectedRow.cells[2].innerHTML;
  document.querySelector("#mobile").value = selectedRow.cells[3].innerHTML;
  document.querySelector("#password").value = selectedRow.cells[4].innerHTML;
}

// update record
function updateData(formData) {

  let i=0;
  formData.forEach(data =>{

    if(i<=4){
        selectedRow.cells[i++].innerHTML = data;
    }
  });
//   document.querySelector("#reset").click();
    selectedRow === null;
}

// delete data
function deleteData(td) {
  // if(confirm('Do you want to d'))
  row = td.parentElement.parentElement;
  document.getElementById("#storeData").deleteRow(row.rowIndex);
}

// insert data
function onFormSubmit(){
  let formData = readFormData();

  if(!formData) return;

  if(selectedRow===null){
    insertNewRecord(formData);
  } else{
    updateData(formData);
  }
  document.querySelector("#reset").click();
}

const button = document.querySelector("#save-data");
button.addEventListener("click", onFormSubmit);

document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        onFormSubmit();
    }
});
