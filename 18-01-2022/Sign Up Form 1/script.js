// function isAge(age) {

//   let errorMessage;
//   if(!age){
//     errorMessage = "Field can't be empty";
//     document.querySelector("#error-age").innerHTML = errorMessage;
//   }
//   if(isNaN(age) || x < 0 || x > 150){
//     errorMessage = "Field can't be empty";
//     document.querySelector("#error-age").innerHTML = errorMessage;
//   };
// }

function addDetails(){
  const name = document.querySelector('#name').value.trim();
  const age = document.querySelector('#age').value.trim();
  const email = document.querySelector('#email').value.trim();
  const mobile = document.querySelector('#mobile').value.trim();
  const password = document.querySelector('#password').value.trim();

  let errorMessage;
  if (!name) {
    errorMessage = "Field can't be empty";
    document.querySelector("#error-name").innerHTML = errorMessage;
    return;
  } else if(name.length<3){
    errorMessage = "Length must be greater than 3";
    document.querySelector("#error-name").innerHTML = errorMessage;
    return;
  }

  if (!age){
    errorMessage = "Field can't be empty";
    document.querySelector("#error-age").innerHTML = errorMessage;
    return;
  } else if(isNaN(age) || age<0 || age>150){
    errorMessage = "Invalid Input";
    document.querySelector("#error-age").innerHTML = errorMessage;
    return;
  }

  if (!email) {
    errorMessage = "Field can't be empty";
    document.querySelector("#error-email").innerHTML = errorMessage;
    return;
  }

  if (!mobile || mobile.length!=10) {
    if(!mobile)
      errorMessage = "Field can't be empty";
    else
      errorMessage = "Number must be of length 10"

    document.querySelector("#error-mobile").innerHTML = errorMessage;
    return;
  }

  if (!password) {
    errorMessage = "Field can't be empty";
    document.querySelector("#error-password").innerHTML = errorMessage;
    return;
  } else if(password.length<6){
    errorMessage = "Password length must be greater than 5";
    document.querySelector("#error-password").innerHTML = errorMessage;
    return;
  }

  // document.getElementsByClassName("error").innerHTML = "";


  const table = document.querySelector('#table');
  const newRow = document.createElement('tr');
  table.appendChild(newRow);

  const detailsArray = [name, age, email, mobile, password];

  for (let i = 0; i < 5; i++) {
    const cell1 = newRow.insertCell(i);
    cell1.innerHTML = detailsArray[i];
  }

}

const button = document.querySelector('#save-data');

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    event.preventDefault();
    addDetails();
  }
});

button.addEventListener('click', addDetails);
