// videoPlayer.js

function initVideoPlayer(config) {

    const video = document.getElementById(config.video);

    const controls =
        document.getElementById(config.controls);

    const playPause =
        document.getElementById(config.playPause);

    const rewind =
        document.getElementById(config.rewind);

    const forward =
        document.getElementById(config.forward);

    const currentTime =
        document.getElementById(config.currentTime);

    const duration =
        document.getElementById(config.duration);

    const timeline =
        document.getElementById(config.timeline);

    const timelineProgress =
        document.getElementById(config.timelineProgress);

    const timelineThumb =
        document.getElementById(config.timelineThumb);

    const timePreview =
        document.getElementById(config.timePreview);

    let controlsTimer;

    function formatTime(seconds) {

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    function showControls() {

        controls.style.opacity = "1";
        controls.style.pointerEvents = "auto";

        clearTimeout(controlsTimer);

        controlsTimer = setTimeout(() => {

            if (!video.paused) {

                controls.style.opacity = "0";
                controls.style.pointerEvents = "none";
            }

        }, 2500);
    }

    function updatePlayButton() {

        playPause.innerHTML =
            video.paused ? "▶" : "⏸";
    }

    playPause.addEventListener("click", () => {

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    video.addEventListener("play", () => {

        updatePlayButton();
        showControls();
    });

    video.addEventListener("pause", () => {

        updatePlayButton();

        controls.style.opacity = "1";
        controls.style.pointerEvents = "auto";
    });

video.addEventListener("mousemove", () => {

    showControls();
});

controls.addEventListener("mousemove", () => {

    showControls();
});

video.addEventListener("click", () => {

    showControls();
});

    video.addEventListener("loadedmetadata", () => {

        duration.textContent =
            formatTime(video.duration);
    });

    video.addEventListener("timeupdate", () => {

        const mins =
            Math.floor(video.currentTime / 60);

        const secs =
            Math.floor(video.currentTime % 60);

        const percent =
            (video.currentTime / video.duration) * 100;

        timelineProgress.style.width =
            `${percent}%`;

        timelineThumb.style.left =
            `${percent}%`;

        currentTime.textContent =
            formatTime(video.currentTime);
    });

    rewind.addEventListener("click", () => {

        video.currentTime =
            Math.max(0, video.currentTime - 10);
    });

    forward.addEventListener("click", () => {

        video.currentTime =
            Math.min(
                video.duration,
                video.currentTime + 10
            );
    });

    timeline.addEventListener("click", (e) => {

        const rect =
            timeline.getBoundingClientRect();

        const clickX =
            e.clientX - rect.left;

        const percent =
            clickX / rect.width;

        video.currentTime =
            percent * video.duration;
    });

    timeline.addEventListener("mousemove", (e) => {

        const rect =
            timeline.getBoundingClientRect();

        const percent =
            (e.clientX - rect.left) / rect.width;

        const previewTime =
            percent * video.duration;

        timePreview.style.opacity = "1";

        timePreview.style.left =
            `${percent * 100}%`;

        timePreview.textContent =
            formatTime(previewTime);
    });

    timeline.addEventListener("mouseleave", () => {

        timePreview.style.opacity = "0";
    });

    return {
        video,
        showControls
    };
}