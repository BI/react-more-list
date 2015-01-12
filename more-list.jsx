var React = require("react");

/************* Helper Functions **************/
function isElementType(element, expectedType) {
  return getElementType(element) == expectedType;
}

function getElementType(element) {
  return element.type.displayName || element.type;
}

var MoreList = React.createClass({
  componentWillMount: function() {
    if(this.props.children === null || this.props.children.length === 0) {
      throw new Error("No elements found in MoreList");
    }

    var errors = "";
    var children = this.props.children;

    if(children.constructor !== Array) {
      children = [children];
    }
    
    children.forEach(function(child) {
      if(!isElementType(child, "li")) {
        errors += "\r\nFound " + getElementType(child) + " element in MoreList. All elements should be 'li'";
      }
    });

    if(errors !== "") {
      throw new Error(errors);
    }
  },
  getInitialState: function() {
    return { itemsShown: this.props.initialSize };
  },
  increaseItemsShown: function(increment) {
    this.setState({itemsShown: this.state.itemsShown + increment});
  },
  propTypes: {
    initialSize: React.PropTypes.number,
    moreSize: React.PropTypes.number,
    tolerance: React.PropTypes.number,
    allowShowAll: React.PropTypes.bool,
    showCount: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      initialSize: 4,
      moreSize: 20,
      tolerance: 1,
      allowShowAll: false,
      showCount: true
    };
  },
  addMoreComponent: function() {
    var children = this.props.children;

    if(children.length <= this.state.itemsShown + this.props.tolerance) {
      return null;
    }

    var remaining = children.length - this.state.itemsShown;

    if(this.props.moreSize === 0)
    {
      var count = this.props.showCount ? <span className="ml-count ml-more-count">{remaining}</span> : null;
      return (<li className="ml-list-item ml-expander ml-more" onClick={this.increaseItemsShown.bind(this, remaining)}>More... {count}</li>);  
    }

    var toAdd = remaining <= this.props.moreSize ? remaining : this.props.moreSize;

    var displayedCount = this.props.allowShowAll ? toAdd : remaining;
    displayedCount += remaining > displayedCount ? "+" : "";
    
    var count = this.props.showCount ? <span className="ml-count ml-more-count">{displayedCount}</span> : null;
    return (<li className="ml-list-item ml-expander ml-more" onClick={this.increaseItemsShown.bind(this, toAdd)}>More... {count}</li>);
  },
  addShowAllComponent: function() {
    if(!this.props.allowShowAll || this.props.moreSize == 0) {
      return null;
    }

    var children = this.props.children;
    
    if(children.length <= this.state.itemsShown + this.props.moreSize + this.props.tolerance) {
      return null;
    }

    var remaining = children.length - this.state.itemsShown;
    
    var count = this.props.showCount ? <span className="ml-count ml-show-all-count">{remaining}</span> : null;
    return (<li className="ml-list-item ml-expander ml-show-all" onClick={this.increaseItemsShown.bind(this, remaining)}>Show All... {count}</li>);
  },
  render: function()
  {
    var children = this.props.children;

    if(children.constructor !== Array) {
      children = [children];
    }

    var shownItemCount = this.state.itemsShown;
    shownItemCount += shownItemCount + this.props.tolerance >= children.length ? this.props.tolerance : 0;

    var listItems = children.slice(0, shownItemCount).map(function (child) {
      return <li className="ml-list-item ml-data">{child.props.children}</li>;
    });

    listItems.push(this.addMoreComponent());
    listItems.push(this.addShowAllComponent());

    return (
      <ul className="ml-list">
        {listItems}
      </ul>
    )
  }
});

module.exports = MoreList;