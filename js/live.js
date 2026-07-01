
// VERIFICAR DESBLOQUEO

const unlocked =
localStorage.getItem(
    "liveSessionUnlocked"
) === "true";

if(!unlocked){

    window.location.href =
    "../index.html";

}

// ELEMENTOS

const startBtn =
document.getElementById("startBtn");

const introScreen =
document.getElementById("introScreen");

const introVideoScreen =
document.getElementById("introVideoScreen");

const introVideo =
document.getElementById("introVideo");

const acceptBtn =
document.getElementById("acceptBtn");

const skipIntroBtn =
document.getElementById("skipIntroBtn");

const introViewed =
localStorage.getItem(
    "liveIntroViewed"
) === "true";

const playerContainer =
document.getElementById("playerContainer");

const backBtn =
document.getElementById("backBtn");

const finalScreen =
document.getElementById("finalScreen");

// REPRODUCTOR

const player = initVideoPlayer({

    video:"liveVideo",

    controls:"controls",

    playPause:"playPause",

    rewind:"rewind",

    forward:"forward",

    currentTime:"currentTime",

    duration:"duration",

    timeline:"timeline",

    timelineProgress:"timelineProgress",

    timelineThumb:"timelineThumb",

    timePreview:"timePreview"

});

// ENTRAR AL LIVE

startBtn.addEventListener("click",()=>{

    introScreen.style.display = "none";

    introVideoScreen.style.display = "flex";

    introVideo.play();

    if(introViewed){

        setTimeout(()=>{

            skipIntroBtn.style.display = "block";

        },3000);

    }

});

// TERMINA INTRO

introVideo.addEventListener("ended",()=>{

    localStorage.setItem(
        "liveIntroViewed",
        "true"
    );

    acceptBtn.classList.add("show");

});

// ACEPTAR

acceptBtn.addEventListener("click",()=>{

    skipIntroBtn.style.display = "none";

    acceptBtn.classList.remove("show");

    introVideoScreen.style.display = "none";

    playerContainer.style.display = "block";

    backBtn.style.display = "block";

    player.video.play();

});

// TERMINA LIVE SESSION

player.video.addEventListener("ended",()=>{

    playerContainer.style.display = "none";

    backBtn.style.display = "none";

    finalScreen.classList.add("show");

});

// RETURN

backBtn.addEventListener("click",()=>{

    player.video.pause();

    player.video.currentTime = 0;

    playerContainer.style.display = "none";

    finalScreen.classList.add("show");

});

// SKIP INTRO

skipIntroBtn.addEventListener("click",()=>{

    introVideo.pause();

    introVideo.currentTime = 0;

    introVideoScreen.style.display = "none";

    skipIntroBtn.style.display = "none";

    acceptBtn.classList.remove("show");

    playerContainer.style.display = "block";

    backBtn.style.display = "block";

    player.video.play();

});