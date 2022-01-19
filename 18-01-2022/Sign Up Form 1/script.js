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

  // const detailsArray = [name, age, email, mob];

  // for(let i=0; i<4; i++){
  //   console.log(detailsArray[i]);
  // }
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
  }

  if (!email) {
    errorMessage = "Field can't be empty";
    document.querySelector("#error-email").innerHTML = errorMessage;
    return;
  }
  if (!mobile) {
    errorMessage = "Field can't be empty";
    document.querySelector("#error-mobile").innerHTML = errorMessage;
    return;
  }
  if (!password) {
    errorMessage = "Field can't be empty";
    document.querySelector("#error-mobile").innerHTML = errorMessage;
    return;
  }

  document.getElementsByClassName("error").innerHTML = "";

  const table = document.querySelector('#table');
  const newRow = document.createElement('tr');
  table.appendChild(newRow);

  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);
  const cell5 = newRow.insertCell(4);

  cell1.innerHTML = name;
  cell2.innerHTML = age;
  cell3.innerHTML = email;
  cell4.innerHTML = mobile;
  cell5.innerHTML = password;

}

const button = document.querySelector('#save-data');

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    event.preventDefault();
    addDetails();
  }
});

button.addEventListener('click', addDetails);
