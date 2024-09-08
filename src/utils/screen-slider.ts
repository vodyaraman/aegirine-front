
export class ScreenSlider {
    element: HTMLElement;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    isDragging: boolean;
  
    constructor(element: HTMLElement) {
      this.element = element;
      this.startX = 0;
      this.startY = 0;
      this.currentX = 0;
      this.currentY = 0;
      this.isDragging = false;
  
      this.element.addEventListener('mousedown', (event) => {
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.isDragging = true;
      });
  
      document.addEventListener('mousemove', (event) => {
        if (this.isDragging) {
          this.currentX = event.clientX;
          this.currentY = event.clientY;
          this.updatePosition();
        }
      });
  
      document.addEventListener('mouseup', () => {
        this.isDragging = false;
      });
    }
  
    updatePosition() {
      const rect = this.element.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const left = (this.currentX / screenWidth) * 100;
      const top = (this.currentY / screenHeight) * 100;
  
      this.element.style.left = `${left}%`;
      this.element.style.top = `${top}%`;
    }
  }
 