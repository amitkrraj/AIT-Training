const array = [];

function addFeedback() {
    const feedback = document.getElementById("feedback");
    array.push(feedback.value);
    feedback.value = "";

    const result = document.getElementById("result");
    const heading = document.createElement("h2");
    heading.innerHTML = "Feedback Details";
    result.appendChild(heading);

    const message = document.createElement("p");
    message.innerHTML = "Successfully Added Feedback Details!";
    result.appendChild(message);
}
function displayFeedback() {
    const result = document.getElementById("result");
    result.innerHTML = "";

    const heading = document.createElement("h2");
    heading.innerHTML = "Feedback Details";
    result.appendChild(heading);

    for (let i = 0; i < array.length; i++) {
        const feedback = document.createElement("p");
        feedback.innerHTML = "Feedback " + (i + 1);
        const message = document.createElement("p");
        message.innerHTML = array[i];
        result.appendChild(feedback);
        result.appendChild(message);
    }
}
