console.log("start javascript")

let songs = [];
let currentSong = new Audio();
let currfolder;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currfolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/music/${folder}/`)
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }

    }
    let songUL = document.querySelector(".showsongs").getElementsByTagName("ul")[0]
    songUL.innerHTML = "";
    for (const song of songs) {

        songUL.innerHTML = songUL.innerHTML + `<li>
                        <img src="music.svg" alt="">
                        <div class="infor">
                       
                            <div>${decodeURIComponent(song)
                .split("\\")
                .slice(-1)[0].replace(/_/g, " ")
                .replace(".mp3", "")}
                        </div>
                            <div>artist name</div>
                        </div>
                        <div class="ply">
                            <span>play song</span>
                            <img src="img/playsong.svg" alt="">
                        </div></li>`;
    }
    Array.from(document.querySelector(".showsongs").getElementsByTagName("li")).forEach((e, index) => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".infor").firstElementChild.innerHTML)
            // playMusic(e.querySelector(".infor").firstElementChild.innerHTML)
            playMusic(songs[index])
        })
    })
    return songs;
}
const playMusic = (track, pause = false) => {
    // let audio = new Audio(track)
    currentSong.src = track
    if (!pause) {
        currentSong.play()
        play.src = "img/pause.svg"
    }
    //document.querySelector(".songinfo").innerHTML = decodeURIComponent(track).split("\\songs\\")[1].replace(/_/g, " ").replace(".mp3", "")
    document.querySelector(".songinfo").innerHTML = decodeURIComponent(track)
        .split("\\")
        .slice(-1)[0]
        .replace(/_/g, " ")
        .replace(".mp3", "")
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00 "

}

////////show imgs
////////
async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/music/`)

    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")

    let trandingsongs = document.querySelector(".trandingsongs")
    trandingsongs.innerHTML = "";
    
    Array.from(anchors).forEach(async e => {
        console.log("link:", e.href);

        let decoded = decodeURIComponent(e.href)

        if (decoded.includes("\\music\\") &&
            !decoded.endsWith(".mp3")) {
            let folder = decoded
                .split("\\music\\")[1]
                .replace(/[\\/]+$/, "");
            console.log("folder:", folder);
            console.log(`/music/${folder}/img/cover.jpg`)


            // Get the metadata of the folder
            let a = await fetch(`http://127.0.0.1:3000/music/${folder}/info.json`)
            let response = await a.json();
            console.log(response)

                                       trandingsongs.innerHTML += `
                            <div data-folder="${folder}" class="card">

                                <div class="play">
                                    <button class="spotify-play-btn">
                                        <svg viewBox="0 0 24 24"
                                             fill="black"
                                             xmlns="http://www.w3.org/2000/svg">

                                            <polygon points="6,3 20,12 6,21"/>
                                        </svg>
                                    </button>
                                </div>

                                <img src="http://127.0.0.1:3000/music/${folder}/cover.jpg" alt="">

                                <h2>${response.title}</h2>

                                <p>${response.description}</p>

                            </div>
                            `;
        }
    })
    setTimeout(() => {
    Array.from(document.getElementsByClassName("card")).forEach(e => {

        e.addEventListener("click", async () => {

            songs = await getSongs(e.dataset.folder);

            console.log(songs);

        });

    });
}, 500);
}



/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

async function main() {
    //get songs 
    songs = await getSongs("SOTY - songs")
    playMusic(songs[0], true)

    displayAlbums()


    // let songUL = document.querySelector(".showsongs").getElementsByTagName("ul")[0]
    // songUL.innerHTML = ""; 
    // for (const song of songs) {

    //     songUL.innerHTML = songUL.innerHTML + `<li>
    //                     <img src="music.svg" alt="">
    //                     <div class="infor">

    //                         <div>${decodeURIComponent(song)
    //                             .split("\\")
    //                             .slice(-1)[0].replace(/_/g, " ")
    //                             .replace(".mp3", "")}
    //                     </div>
    //                         <div>artist name</div>
    //                     </div>
    //                     <div class="ply">
    //                         <span>play song</span>
    //                         <img src="playsong.svg" alt="">
    //                     </div></li>`;
    // }




    // Attach an event listener to each song
    // Array.from(document.querySelector(".showsongs").getElementsByTagName("li")).forEach((e, index) => {
    //     e.addEventListener("click", element => {
    //         console.log(e.querySelector(".infor").firstElementChild.innerHTML)
    //         // playMusic(e.querySelector(".infor").firstElementChild.innerHTML)
    //         playMusic(songs[index])
    //     })
    // })

    // // Attach an event listener to playbar
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "img/pause.svg"
        } else {
            currentSong.pause()
            play.src = "img/playsong.svg"
        }
    })

    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100

    })

    //add event listener for ham
    document.querySelector(".ham").addEventListener("click", () => {
        let left = document.querySelector(".left")
        if (left.style.left == "0%") {
            left.style.left = "-125%"
        }
        else {
            left.style.left = "0%"
        }

    })

    //add addEventListener to previous
    pre.addEventListener("click", () => {
        console.log("previuos clicked")
        let index = songs.indexOf(currentSong.src)
        console.log(songs, index)
        if (index > 0) {
            playMusic(songs[index - 1])
        }

    })

    //add addEventListener to next
    next.addEventListener("click", () => {
        console.log("next clicked")
        let index = songs.indexOf(currentSong.src)
        console.log(songs, index)
        console.log("next clicked")
        if (songs[index + 1]) {
            playMusic(songs[index + 1])
        }
    })

    //add addEventListener to vloume buttons 
    let vol = document.getElementById("vol");

    vol.addEventListener("click", () => {
        if (currentSong.volume > 0) {
            currentSong.volume = 0;
            vol.src = "img/mute.svg";
        }
        else {
            currentSong.volume = 1;
            vol.src = "img/volume.svg";
        }
    })

    //volumebar addEventListener
    document.querySelector(".range").addEventListener("input", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100
        if(currentSong.volume > 0){
            vol.src = "img/volume.svg"
        }
        if(currentSong.volume == 0){
            vol.src = "img/mute.svg"
        }
    })

    //loadosngs when card is clicked
    // Array.from(document.getElementsByClassName("card")).forEach(e => {
    //     e.addEventListener("click", async item => {
    //         songs = await getSongs(e.dataset.folder)
    //         console.log(songs);
    //     })

    // });

    //play songs
    //var audio = new Audio(songs[0]);
    // audio.play();
    //playing
    // audio.addEventListener("loadeddata", () => {
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime)
    // });


}


main()