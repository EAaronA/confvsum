// ===============================
// ELEMENTOS DEL DOM
// ===============================

const lyricsMenu = document.getElementById("lyricsMenu");
const playerContainer = document.getElementById("playerContainer");
const lyricVideo = document.getElementById("lyricVideo");

const backBtn = document.getElementById("backBtn");
const backtoLyBtn = document.getElementById("backtoLyBtn");

const unlockScreen = document.getElementById("unlockScreen");

// ===============================
// ESTADO INICIAL
// ===============================

playerContainer.style.display = "none";
unlockScreen.classList.remove("show");

backBtn.style.display = "block";
backtoLyBtn.style.display = "none";

// ===============================
// ABRIR VIDEO
// ===============================

document.querySelectorAll(".song-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        localStorage.setItem("visitedLyrics", "true");
        checkLiveSessionUnlock();

        lyricVideo.src = btn.dataset.video;

        lyricsMenu.style.display = "none";
        playerContainer.style.display = "block";

        // Cambiar botones
        backBtn.style.display = "none";
        backtoLyBtn.style.display = "block";

        lyricVideo.load();
        lyricVideo.play();

    });

});

// ===============================
// RETURN DEL MENÚ PRINCIPAL
// ===============================

backBtn.addEventListener("click", () => {

    unlockScreen.classList.add("show");

});

// ===============================
// RETURN DEL REPRODUCTOR
// ===============================

backtoLyBtn.addEventListener("click", () => {

    lyricVideo.pause();
    lyricVideo.currentTime = 0;

    lyricVideo.removeAttribute("src");
    lyricVideo.load();

    playerContainer.style.display = "none";
    lyricsMenu.style.display = "grid";

    backtoLyBtn.style.display = "none";
    backBtn.style.display = "block";

});

// ===============================
// INICIALIZAR REPRODUCTOR
// ===============================

initVideoPlayer({

    video: "lyricVideo",

    controls: "controls",

    playPause: "playPause",

    rewind: "rewind",

    forward: "forward",

    currentTime: "currentTime",

    duration: "duration",

    timeline: "timeline",

    timelineProgress: "timelineProgress",

    timelineThumb: "timelineThumb",

    timePreview: "timePreview"

});