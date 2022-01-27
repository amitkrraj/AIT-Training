let gameNumber = 1;
let win = 0;
let winRation = 1;

const onSubmit = () =>{
    const userNumber = document.getElementById("input").value;
    const random = Math.floor(Math.random() * 100) + 1;

    document.getElementById("gameNumber").innerHTML = gameNumber;

    if (userNumber == random && win < gameNumber / 10) {
        win++;
        winRation++;
        alert("Congratulations, You won!");
    } else if (winRation == gameNumber / 10 && win < gameNumber / 10) {
        win++;
        winRation++;
        alert("Congratulations, You won!");
    }
    document.getElementById("win").innerHTML = win;
    gameNumber++;
}

document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        onSubmit();
    }
});