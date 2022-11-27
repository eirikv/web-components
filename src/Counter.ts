import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-counter')
class Counter extends LitElement {
  public static styles = css`    
    :host([color=blue]) button {
      background: blue;
      color: white;
    }
    
    :host([color=red]) button {
      background: red;
      color: white;
    }
  `;
  
  @property({ type: Number, reflect: true })
  public count = 0;
  
  private _onIncrement() {
    if (this.count < 1_000_000) {
      this.count++;
      this.dispatchEvent(new CustomEvent('count', { detail: this.count }));
    }
  }

  private _onDecrement() {
    if (this.count > 0) {
      this.count--;
      this.dispatchEvent(new CustomEvent('count', { detail: this.count }));
    }
  }

  render() {
    return html`
      <button type="button" @click="${this._onDecrement}">-</button>
      <span>${this.count}</span>
      <button type="button" @click="${this._onIncrement}">+</button>
    `;
  }
}

export default Counter;
