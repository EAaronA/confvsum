const startBtn =
document.getElementById("startBtn");

const introScreen =
document.getElementById("introScreen");

const playerContainer =
document.getElementById("playerContainer");

const introVideo =
document.getElementById("introVideo");

startBtn.addEventListener("click", () => {

    introScreen.style.display =
    "none";

    playerContainer.style.display =
    "block";

    introVideo.play();

});

introVideo.addEventListener("ended", () => {

    window.location.href =
    "live.html";

});