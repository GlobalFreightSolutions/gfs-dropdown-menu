import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import './gfs-dropdown.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<custom-style>
    <style>
        html {
            --gfs-dropdown-menu-font-size: 13px;
            --gfs-dropdown-menu-background: #fff;
            --gfs-dropdown-menu-border-radius: 3px;
            --gfs-dropdown-menu-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
            --gfs-dropdown-menu-background-hover: #f7f8fb;
            --gfs-dropdown-menu-top-border: 5px solid var(--gfs-primary-color);
            --gfs-dropdown-menu-arrow: var(--gfs-primary-color);
        }
    </style>
</custom-style>

<dom-module id="gfs-dropdown-menu">
    <template strip-whitespace="">
        <style include="gfs-styles">
            :host {
                display: inline-block;
                position: relative;

                --iron-icon-width: 18px;
                --iron-icon-height: 18px;
                --iron-icon: {
                    margin: 0 4px 0 0;
                }

                --gfs-dropdown-menu: {
                    font-size: var(--gfs-dropdown-menu-font-size);
                    background: var(--gfs-dropdown-menu-background);
                    width: auto;
                    white-space: nowrap;
                    display: inline-block;
                    position: absolute;
                    top: 100%;
                    opacity: 0;
                    visibility: hidden;
                    border-radius: var(--gfs-dropdown-menu-border-radius);
                    box-shadow: var(--gfs-dropdown-menu-box-shadow);
                    transition: ease 0.1s;
                    transition-property: transform, opacity;
                    transform: translateY(10px);
                    z-index: 9999;
                }
            }

            :host([disabled]) {
                pointer-events: none;
                opacity: .8
            }

            #gfsDropdown {
                padding: 5px 10px;
                background: var(--gfs-dropdown-menu-background);
                border-radius: var(--gfs-dropdown-menu-border-radius);
                transition: all .3s ease-in-out;
            }

            #gfsDropdown:hover {
                background: var(--gfs-dropdown-menu-background-hover);
                cursor: pointer;
            }

                #gfsDropdown iron-icon {
                    margin: 0;
                }

                #gfsDropdown:hover .ddmenu {
                    border-top: 5px solid var(--gfs-main-color);
                    opacity: 1;
                    visibility: visible;
                }

            #ddBox {
                @apply --gfs-dropdown-menu;
                @apply --layout-vertical;
                @apply --layout-center-center;
            }

            #ddBox[opened] {
                border-top: var(--gfs-dropdown-menu-top-border);
                border-radius: var(--gfs-dropdown-menu-border-radius);
                opacity: 1;
                visibility: visible;
                /* transform: translateY(0); */
            }

                #ddBox::before {
                    content: "";
                    border: 8px solid transparent;
                    border-bottom-color: var(--gfs-dropdown-menu-arrow);
                    display: inline-block;
                    position: absolute;
                    top: -20px;
                    right: auto;
                    left: 9px;
                }

                #ddBox:hover ~ .trigger {
                    background: var(--light-grey);
                    border-radius: var(--border-radius);
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                }

                #ddBox a:last-child {
                    margin: 0 0 5px;
                    border-bottom: none;
                }

                .menu-out-of-bound {
                    right: 0;
                }

                    .menu-out-of-bound::before {
                        right: 10px !important;
                        left: auto !important;
                    }

            @media only screen and (max-width: 760px) {

            }

            @media only screen and (max-width: 514px) and (orientation: portrait) {

            }
        </style>

        <div id="gfsDropdown" class="trigger" on-tap="_toggle">
            <!-- <slot id="trigger" name="trigger"></slot> -->
            {{label}}
            <dom-if if="{{icon}}">
                <template>
                    <iron-icon icon="{{icon}}"></iron-icon>
                </template>
            </dom-if>
        </div>

        <gfs-dropdown id="ddBox" class="ddmenu" opened="{{opened}}">
            <slot></slot>
            <dom-if if="{{jsonMenu}}">
                <template>
                    <dom-repeat items="{{jsonMenu}}">
                        <template>
                            <a href="#">
                                <iron-icon icon="[[item.icon]]"></iron-icon>
                                [[item.name]]
                            </a>
                        </template>
                    </dom-repeat>
                </template>
            </dom-if>
        </gfs-dropdown>
    </template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);

class GfsDropDownMenu extends GestureEventListeners(PolymerElement) {
    static get is() {
        return 'gfs-dropdown-menu';
    }

    static get properties() {
        return {
            label: String,
            icon: String,

            expandIcon: {
                type: Boolean,
                value: false
            },

            disabled: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            },

            opened: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            },

            menu: {
                type: String,
                value: ''
            },

            jsonMenu: {
                type: Object,
                value: []
            }
        }
    }

    ready() {
        super.ready()
    }

    connectedCallback() {
        super.connectedCallback();
        this._toggle = this._toggle.bind(this);
        // this.$.gfsDropdown.addEventListener('tap', this._toggle);
    }

    disconnectedCallback() {
        // this.$.gfsDropdown.removeEventListener('tap', this._toggle);
    }

    /**
    * Toggle the opened state of the overlay.
    */
    _toggle() {
        // this.$.ddBox.opened = !this.opened;
        this.$.ddBox._toggle();
    }

    /**
    * Open the overlay.
    */
    open() {
        this.$.ddBox.open();
    }

    /**
    * Close the overlay.
    */
    close() {
        this.$.ddBox.close();
    }

    createMenuItem(menu) {
        return this.menu.split(' ');
    }
}
window.customElements.define(GfsDropDownMenu.is, GfsDropDownMenu);
