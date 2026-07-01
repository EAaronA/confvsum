const startBtn =
document.getElementById("startBtn");

const introScreen =
document.getElementById("introScreen");

const playerContainer =
document.getElementById("playerContainer");

const unlockScreen =
document.getElementById("unlockScreen");

const backToMenu =
document.getElementById("backToMenu");


const player = initVideoPlayer({

    video: "albumVideo",

    controls: "controls",

    playPause: "playPause",

    time: "time",

    rewind: "rewind",

    forward: "forward",

    currentTime: "currentTime",

    duration: "duration",

    timeline: "timeline",

    timelineProgress: "timelineProgress",

    timelineThumb: "timelineThumb",

    timePreview: "timePreview"
});

startBtn.addEventListener("click", () => {
    
    introScreen.style.display = "none";

    playerContainer.style.display = "block";

    backBtn.style.display = "block";

    setTimeout(() => {
        player.video.play();
    }, 50);

});

backBtn.addEventListener("click", () => {

    player.video.pause();

    playerContainer.style.display = "none";

    backBtn.style.display = "none";

    window.location.href = "../index.html";

});

player.video.addEventListener("ended", () => {

    localStorage.setItem(
        "visitedFullAlbum",
        "true"
    );

    checkLiveSessionUnlock();

    playerContainer.style.display = "none";

    unlockScreen.style.display = "flex";
});

