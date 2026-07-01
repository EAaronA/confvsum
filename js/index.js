const cover =
document.querySelector(".album-cover");

document.addEventListener("mousemove",(e)=>{

    let x =
    (window.innerWidth/2 - e.clientX)/40;

    let y =
    (window.innerHeight/2 - e.clientY)/40;

    cover.style.transform = `
        rotateY(${-x}deg)
        rotateX(${y}deg)
    `;

});

// =========================
// LIVE SESSION
// =========================

const live =
document.getElementById("liveSession");

const liveUnlocked =
localStorage.getItem("liveSessionUnlocked") === "true";

if(liveUnlocked){

    // Cambiar apariencia
    live.classList.remove("locked");

    // Cambiar texto
    live.textContent = "LIVE SESSION";

    // Activar enlace
    live.href = "../pages/live.html";

    // Ejecutar animación SOLO la primera vez
    if(!localStorage.getItem("liveReveal")){

        localStorage.setItem(
            "liveReveal",
            "true"
        );

        live.classList.add("unlockAnimation");

    }

}