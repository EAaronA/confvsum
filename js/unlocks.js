function checkLiveSessionUnlock(){

    const fullAlbum =
    localStorage.getItem("visitedFullAlbum") === "true";

    const songSelection =
    localStorage.getItem("visitedSongSelection") === "true";

    const lyrics =
    localStorage.getItem("visitedLyrics") === "true";

    const credits =
    localStorage.getItem("visitedCredits") === "true";

    if(
        fullAlbum &&
        songSelection &&
        lyrics &&
        credits
    ){

        localStorage.setItem(
            "liveSessionUnlocked",
            "true"
        );

    }
}