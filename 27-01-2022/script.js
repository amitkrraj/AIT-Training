let gameNumber = 1;
let win = 0;

const onSubmit = () =>{
    const userNumber = (document.getElementById("input").value)%10;
    const random = Math.floor(Math.random() * 10);

    document.getElementById("gameNumber").innerHTML = gameNumber;

    if (userNumber == random && win < gameNumber / 10) {
        win++;
        alert("Congratulations, You won!");
    } else if (gameNumber%10===0 && win < gameNumber / 10) {
        win++;
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