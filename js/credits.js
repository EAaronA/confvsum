let songs = [];

const songList =
document.getElementById("songList");

const songDetails =
document.getElementById("songDetails");

const backBtn =
document.getElementById("backBtn");

const unlockScreen =
document.getElementById("unlockScreen");

// ==============================
// BOTÓN RETURN
// ==============================

backBtn.addEventListener("click", () => {

    // Guardar progreso

    localStorage.setItem(
        "visitedCredits",
        "true"
    );

    // Verificar desbloqueo del Live

    checkLiveSessionUnlock();

    // Mostrar pantalla de transición

    unlockScreen.classList.add("show");

});

// ==============================
// CARGAR JSON
// ==============================

async function loadSongs(){

    try{

        const response =
        await fetch("../data/songs.json");

        songs =
        await response.json();

        renderSongs();

    }

    catch(error){

        console.error(
            "Error cargando JSON:",
            error
        );

    }

}

// ==============================
// RENDER LISTA
// ==============================

function renderSongs(){

    songList.innerHTML = "";

    songs.forEach(song => {

        const div =
        document.createElement("div");

        div.className =
        "song-item";

        div.textContent =
        song.title;

        div.addEventListener(
            "click",
            () => showSong(song)
        );

        songList.appendChild(div);

    });

}

// ==============================
// MOSTRAR INFORMACIÓN
// ==============================

function showSong(song){

    let creditosHTML = "";

    for(const key in song.Créditos){

        creditosHTML += `
            <p>
                <strong>${key}:</strong>
                ${song.Créditos[key]}
            </p>
        `;

    }

    songDetails.innerHTML = `

        <h2>${song.title}</h2>

        <div class="section">

            <h3>Contexto</h3>

            <p>${song.Contexto}</p>

        </div>

        <div class="section">

            <h3>Significado</h3>

            <p>${song.Significado}</p>

        </div>

        <div class="section">

            <h3>Créditos</h3>

            ${creditosHTML}

        </div>

    `;

}

loadSongs();