import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@gfsdeliver/gfs-styles/gfs-styles.js';
import './gfs-dropdown.js';
import './gfs-dropdown-menu-styles.js';

class GfsDropDownMenu extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style include="gfs-dropdown-menu-styles"></style>

            <div id="gfsDropdown" class="trigger" on-tap="_toggle">
                <dom-if if="{{left}}">
                    <template>
                        <dom-if if="{{icon}}">
                            <template>
                                <iron-icon icon="{{icon}}"></iron-icon>
                            </template>
                        </dom-if>

                        {{label}}
                    </template>
                </dom-if>

                <dom-if if="{{!left}}">
                    <template>
                        {{label}}

                        <dom-if if="{{icon}}">
                            <template>
                                <iron-icon icon="{{icon}}"></iron-icon>
                            </template>
                        </dom-if>
                    </template>
                </dom-if>
            </div>

            <gfs-dropdown id="ddBox" class="ddmenu" opened="{{opened}}">
                <slot></slot>
                <dom-if if="{{jsonMenu}}">
                    <template>
                        <dom-repeat items="{{jsonMenu}}">
                            <template>
                                <a href="[[item.href]]">
                                    <iron-icon icon="[[item.icon]]"></iron-icon>
                                    [[item.name]]
                                </a>
                            </template>
                        </dom-repeat>
                    </template>
                </dom-if>
            </gfs-dropdown>
        `;
    }

    static get is() {
        return 'gfs-dropdown-menu';
    }

    static get properties() {
        return {
            label: String,
            icon: String,

            /**
            * Option on where to add the icon on the label:
            * left, right
            */
            alignIcon: {
                type: String,
                value: 'left'
            },

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
        super.ready();

        this.left = this.alignIcon === 'left';
    }

    connectedCallback() {
        super.connectedCallback();
        this._toggle = this._toggle.bind(this);
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
