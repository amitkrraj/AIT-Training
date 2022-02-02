var selectedRow = null
window.onload = function(){showData()};
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            showData();
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["firstName"] = document.getElementById("firstName").value;
    formData["secondName"] = document.getElementById("secondName").value;
    formData["email"] = document.getElementById("email").value;
    formData["number"] = document.getElementById("number").value;
    formData["psw"] = document.getElementById("psw").value;

    saveData(formData);

    return formData;
}



function saveData(data)
{
// let firstname,email,psw, secondname, number ;
// name=document.getElementById("firstname").value;
// secondname=document.getElementById("secondname").value;
// email=document.getElementById("email").value;

// psw=document.getElementById("psw").value;

// number =document.getElementById("number").value;

let user_records=new Array();
user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
if(user_records.some((v)=>{return v.email==email}))
{
  alert("duplicate data");
}
else
{
  user_records.push({
  "firstname":data.firstName,
  "secondname" : data.secondName,
  "email":data.email,
  "psw":data.psw,
  "number" : data.number,
})
localStorage.setItem("users",JSON.stringify(user_records));
}

}

function insertNewRecord(data) {
    var table = document.getElementById('tablebody');
    var newRow = table.insertRow();
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstname;
    cell4 = newRow.insertCell(1);
    cell4.innerHTML = data.secondname;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.number;

    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;


}

function showData()
{
    document.getElementById("#tablebody").innerHTML = "";
  let user_records=new Array();
  user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
  if(user_records)
  {
    for(let i=0;i<user_records.length;i++)
    {
        insertNewRecord(user_records[i]);
    }
  }
  }

function resetForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("number").value = "";
    document.getElementById("secondName").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("firstName").value = selectedRow.cells[0].innerHTML;
     document.getElementById("secondName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("number").value = selectedRow.cells[3].innerHTML;
    // document.getElementById("psw").value = selectedRow.cells[3].innerHTML;

    var user_records=new Array();
     user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]

        user_records[selectedRow.rowIndex].firstName = document.getElementById("firstName").value;
        user_records[selectedRow.rowIndex].secondName = document.getElementById("secondName").value;
        user_records[selectedRow.rowIndex].email = document.getElementById("email").value;
        user_records[selectedRow.rowIndex].number = document.getElementById("number").value;
        localStorage.setItem('users', JSON.stringify(user_records));
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.firstName;
    selectedRow.cells[1].innerHTML = formData.secondName;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.number;

}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
       // let index = faveGif.findIndex(id => id == "ewfewfew");
       var user_records=new Array();
       user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
       user_records.splice(row.rowIndex-1, 1);
       localStorage.setItem('users',JSON.stringify(user_records));
    }
    resetForm();
    showData();
}
function validate() {
    isValid = true;

    let firstName, secondName, number, email, psw, cnfpsw;
    firstName = document.getElementById("firstName").value;
    secondName = document.getElementById("secondName").value;
    number = document.getElementById("number").value;
    email = document.getElementById("email").value;
    psw = document.getElementById("psw").value;
    cnfpsw = document.getElementById("cnfpsw").value;


    if ( firstName == "") {
        isValid = false;
        document.getElementById('firstNameValidationError').innerHTML = "Required";
        document.getElementById("firstNameValidationError").classList.remove("hide");

    }
    else if((firstName.length <= 2) || (firstName.length > 20)) {
        isValid = false;
        document.getElementById('firstNameValidationError').innerHTML =" ** First name length must be between 3 and 20";
        document.getElementById("firstNameValidationError").classList.remove("hide");
    }
    else  if(!isNaN(firstName)){
        isValid = false;
        document.getElementById('firstNameValidationError').innerHTML =" ** only characters are allowed";
        document.getElementById("firstNameValidationError").classList.remove("hide");
    }

    else {
        isValid = true;
        if (!document.getElementById("firstNameValidationError").classList.contains("hide"))
            document.getElementById("firstNameValidationError").classList.add("hide");
    }
    if (secondName == "") {
        isValid = false;
        document.getElementById('secondNameValidationError').innerHTML = "Required";
        document.getElementById("secondNameValidationError").classList.remove("hide");
    }
    else if((secondName.length <= 2) || (secondName.length > 20)) {
        isValid = false;
        document.getElementById('secondNameValidationError').innerHTML =" ** Second name length must be between 3 and 20";
        document.getElementById("secondNameValidationError").classList.remove("hide");
    }
    else  if(!isNaN(secondName)){
        document.getElementById('secondNameValidationError').innerHTML =" ** only characters are allowed";
         document.getElementById("secondNameValidationError").classList.remove("hide");
        isValid = false;
    }

    else {
        isValid = true;
        if (!document.getElementById("secondNameValidationError").classList.contains("hide"))
            document.getElementById("secondNameValidationError").classList.add("hide");
    }

     if(email == ""){
               isValid = false;
                document.getElementById('emailValidationError').innerHTML = "Required";
                document.getElementById("emailValidationError").classList.remove("hide");
            }
            else if(email.indexOf('@') <= 0 ){
                 isValid = false;
                document.getElementById('emailValidationError').innerHTML =" ** @ Invalid Position";
                document.getElementById("emailValidationError").classList.remove("hide");
            }

            else if((email.charAt(email.length-4)!='.') && (emails.charAt(email.length-3)!='.')){
                isValid = false;
                document.getElementById('email').innerHTML =" ** . Invalid Position";
                document.getElementById("emailValidationError").classList.remove("hide");
            }
              else{
                isValid = true;
                if (!document.getElementById("emailValidationError").classList.contains("hide"))
                    document.getElementById("emailValidationError").classList.add("hide");
            }

    if(number == ""){
                isValid = false;
                document.getElementById('numberValidationError').innerHTML = "Required";
                document.getElementById("numberValidationError").classList.remove("hide");
            }
           else if(isNaN(number)){
                isValid = false;
                document.getElementById('numberValidationError').innerHTML =" ** user must write digits only not characters";
                document.getElementById("numberValidationError").classList.remove("hide");
            }
           else if(number.length!=10){
                isValid = false;
                document.getElementById('numberValidationError').innerHTML =" ** Mobile Number must be 10 digits only";
                document.getElementById("numberValidationError").classList.remove("hide");
            }
            else{
                isValid = true;
                if (!document.getElementById("numberValidationError").classList.contains("hide"))
                    document.getElementById("numberValidationError").classList.add("hide");
            }



    if(psw == ""){
         isValid = false;
        document.getElementById('pswValidationError').innerHTML = "Required";
        document.getElementById("pswValidationError").classList.remove("hide");
    }
    else if((psw.length < 5) || (psw.length > 20)) {
         isValid = false;
        document.getElementById('pswValidationError').innerHTML =" ** Passwords lenght must be between  5 and 20";
        document.getElementById("pswValidationError").classList.remove("hide");
    }
    else if(psw != document.getElementById("cnfpsw").value){
        isValid = false;
        document.getElementById('pswValidationError').innerHTML =" ** Password does not match the confirm password";
        document.getElementById("pswValidationError").classList.remove("hide");
    }
    else{
        isValid = true;
        if (!document.getElementById("pswValidationError").classList.contains("hide"))
            document.getElementById("pswValidationError").classList.add("hide");
    }
    return isValid;


}
