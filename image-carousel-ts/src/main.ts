//making necessary imports
import './style.css';
import {
  TRANSITION_SPEED,
  IMAGE_DURATION,
  arrow_button_right,
  arrow_button_left,
  img_position_count,
  img_wrapper,
} from "./constants.ts";

import { Image } from "./image.ts";
import { Dot } from "./dot.ts";

//creating variables that can be accessed and updated across multiple files
export let changeableVariables = {
  curr_idx: 0,
  isPaused: false,
};
//function that updates the changeable variables
export function updateVariables(curr_idx: number, isPaused: boolean) {
  changeableVariables.curr_idx = curr_idx;
  changeableVariables.isPaused = isPaused;
}



let j: number = parseInt(img_wrapper!.style.left) || 0; //get the current left property of img_wrapper

export let image_transition_loop: number | undefined; //setInterval function that changes image periodically
export let image_change_transition: number | undefined; //setInterval function that handles smooth transition or animation of image


/*function that starts the image_change_transition and
 handles the transition of image to the desired position or index */
export function imageTransitionToPosition(position: number) {
  let limit = 100;
  limit = (position - changeableVariables.curr_idx) * 100;
  const initial_j = j;

  image_change_transition = setInterval(() => {
    if (Math.abs(j - initial_j) >= Math.abs(limit)) {
      clearInterval(image_change_transition);
    } else {
      limit > 0 ? (j += TRANSITION_SPEED) : (j -= TRANSITION_SPEED);
    }

    img_wrapper!.style.left = `${-1 * j}%`;
    for (let i = 0; i < img_names.length; i++) {
      dotArray[i].updateGlowStatus();
    }
  }, 1);
}

//function that starts the image_transition_loop that changes the image every IMAGE_INTERVAL time
export function startImageTransitionLoop() {
  image_transition_loop = setInterval(() => {
    if (changeableVariables.curr_idx < img_names.length - 1) {
      imageTransitionToPosition(changeableVariables.curr_idx + 1);
      changeableVariables.curr_idx++;
    } else {
      imageTransitionToPosition(0);
      changeableVariables.curr_idx = 0;
    }

    for (let i = 0; i < img_names.length; i++) {
      dotArray[i].updateGlowStatus();
    }
  }, IMAGE_DURATION);
}

//event listeners to change the image in carousel when the arrow buttons are clicked
arrow_button_right?.addEventListener("click", () => {
  if (changeableVariables.curr_idx < img_names.length - 1) {
    clearInterval(image_transition_loop);
    clearInterval(image_change_transition);

    imageTransitionToPosition(changeableVariables.curr_idx + 1);

    changeableVariables.curr_idx++;

    startImageTransitionLoop();
  }
});

arrow_button_left?.addEventListener("click", () => {
  if (changeableVariables.curr_idx > 0) {
    clearInterval(image_transition_loop);
    clearInterval(image_change_transition);

    imageTransitionToPosition(changeableVariables.curr_idx - 1);

    changeableVariables.curr_idx--;
    imageTransitionToPosition(changeableVariables.curr_idx + 1);

    startImageTransitionLoop();
  }
});


//array that contains the image_names
const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const img_names: string[] = arr.map((value) => `images/${value}.jpg`);

//array that stores the number of dot objects
const dotArray: Dot[] = [];

//create the Image object and HTML element and append it to the img_wrapper
for (let i = 0; i < img_names.length; i++) {
  const img: Image = new Image(100, 100, img_names[i]);
  const dot: Dot = new Dot(i, 8, 8, "white");
  dotArray.push(dot);
  img_wrapper?.appendChild(img.element);
  img_position_count?.append(dot.element);
}

//start the image_transition_loop to change the image every IMAGE_DURATION time, when the website loads
startImageTransitionLoop();
