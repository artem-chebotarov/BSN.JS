# bsn.js Documentation

- Author: [Artem Chebotarov](https://github.com/artem-chebotarov)
- Email: [artem.tschebotarov@gmail.com](mailto:artem.tschebotarov@gmail.com)
- LinkedIn: [Artem Chebotarov](https://linkedin.com/in/vikargia)
- Date: 12.04.2026
- License: Apache 2.0
 
 ---

## Description

bsn.js (Bootstrap Service Notification) is a lightweight wrapper for Bootstrap modal dialogs. This plugin was designed to replace native browser functions like alert, confirm, and prompt with more flexible and accessible alternatives.

Key Feature: This class is built with full support for screen reading software. This ensures that visually impaired users will have no issues interacting with your dialogs.
 
 ---

## Connection and API

To integrate the plugin, simply include the script in your HTML page:

```html
<script src="./src/bsn.js"></script>
```

#### Important!

By including the plugin this way, a global variable $gn is registered in your project. This format originates from the GiannaFramework. Now, $gn.bsn holds the reference to the bsn plugin. Keep in mind that if you use other GiannaFramework-compatible plugins, they will also be accessible via the $gn.* object.

---

### $gn.bsn.alert()

This method allows you to send a notification that cannot be ignored.

#### Example call:

```js
$gn.bsn.alert({
    title: "",    // Dialog header
    message: "",  // Message body
    ok_text: "",  // Button label (e.g., "Understood")
    app: "",      // Optional app label (e.g., "blog-content")
    ok: () => {}  // Callback executed after clicking the button
});
```

This method can return a result from the callback or undefined.

---

### $gn.bsn.confirm()

This method requests a confirmation. You can assign callbacks to buttons. The method returns a boolean value.

#### Example call:

```js
let result = await $gn.bsn.confirm({
    title: "",    // Header
    message: "",  // Message
    app: "",      // App or script label
    ok_text: "",  // Confirmation button label
    no_text: "",  // Decline button label
    ok: () => {}, // Confirmation callback
    no: () => {}  // Decline callback
});
```

---

### $gn.bsn.prompt()

This method requests data from the user. It returns the entered data or undefined. You can assign callbacks for both confirmation and cancellation.

#### Example call:

```js
let value = await $gn.bsn.prompt({
    title: "",    // Header
    message: "",  // Message
    input: "",    // Input field title (important for accessibility)
    value: "",    // Default value in the input field
    app: "",      // Script label
    ok_text: "",  // Confirmation button label
    no_text: "",  // Cancellation button label
    ok: () => {}, // Confirmation callback
    no: () => {}  // Cancellation callback
});
```

 ---

### $gn.bsn.toast()

This method displays floating toast notifications.

#### Example call:

```js
$gn.bsn.toast({
    title: "",    // Header
    message: "",  // Message
    type: "",     // Visual type (e.g., success, danger, warning, info)
    delay: 5000,  // Time before the message disappears (in ms)
    ok_text: "",  // Button label
    ok: () => {}  // Callback for the button
});
 ```

 ---

## Technical Notes

- No HTML Templates Needed: You don't need to create HTML templates for dialog windows manually. They are already built into the class.
- Efficient Rendering: The template for each method is added to the web page only once. After that, the class simply checks for the template's existence and updates the content.
- Clean DOM: The class does not clutter the DOM tree.
- Localization: You can omit all keys; in that case, you will see default English labels hardcoded into the class.
- Accessibility Ready: This class is specifically designed to ensure visually impaired users face no accessibility barriers.
 
 ---

 