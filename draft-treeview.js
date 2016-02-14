(function() {
  /* var blacklist = ['type', 'id'];
  var treeString = this.stringify(blacklist).split('"').join('');
  this.dom.tree.firstChild.textContent = `${this.domID}: ${treeString}`;

  var longestLine = treeString.split('\n').reduce(function(a, b) {
    return a.length > b.length ? a : b;
  });
  // HACK: change 84 to a non-hardcoded value
  this.dom.tree.style.width =
    `${Math.min(longestLine.length + 4, 84)}ch`; */


  draft.Group.mixin({
    tree() {
      if (this._tree === undefined) {
        var domPrefix = `${this.domID}:tree`;
        if (this.doc !== undefined) {
          domPrefix = `${this.doc.domID}:${domPrefix}`;
        }
        var domID = function(element) {
          return `${domPrefix}:${element.domID}`;
        };

        var find = function(element) {
          return document.getElementByID(domID(element));
        };

        var render = function(element) {
          var node = document.createElement('li');
          node.id = domID(element);
          node.className = 'draft-tree-element';

          var id = document.createElement('strong');
          id.textContent = `${element.domID}`;
          node.appendChild(id);

          var propNode = document.createElement('div');
          node.appendChild(propNode);

          var propButton = document.createElement('input');
          // TODO: ensure unique id
          propButton.id = `${node.id}:properties`;
          propButton.setAttribute('type', 'checkbox');
          propButton.setAttribute('checked', null);
          propNode.appendChild(propButton);

          var propLabel = document.createElement('label');
          propLabel.textContent = 'properties:';
          propLabel.setAttribute('for', propButton.id);
          propNode.appendChild(propLabel);

          var propList = document.createElement('ol');
          propNode.appendChild(propList);

          // TODO: remove props, use document.getElementByID instead
          var props = {};
          for (let prop in element.prop()) {
            let item = document.createElement('li');
            item.textContent = `${prop}: ${element.prop(prop)}`;
            props[prop] = item;
            propList.appendChild(item);
          }

          element.on('change', function(prop, val) {
            if (val === null) {
              propList.removeChild(props[prop]);
            } else {
              if (!props.hasOwnProperty(prop)) {
                let item = document.createElement('li');
                props[prop] = item;
                propList.appendChild(item);
              }

              props[prop].textContent = `${prop}: ${val}`;
            }
          });

          // TODO: do a faster check than instanceof
          // Extra code to handle elements that have children
          if (element instanceof draft.Group) {
            let childNode = document.createElement('div');
            node.appendChild(childNode);

            let button = document.createElement('input');
            // TODO: ensure unique id
            button.id = `${node.id}:children`;
            button.setAttribute('type', 'checkbox');
            button.setAttribute('checked', null);
            childNode.appendChild(button);

            let label = document.createElement('label');
            label.textContent = 'children:';
            label.setAttribute('for', button.id);
            childNode.appendChild(label);

            let list = document.createElement('ol');
            childNode.appendChild(list);

            for (let child of element.children) {
              list.appendChild(render(child));
            }

            element.on('add', function(child) {
              list.appendChild(render(child));
            });

            element.on('remove', function(child) {
              list.removeChild(find(child));
            });
          }

          return node;
        };

        var tree = this._tree = document.createElement('div');
        tree.className = 'draft-tree';

        var list = document.createElement('ul');
        list.appendChild(render(this));
        list.firstChild.className = '';
        tree.appendChild(list);
      }

      return this._tree;
    }
  });
})();
