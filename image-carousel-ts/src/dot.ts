import {
    image_transition_loop, startImageTransitionLoop, image_change_transition, imageTransitionToPosition, changeableVariables, updateVariables 
} from "./main.ts";

/*class that represents the small dot or circle that represent the currently showing image's position
 and can be clicked on to change the image */ 
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

      //event handler to change the image to the position of clicked dot and handle the glow of active dot
      this.element.addEventListener("click", () => {
      clearInterval(image_transition_loop);
      clearInterval(image_change_transition);
      imageTransitionToPosition(this.id);
      updateVariables(this.id, changeableVariables.isPaused)
      this.updateGlowStatus();
      startImageTransitionLoop();
      });
      this.updateGlowStatus();
    }
    updateGlowStatus(){
      changeableVariables.curr_idx == this.id ? this.glow() : this.resetGlow();
   
    }
    glow() {
      this.element.style.opacity = "1";
    }
    resetGlow() {
      this.element.style.opacity = "0.5";
    }
  }
  export {Dot};