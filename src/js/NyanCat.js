import image from "../assets/img/nyan-cat.gif";

export class NyanCat extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: "open" });
    this.image = image;
    this.y = 0;
  }

  connectedCallback () {
    this.render();
  }

  render () {
    this.shadowRoot.innerHTML =
      `<style>${this.styles}</style>
            <img src=${this.image}>
            `;
  }

  get styles () {
    return `
            :host {
                position: absolute;
                transform: translateX(var(--x)) translateY(var(--y));
            }
        `;
  }

  moveUp () {
    if (this.y > 0) {
      this.y -= 8;
      this.style.setProperty("--y", `${this.y}px`);
      this.style.setProperty("transform", "translateY(var(--y))");
    }
  }

  moveDown () {
    if (this.y < 324) {
      this.y += 8;
      this.style.setProperty("--y", `${this.y}px`);
      this.style.setProperty("transform", "translateY(var(--y)");
    }
  }

  getCoords () {
    const rect = this.getBoundingClientRect();

    return {
      x1: [rect.top, rect.left],
      x2: [rect.top, rect.left + 92],
      x3: [rect.top + 60, rect.left],
      x4: [rect.top + 60, rect.left + 92]
    };
  }
}

customElements.define("nyan-cat", NyanCat);
