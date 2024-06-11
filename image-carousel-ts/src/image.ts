import {
image_transition_loop, startImageTransitionLoop, changeableVariables, updateVariables 
} from "./main.ts";

//class for Image that represent the img inside the image wrapper and carousel
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

    //event handler to stop the transition when mouse cursor hover over the image
    this.element.addEventListener("mouseover", () => {
      clearInterval(image_transition_loop);
      updateVariables (changeableVariables.curr_idx, true)
    });

    //event handler to resume the transition when mouse cursor hover over the image
    this.element.addEventListener("mouseout", () => {
      if (changeableVariables.isPaused) {
        startImageTransitionLoop();
      }
      updateVariables (changeableVariables.curr_idx, false)

    });
  }
}
export {Image};
