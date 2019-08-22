import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import './gfs-dropdown-styles.js';


class GfsDropDown extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="gfs-dropdown-styles"></style>

            <slot></slot>
        `;
    }
        static get is() {
            return 'gfs-dropdown';
        }

        static get properties() {
            return {
                label: String,

                opened: {
                    type: Boolean,
                    value: false,
                    notify: true,
                    reflectToAttribute: true,
                    observer: '_openedChanged'
                }
            }
        }

        ready() {
            super.ready()
        }

        connectedCallback() {
            super.connectedCallback();
            this.close = this.close.bind(this);
        }

        disconnectedCallback() {
            document.removeEventListener('tap', this.close.bind(this));
        }

        _toggle() {
            this.opened = !this.opened;
        }

        open() {
            this.opened = true;
        }

        close() {
            this.opened = false;
        }

        _openedChanged(opened) {
            this._horizontallyBound(document.body, this);

            if (opened) {
                afterNextRender(this, () => {
                    document.addEventListener('click', this.close);
                });

                this.dispatchEvent(new CustomEvent('gfs-dropdown-opened', {
                    bubbles: true,
                    composed: true,
                    detail: opened
                }));
            }
            else {
                document.removeEventListener('click', this.close);

                this.dispatchEvent(new CustomEvent('gfs-dropdown-closed', {
                    bubbles: true,
                    composed: true,
                    detail: opened
                }));
            }
        }

        _horizontallyBound(parentDiv, childDiv) {
            var parentRect = parentDiv.getBoundingClientRect();
            var childRect = childDiv.getBoundingClientRect();
            if ((childRect.left + childRect.width) > parentRect.width) {
                childDiv.classList.add("menu-out-of-bound");
            }
            else {
                childDiv.classList.remove("menu-out-of-bound");
            }
        }
    }
window.customElements.define(GfsDropDown.is, GfsDropDown);
