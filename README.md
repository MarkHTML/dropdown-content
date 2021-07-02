# dropdown-content
Simple plugin to dropdown content and the click of a button relative to the button position. 
Has simple collision detection to prevent dropped content going off-screen.

<a href="demo/demo.html">Demo</a>.

## Installation
Requires jQuery.

Include the CSS inside the `<head>` tag:

`<link rel="stylesheet" href="dropdown-content.css">`

Include JavaScript before the closing `</body>` tag:

`<script src="dropdown-content.js"></script>`

## Usage Example

```
<button class="button dropdown" data-toggle-dropdown-content="id-of-dropdown">
    Button to trigger dropdown
</button>
        
<div class="dropdown-content" id="id-of-dropdown" data-dropdown-content="">
    <div class="dropdown-content-inner custom-scrollbar jsDropdownInner">
        <!-- Dropped Down Content here -->
   </div>
</div>
```

## Options

### Size

Size of the dropdown is responsive on mobile screens however you can set the size if the dropown
on other screens by adding one of the following to .dropdown-content: `.tiny, .small, .large, .xlarge`

### Custom Scrollbar

To prevent dropped content going off-screen we use max height which can show an ugly
scrollbar on desktops, to prevent this add the class `.custom-scrollbar` to `.dropdown-content-inner`

### On-close Callback Function

Add `data-close-callback="callBackFunctionName"` to `.dropdown-content` and simply replace 
`callBackFunctionName` with your function you would like as a callback on the close event.

## API

### Close all dropdowns
```
<script>
    dropdown_content.closeItems();
</script>
```

 

