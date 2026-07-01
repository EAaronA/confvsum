let songs = [];
let currentIndex = 0;

const trackList =
document.getElementById("trackList");

const currentSong =
document.getElementById("currentSong");

const playBtn =
document.getElementById("playBtn");

const backBtn =
document.getElementById("backBtn");

const container =
document.querySelector(".container");

const playerSection =
document.getElementById("playerSection");

const unlockScreen =
document.getElementById("unlockScreen");

const wavesurfer = WaveSurfer.create({

    container:"#waveform",

    waveColor:"#333",

    progressColor:"#c6ff00",

    cursorColor:"#c6ff00",

    height:20,

    barWidth:2,

    barGap:1,

    barRadius:2

});

// Audio listo
wavesurfer.on("ready",()=>{

    console.log("Audio cargado");

});

// Cambiar icono cuando termina la canción
wavesurfer.on("finish",()=>{

    playBtn.textContent = "▶";

});

// =======================
// Información de la canción
// =======================

function renderSongInfo(song){

    const songInfo =
    document.getElementById("songInfo");

    let html = "";

    for(const key in song.credits){

        html += `

            <p>

                <strong>${key}:</strong>

                ${song.credits[key]}

            </p>

        `;

    }

    songInfo.innerHTML = html;

}

// =======================
// Cargar canción
// =======================

function loadTrack(index){

    const song = songs[index];

    currentIndex = index;

    currentSong.textContent =
    song.title;

    renderSongInfo(song);

    wavesurfer.load(song.audio);

    document
    .querySelectorAll("#trackList li")
    .forEach(li=>{

        li.classList.remove("active");

    });

    document
    .querySelector(
        `#trackList li[data-index="${index}"]`
    )
    ?.classList.add("active");

}

// =======================
// Lista de canciones
// =======================

function renderTrackList(){

    trackList.innerHTML = "";

    songs.forEach((song,index)=>{

        const li =
        document.createElement("li");

        li.textContent =
        `${String(index+1).padStart(2,"0")} ${song.title}`;

        li.dataset.index =
        index;

        li.addEventListener("click",()=>{

            loadTrack(index);

            wavesurfer.once("ready",()=>{

                wavesurfer.play();

                playBtn.textContent = "⏸";

            });

        });

        trackList.appendChild(li);

    });

}

// =======================
// Leer JSON
// =======================

async function loadSongs(){

    try{

        const response =
        await fetch("../data/songs.json");

        songs =
        await response.json();

        renderTrackList();

        loadTrack(0);

    }

    catch(error){

        console.error(
            "Error cargando canciones:",
            error
        );

    }

}

// =======================
// Botones
// =======================

document
.getElementById("nextBtn")
.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= songs.length){

        currentIndex = 0;

    }

    loadTrack(currentIndex);

});

document
.getElementById("prevBtn")
.addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex < 0){

        currentIndex =
        songs.length-1;

    }

    loadTrack(currentIndex);

});

playBtn.addEventListener("click",()=>{

    wavesurfer.playPause();

    playBtn.textContent =

    wavesurfer.isPlaying()

    ? "⏸"

    : "▶";

});

// =======================
// RETURN
// =======================

backBtn.addEventListener("click", (e) => {
    localStorage.setItem(
    "visitedSongSelection",
    "true"
);

    checkLiveSessionUnlock();
    e.preventDefault();

    wavesurfer.pause();

    // Ocultar toda la interfaz
    document.querySelector(".container").style.display = "none";
    document.getElementById("playerSection").style.display = "none";

    // Mostrar pantalla final
    unlockScreen.classList.add("show");

});
// =======================
// Iniciar
// =======================

loadSongs();