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
        errorMessage = "Field can't be empty";
        setErrorMsg(name, errorMessage);
        return false;
    } else if (nameVal.length < 3) {
        errorMessage = "Length must be greater than 3";
        setErrorMsg(name, errorMessage);
        return false;
    } else {
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
    const atSymbol = emailVal.lastIndexOf("@");
    if (atSymbol === emailVal.length - 1) return false;

    const dot = emailVal.lastIndexOf(".");
    if (dot === emailVal.length - 1 ||emailVal[dot + 1] === "." ||dot <= atSymbol + 3) return false;

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
    } else {
        setSuccessMsg(mobile);
    }
    return true;
}

// Password Validation
function validatePassword(password) {
    const passwordVal = password.value.trim();
    let errorMessage;

    if (!passwordVal) {
        errorMessage = "Field can't be empty";
        setErrorMsg(password, errorMessage);
        return false;
    } else if (passwordVal.length <6 || passwordVal.length>25) {
        errorMessage = "Password length must be between 6 to 25";
        setErrorMsg(password, errorMessage);
        return false;
    } else if(isNaN(passwordVal)){
        errorMessage = "Password must contain an alphabet and a special character";
        setErrorMsg(password, errorMessage);
        return false;
    }
    else {
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
// Function for adding Details in the Table
function addDetails() {
    const name = document.querySelector("#name");
    const age = document.querySelector("#age");
    const email = document.querySelector("#email");
    const mobile = document.querySelector("#mobile");
    const password = document.querySelector("#password");
    const cnfpassword = document.querySelector("#cpassword");

    if (!validateName(name)) return;
    if (!validateAge(age)) return;
    if (!validateEmail(email)) return;
    if (!validateMobile(mobile)) return;
    if (!validatePassword(password)) return;
    if (!validateConfirmPassword(cnfpassword, password)) return;

    const table = document.querySelector("#table");
    const newRow = document.createElement("tr");
    table.appendChild(newRow);

    const storeDetails = [name, age, email, mobile, password];


    for (let i = 0; i < 5; i++) {
        const cell = newRow.insertCell(i);
        cell.innerHTML = storeDetails[i].value.trim();
    }
}

const button = document.querySelector("#save-data");

button.addEventListener("click", addDetails);
document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        addDetails();
    }
});
