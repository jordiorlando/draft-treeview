(function() {
  // TODO: allow treeview to be attached to any DOM element
  // TODO: make each element in the treeview into its own element
  var treeview = {
    require: [
      Draft.json || 'json'
    ],

    createTreeView: function() {
      var treeView = document.createElement('div');
      treeView.className = 'tree-view';

      // treeView.appendChild(document.createElement('span'));
      // treeView.firstChild.textContent = 'Document Model:';

      var pre = document.createElement('pre');
      treeView.appendChild(pre);

      // Make sure this.dom is initialized
      this.dom = this.dom || {};
      this.dom.treeView = treeView;

      this.node.addEventListener('update', function(e) {
        // e.stopPropagation();
        e.currentTarget.element.updateTreeView();
      }, false);

      return this.updateTreeView();
    },

    updateTreeView: function() {
      var replacer = function(key, value) {
        if (key == 'node' || key == 'dom' || key == 'doc' || key == 'parent' || key == 'id' || key == 'type') {
          return undefined;
        } else if (key == 'children') {
          var obj = {};
          for (let element of value) {
            obj[Draft.domID(element)] = element;
          }
          return obj;
        } else {
          return value;
        }
      };

      var treeString = this.stringify(replacer).split('"').join('');
      this.dom.treeView.firstChild.textContent = Draft.domID(this) + ': ' + treeString;

      var longestLine = treeString.split('\n').reduce(function(a, b) {
        return a.length > b.length ? a : b;
      });
      // FIXME: change 84 to a non-hardcoded value
      this.dom.treeView.style.width = Math.min(longestLine.length + 4, 84) + 'ch';

      return this.dom.treeView;
    }
  };

  // Draft.extend(Draft.Container, treeview);
  Draft.Container.extend(treeview);

  /*var css = document.createElement('link');
  css.setAttribute('rel', 'stylesheet');
  css.setAttribute('type', 'text/css');
  css.setAttribute('href', 'bower_components/draft-treeview/main.css');

  document.getElementsByTagName('head')[0].appendChild(css);*/
})();
