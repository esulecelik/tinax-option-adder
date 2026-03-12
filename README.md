Tinax Option Adder
===============
 A lightweight UI component for network management panels, featuring real-time MAC address validation dynamic input masking, and seamless list management.

![screenshot](https://raw.githubusercontent.com/esulecelik/tinax-option-adder/main/examples/screenshot.png)


### Features
* **MAC Address Validation** - Real-time MAC address format validation (xx-xx-xx-xx-xx-xx format)
* **Dynamic Input Masking** - Prevent user errors with a maximum 17 character limit
* **MAC Address Addition** - Add validated MAC addresses to the list
* **MAC Address Removal** - Remove selected MAC addresses from the list (multi-select support with CTRL/CMD)
* **Multiple Selection** - Select multiple MAC addresses using the multiple select dropdown
* **Error Handling** - Control empty input, format errors, and duplicate values
* **Form Integration** - Automatically populate the list from form data on page load
* **Shadow DOM Isolation** - Isolate component styles and protect from DOM manipulation

### Installation

#### Via NPM

Install the package from npm registry:

```bash
npm install tinax-option-adder
```

#### Import in Your Project

The component auto-registers itself when imported. Simply import it in your JavaScript:

```javascript
import 'tinax-option-adder';
```

Or if you need to manually register:

```javascript
import { TinaxOptionAdder, register } from 'tinax-option-adder';

// This auto-registers the component as 'tinax-multi-select'
register();
```

### Usage

#### Basic Setup

Add the component to your HTML with Bootstrap CSS:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
</head>
<body>
    <div style="width: 300px; margin: 20px auto;">
        <tinax-multi-select></tinax-multi-select>
    </div>

    <script type="module">
        import 'tinax-option-adder';
    </script>
</body>
</html>
```

#### With Pre-populated MAC Addresses

Pass initial MAC addresses using the `value` attribute:

```html
<tinax-multi-select value="AA-23-45-67-89-AB"></tinax-multi-select>
```

Multiple MAC addresses can be separated by newlines or manually added through the UI.


#### Accessing the Component

```javascript
const component = document.querySelector('tinax-multi-select');

// Get all MAC addresses
const macAddresses = component.getItems();
console.log(macAddresses); // ['AA-23-45-67-89-AB', ...]

// Add a MAC address programmatically
component.addItem('CC-DD-EE-FF-00-11');

// Remove a specific MAC address
component.removeItem('AA-23-45-67-89-AB');

// Clear all MAC addresses
component.clear();

// Get stylesheet
const styles = component.getSheet();
```


#### Browser Support

Works in all modern browsers that support:
- ES6 Modules
- Web Components (Custom Elements)
- Shadow DOM
- CSS Adopted Stylesheets


