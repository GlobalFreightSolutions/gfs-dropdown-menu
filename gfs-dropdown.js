import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<custom-style>
    <style>
        html {
            --gfs-dropdown-border-b: 1px solid #eef1f6;
            --gfs-dropdown-item-hover: var(--light-grey);
            --gfs-dropdown-border-radius: 0;
        }
    </style>
</custom-style>

<dom-module id="gfs-dropdown">
    <template strip-whitespace="">
        <style include="gfs-styles">
            :host {
                display: block;
            }

            :host ::slotted(*) {
                color: #626060;
                border-bottom: var(--gfs-dropdown-border-b);
                width: 100%;
                padding: 10px;
                text-decoration: none;
                cursor: pointer;
                position: relative;
                border-radius: var(--gfs-dropdown-border-radius);
                box-sizing: border-box;
                transition: all .3s ease-in-out;
            }

                :host ::slotted(:last-child) {
                    margin: 0 0 5px;
                    border-bottom: none;
                }

                :host ::slotted(a:last-child) {
                    margin: 0 0 5px;
                    border-bottom: none;
                }

                :host ::slotted(*:hover) {
                    background: var(--gfs-dropdown-item-hover);
                }


            /* :host[opened] {
                background: var(--light-grey);
                border-radius: var(--border-radius);
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
            } */

        </style>

        <slot></slot>
    </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

class GfsDropDown extends GestureEventListeners(PolymerElement) {
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
            console.log("gfs-dropdown open() " , this.opened);
        }

        close() {
            this.opened = false;
            console.log("gfs-dropdown close() " , this.opened);
        }

        _openedChanged(opened) {
            console.log('_openedChanged ', opened);
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
