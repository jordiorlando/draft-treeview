/*
* draft-treeview - A plugin for draft.js that renders nice tree views in the DOM
* version v0.0.0
* https://github.com/D1SC0tech/draft-treeview
*
* copyright Jordi Pakey-Rodriguez <jordi.orlando@gmail.com>
* license MIT
*
* BUILT: Thu Jan 14 2016 04:09:53 GMT-0600 (CST)
*/
(function() {
  // TODO: allow treeview to be attached to any DOM element
  // TODO: make each element in the treeview into its own element

  // Draft.extend(Draft.Container, treeView);
  Draft.Container.require('json');

  Draft.Container.mixin({
    /* require: [
      Draft.json
    ], */

    createTreeView() {
      var treeView = document.createElement('div');
      treeView.className = 'tree-view';

      // treeView.appendChild(document.createElement('span'));
      // treeView.firstChild.textContent = 'Document Model:';

      var pre = document.createElement('pre');
      treeView.appendChild(pre);

      // Make sure this.dom is initialized
      this.dom = this.dom || {};
      this.dom.treeView = treeView;

      this.dom.node.addEventListener('update', function(e) {
        // e.stopPropagation();
        e.currentTarget.element.updateTreeView();
      }, false);

      return this.updateTreeView();
    },

    updateTreeView() {
      var replacer = function(key, value) {
        if (key === 'doc' || key === 'parent' ||
            key === 'dom' || key === 'type' ||
            key === 'id' || key === '_events') {
          return undefined;
        } else if (key === 'children') {
          var obj = {};
          for (var element of value) {
            obj[element.domID] = element;
          }
          return obj;
        }

        return value;
      };

      var treeString = this.stringify(replacer).split('"').join('');
      this.dom.treeView.firstChild.textContent = `${this.domID}: ${treeString}`;

      var longestLine = treeString.split('\n').reduce(function(a, b) {
        return a.length > b.length ? a : b;
      });
      // HACK: change 84 to a non-hardcoded value
      this.dom.treeView.style.width =
        `${Math.min(longestLine.length + 4, 84)}ch`;

      return this.dom.treeView;
    }
  });



  /* var css = document.createElement('link');
  css.setAttribute('rel', 'stylesheet');
  css.setAttribute('type', 'text/css');
  css.setAttribute('href', 'bower_components/draft-treeview/main.css');

  document.getElementsByTagName('head')[0].appendChild(css); */
})();
