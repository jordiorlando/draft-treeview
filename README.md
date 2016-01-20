# draft-treeview

**draft-treeview** is a plugin for [draft.js](https://github.com/D1SC0tech/draft.js) that renders document trees in the DOM. Mainly meant for development.

draft-treeview is licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Getting Started

Include the plugin after draft.js in your html file:

```html
<head>
  ...
  <script src="draft.js/dist/draft.min.js"></script>

  <link rel="stylesheet" href="draft-treeview/main.css">
  <script src="draft-treeview/dist/draft-treeview.min.js"></script>
</head>
<body>
  <div id="body" style="width: 100%; height: 100%"></div>
</body>
```

Write a new script and include it after your html content:

```javascript
// Create a new draft document and add a group to it
var doc = draft.doc('my_document');
var group = doc.group();

// Add some shapes to the group
var rect = group.rect(200, 150).fill('#18f');
var circle = group.circle(50).fill('#f1c');

// Use the draft-treeview plugin to render a tree
var body = document.getElementById('body');
body.appendChild(group.tree());
```
