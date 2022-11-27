import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('my-counter')
class Counter extends LitElement {

  render() {
    return html`Hello Counter!`;
  }
}
