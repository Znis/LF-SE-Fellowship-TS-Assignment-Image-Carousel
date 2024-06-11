import "./style.css";
// import { setupCounter } from './image-carousel.ts'

const img_wrapper = document.getElementById("image-carousel__img-wrapper");
const img_status_count = document.getElementById("image-status-count");
const arrow_button_right = document.getElementById("arrow-right");
const arrow_button_left = document.getElementById("arrow-left");

var curr_idx = 0;
let IMAGE_DURATION: number = 2000;
const TRANSITION_SPEED: number = 5;
let limit = 100;
let j: number = parseInt(img_wrapper!.style.left) || 0;
let isPaused = false;

let image_transition_loop: number | undefined;
let image_change_transition: number | undefined;

function imageTransitionToPosition(position: number) {
  // j = parseInt(img_wrapper!.style.left) || 0;
  // console.log(j)

  limit = (position - curr_idx) * 100;
  // if(j > 0 || j % 100 != 0){
  //   j -= (j % 100);
  //   j = j > 0 ? 0 : j;
  //   img_wrapper!.style.left = `${j}%`;

  // }
  const initial_j = j;

  image_change_transition = setInterval(() => {
    if (Math.abs(j - initial_j) >= Math.abs(limit)) {
      clearInterval(image_change_transition);
    } else {
      limit > 0 ? (j += TRANSITION_SPEED) : (j -= TRANSITION_SPEED);
    }

    img_wrapper!.style.left = `${-1 * j}%`;
    for(let i = 0; i < img_names.length; i++){
      dotArray[i].updateGlowStatus();
    }
  }, 1);
}

function startImageTransitionLoop() {
  image_transition_loop = setInterval(() => {
    // console.log(i);
    if (curr_idx < img_names.length - 1) {
      imageTransitionToPosition(curr_idx + 1);
      curr_idx++;
    } else {
      imageTransitionToPosition(0);
      curr_idx = 0;
    }
    for(let i = 0; i < img_names.length; i++){
      dotArray[i].updateGlowStatus();
    }
  }, IMAGE_DURATION);
}

arrow_button_right?.addEventListener("click", () => {
  if (curr_idx < img_names.length - 1) {
    clearInterval(image_transition_loop);
    clearInterval(image_change_transition);
    imageTransitionToPosition(curr_idx + 1);

    curr_idx++;
    startImageTransitionLoop();
  }
});

arrow_button_left?.addEventListener("click", () => {
  if (curr_idx > 0) {
    clearInterval(image_transition_loop);
    clearInterval(image_change_transition);

    imageTransitionToPosition(curr_idx - 1);

    curr_idx--;
    startImageTransitionLoop();
  }
});

class Image {
  w: number;
  h: number;
  src: string;
  element: HTMLImageElement;
  constructor(w: number, h: number, src: string) {
    this.w = w || 100;
    this.h = h || 100;
    this.src = src || "";

    this.element = document.createElement("img");
    this.element.setAttribute("src", this.src);

    this.element.style.minWidth = `${this.w}%`;
    this.element.style.minHeight = `${this.h}%`;
    this.element.style.objectFit = "contain";
    this.element.style.zIndex = "1";
    this.element.addEventListener("mouseover", () => {
      clearInterval(image_transition_loop);
      isPaused = true;
    });
    this.element.addEventListener("mouseout", () => {
      if (isPaused) {
        startImageTransitionLoop();
      }
      isPaused = false;
    });
  }
}

class Dot {
  id: number;
  w: number;
  h: number;
  color: string;
  element: HTMLDivElement;
  constructor(id: number, w: number, h: number, color: string) {
    this.id = id;
    this.w = w;
    this.h = h;
    this.color = color;

    this.element = document.createElement("div");

    this.element.style.width = `${this.w}px`;
    this.element.style.height = `${this.h}px`;
    this.element.style.background = this.color;
    this.element.style.borderRadius = "50%";
    this.element.style.opacity = "0.5";
    this.element.style.zIndex = "2";
    this.element.style.cursor = "pointer";

    this.element.addEventListener("mouseover", () => {
      this.glow();
      this.element.style.scale = "1.4";
    });
    this.element.addEventListener("mouseout", () => {
      this.resetGlow();
      this.element.style.scale = "1";
    });
    this.element.addEventListener("click", () => {
    clearInterval(image_transition_loop);
    clearInterval(image_change_transition);
    imageTransitionToPosition(this.id);
    curr_idx = this.id;
    this.updateGlowStatus();
    startImageTransitionLoop();
    });
    this.updateGlowStatus();
  }
  updateGlowStatus(){
    curr_idx == this.id ? this.glow() : this.resetGlow();
  }
  glow() {
    this.element.style.opacity = "1";
  }
  resetGlow() {
    this.element.style.opacity = "0.5";
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

const img_names = arr.map((value) => `images/${value}.jpg`);
const dotArray: Dot[] = [];

for (let i = 0; i < img_names.length; i++) {
  const img = new Image(100, 100, img_names[i]);
  const dot = new Dot(i, 8, 8, "red");
  dotArray.push(dot);
  img_wrapper?.appendChild(img.element);
  img_status_count?.append(dot.element);
}
startImageTransitionLoop();
