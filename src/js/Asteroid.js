import image from "../assets/img/asteroid.png";

export class Asteroid extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: "open" });
    this.image = image;
    this.y = Math.floor(Math.random() * 321);
    this.x = 0;
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
              transform: translateX(var(--x));
              top: ${this.y}px;
            }
        `;
  }

  move () {
    if (this.x > -710) {
      this.x -= 8;
      this.style.setProperty("--x", `${this.x}px`);
      this.style.setProperty("transform", "translateX(var(--x))");
      return false;
    }

    return true;
  }

  hit (catCoords) {
    const rect = this.getBoundingClientRect();

    const astCoords = {
      x1: [rect.top, rect.left],
      x2: [rect.top, rect.left + 84],
      x3: [rect.top + 64, rect.left],
      x4: [rect.top + 64, rect.left + 84]
    };

    // Compruebo si X1.ejeVertical esta dentro de la altura
    if (astCoords.x1[0] > catCoords.x1[0] && astCoords.x1[0] < catCoords.x3[0]) {
      // Compruebo si X1.ejeHor esta dentro de la anchura
      if (astCoords.x1[1] + 10 > catCoords.x1[1] && astCoords.x1[1] + 10 < catCoords.x2[1]) {
        return true;
      }
    }

    return false;
  }
}

customElements.define("an-asteroid", Asteroid);
