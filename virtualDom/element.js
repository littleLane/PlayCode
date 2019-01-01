var _ = require('./utils');

function Element(tagName, props, children) {
  if (!(this instanceof Element)) {
    if (!_.isArray(children) && children !== null) {
      children = _.slice(arguments, 2).filter(_.truthy);
    }

    return new Element(tagName, props, children);
  }

  if (_.isArray(props)) {
    children = props;
    props = {};
  }

  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
  this.key = props ? props.key : void 888;

  var count = 0;

  _.forEach(this.children, function(child) {
    if (child instanceof Element) {
      count += child.count;
    } else {
      children[i] = '' + child;
    }

    count++;
  });

  this.count = count;
}

Element.prototype.render = function() {
  var el = document.createElement(this.tagName);
  var props = this.props;

  for(var propName in props) {
    _.setAttr(propName, props[propName]);
  }

  _.forEach(this.children, child => {
    // 如果子节点为虚拟 DOM 就直接递归构建 DOM 节点
    // 如果为字符串，就构建文件节点
    var childEl = child instanceof Element ? child.render() : document.createTextNode(child);
    el.appendChild(childEl);
  });

  return el;
}

module.exports = Element;