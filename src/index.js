
import { TinaxOptionAdder } from './components/tinax-option-adder.js';

// Export component
export { TinaxOptionAdder };

// Auto-register helper
export function register() {
  if (!customElements.get('tinax-multi-select')) {

    customElements.define('tinax-multi-select', TinaxOptionAdder);
  }
}

register();

// Version
export const version = '1.0.0';