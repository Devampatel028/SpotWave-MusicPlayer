// console.log("start javascript")

// let currentAudio = null;

// async function getSongs() {
//     let a = await fetch("http://127.0.0.1:3000/songs/")
//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");
//     let songs = []
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href)
//         }
//     }
//     return songs
// }

// function getSongName(songURL) {
//     // handle both forward slash and backslash
//     let parts = songURL.split("/");
//     let fileName = parts[parts.length - 1];
//     if (!fileName || fileName === "") {
//         fileName = songURL.split("\\").pop();
//     }
//     // decode URL, remove .mp3, replace underscores with spaces
//     return decodeURIComponent(fileName)
//         .replace(".mp3", "")
//         .replace(/_/g, " ")
//         .replace(/%5C/g, "")
//         .replace(/\\songs\\/g, "")
//         .trim();
// }

// async function main() {
//     let songs = await getSongs()
//     console.log(songs)

//     let container = document.querySelector(".trandingsongs");
//     container.innerHTML = "";

//     songs.forEach((songURL) => {
//         let songName = getSongName(songURL);

//         let card = document.createElement("div");
//         card.classList.add("card");
//         card.innerHTML = `
//             <div class="play">
//                 <button class="spotify-play-btn">
//                     <svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
//                         <polygon points="6,3 20,12 6,21" />
//                     </svg>
//                 </button>
//             </div>
//             <img src="https://i.scdn.co/image/ab67616d00001e029eb6c1861d8c058e7052df1e" alt="">
//             <h2>${songName}</h2>
//             <p>Click to play</p>
//         `;

//         card.querySelector(".spotify-play-btn").addEventListener("click", () => {
//             if (currentAudio) currentAudio.pause();
//             currentAudio = new Audio(songURL);
//             currentAudio.play();
//             console.log("Playing:", songName);
//         });

//         container.appendChild(card);
//     });
// }

// main()
// document.querySelectorAll('a[href=""]').forEach(link => {
//     link.addEventListener("click", (e) => e.preventDefault());
// });