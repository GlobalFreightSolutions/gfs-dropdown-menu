The `gfs-dropdown-menu` widget is used to create dropdown menus.


### Install

```bash
$ npm i --save '@gfsdeliver/gfs-dropdown-menu
```

### Import In a HTML file:

```html
<html>
    <head>
        <script type="module">
            import '@gfsdeliver/gfs-dropdown-menu/gfs-dropdown-menu.js';
        </script>
    </head>
    <body>
        <gfs-dropdown-menu id="myMenu" icon="expand-more" label="Static content">
            <a href="#">Account Settings</a>
            <a href="#"><iron-icon icon="warning"></iron-icon>Notifications</a>
            <a href="#"><iron-icon icon="exit-to-app"></iron-icon>Sign out</a>
        </gfs-dropdown-menu>
    </body>
</html>
```

### In a Polymer 3 element
```js
import { PolymerElement, html } from '@polymer/polymer';
import '@gfsdeliver/gfs-dropdown-menu/gfs-dropdown-menu.js';

class CustomElement extends PolymerElement {
    static get template() {
        return html`
            <gfs-dropdown-menu id="myMenu" icon="expand-more" label="Static content">
                <a href="#">Account Settings</a>
                <a href="#"><iron-icon icon="warning"></iron-icon>Notifications</a>
                <a href="#"><iron-icon icon="exit-to-app"></iron-icon>Sign out</a>
            </gfs-dropdown-menu>
        `;
    }
}
customElements.define('custom-element', CustomElement);
```

## Properties
Property | Description
---------|-------------
label    | Top level menu text
icon     | Adds an icon next to the label
jsonMenu | buids the dropdown menu from a json file

## Styling
Custom property | Description | Default
----------------|-------------|----------
--gfs-dropdown-menu-font-size | menu font size | `13px`
--gfs-dropdown-menu-background | opened menu background color | `#fff`
--gfs-dropdown-menu-border-radius | menu radius corners | `3px`
--gfs-dropdown-menu-box-shadow | adds a shadow effect on opened menu box  | `0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)`
--gfs-dropdown-menu-background-hover | top level background color (label) | `#f7f8fb`
--gfs-dropdown-menu-top-border | a top border when menu is opened | `5px solid var(--gfs-primary-color)`
--gfs-dropdown-menu-arrow | color sould be same a above, adds a triangle on top of the opened menu | `var(--gfs-primary-color)`
--gfs-dropdown-border-b | adds a bottom border on each menu item on list | `1px solid #eef1f6`
--gfs-dropdown-item-hover | hover menu background color | `var(--light-grey-color)`

## License

[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)