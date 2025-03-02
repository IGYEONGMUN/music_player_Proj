// import { API_UNSPLASH_KEY } from "./env.js";

// const getImg = `https://api.unsplash.com/photos/random/?client_id=${API_UNSPLASH_KEY}`;
const figure = document.querySelector("figure");
const loading = document.querySelector(".loading");

// fetch(getImg)
//   .then((response) => response.json())
//   .then(({ urls: { full } }) => {
//     figure.style.backgroundImage = `url(${full})`;
//     loading.style.display = "none";
//   })
//   .catch((error) => {
//     console.error("이미지 로드 중 오류 발생!", error);
//   });

const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const audios = frame.querySelectorAll("audio");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const turtleProgress = document.querySelectorAll(".turtle");
const progressBars = document.querySelectorAll(".progressBar");
const currentBars = document.querySelectorAll(".currentBar");

// article rotation
const deg = 45;
let i = 0;

lists.forEach((list) => {
  const pic = list.querySelector(".pic");
  const play = list.querySelector(".play");
  const pause = list.querySelector(".pause");
  const load = list.querySelector(".load");

  list.style.transform = `rotate(${i * deg}deg) translateY(-100vh)`;
  pic.style.backgroundImage = `url("./img/member${i + 1}.jpg")`;
  i++;

  play.addEventListener("click", (e) => {
    const isActive = e.currentTarget
      .closest("article")
      .classList.contains("on");

    if (isActive) {
      const activePic = e.currentTarget
        .closest("article")
        .querySelector(".pic");

      const activeAudio = e.currentTarget
        .closest("article")
        .querySelector("audio");

      activePic.classList.add("on");
      activeAudio.play();
      activeAudio.addEventListener("ended", () => {
        activePic.classList.remove("on");
        turtleProgress.forEach((turtle) => {
          turtle.style.left = "0px";
        });
        currentBars.forEach((currentbar) => {
          currentbar.style.width = 0;
        });
      });

      //turtle progress bar
      let progressBar = 0;
      progressBars.forEach((progressbar) => {
        if (progressbar.closest("article").classList.contains("on")) {
          progressBar = progressbar;
        }
      });
      const progressBarWidth = progressBar.clientWidth - 20;

      activeAudio.addEventListener("timeupdate", () => {
        const currentTime = activeAudio.currentTime;
        const duration = activeAudio.duration;
        const newWidth = (currentTime / duration) * progressBarWidth;
        const percent = (currentTime / duration) * 100;

        turtleProgress.forEach((turtle) => {
          if (
            turtle.parentElement.closest("article").classList.contains("on")
          ) {
            turtle.style.left = `${newWidth}px`;
          }
        });
        currentBars.forEach((currentbar) => {
          if (
            currentbar.parentElement.closest("article").classList.contains("on")
          ) {
            currentbar.style.width = `${percent}%`;
          }
        });
      });
    }
  });

  pause.addEventListener("click", (e) => {
    const isActive = e.currentTarget
      .closest("article")
      .classList.contains("on");

    if (isActive) {
      e.currentTarget
        .closest("article")
        .querySelector(".pic")
        .classList.remove("on");

      e.currentTarget.closest("article").querySelector("audio").pause();
      e.currentTarget.closest("article").querySelector("audio").load();
    }
  });

  load.addEventListener("click", (e) => {
    const isActive = e.currentTarget
      .closest("article")
      .classList.contains("on");

    if (isActive) {
      e.currentTarget
        .closest("article")
        .querySelector(".pic")
        .classList.add("on");

      e.currentTarget.closest("article").querySelector("audio").load();
      e.currentTarget.closest("article").querySelector("audio").play();
    }
  });
});

// prev, next button event
let num = 0;
let active = 0;
const len = lists.length - 1;

const activation = (index, lists) => {
  lists.forEach((list) => {
    list.classList.remove("on");
  });
  lists[index].classList.add("on");
};

let duration = 0;

const initMusic = () => {
  audios.forEach((audio) => {
    audio.pause();
    audio.load();
    audio.parentElement.previousElementSibling.classList.remove("on");
  });

  progressBars.forEach((progressbar) => {
    if (progressbar.closest("article").classList.contains("on")) {
      progressbar.style.opacity = "1";
    } else {
      progressbar.style.opacity = "0";
    }
  });
};

prev.addEventListener("click", () => {
  num++;
  frame.style.transform = `rotate(${num * deg}deg)`;

  active === 0 ? (active = len) : active--;
  activation(active, lists);
  initMusic();
  turtleProgress.forEach((turtle) => {
    turtle.style.left = "0px";
  });
  currentBars.forEach((currentbar) => {
    currentbar.style.width = 0;
  });
});

next.addEventListener("click", () => {
  num--;

  frame.style.transform = `rotate(${num * deg}deg)`;

  active === len ? (active = 0) : active++;
  activation(active, lists);
  initMusic();
  turtleProgress.forEach((turtle) => {
    turtle.style.left = "0px";
  });
  currentBars.forEach((currentbar) => {
    currentbar.style.width = 0;
  });
});

initMusic();
