jest.dontMock('../more-list.jsx');

var React = require('react/addons');
var MoreList = require('../more-list.jsx');
var TestUtils = React.addons.TestUtils;


function makeList(props, itemCount) {
  var items = [];

  for(var i=0; i<itemCount; i++) {
    items.push(<li>Item {i}</li>);
  }

  return TestUtils.renderIntoDocument(
    React.createElement(
      MoreList,
      props,
      items
    )
  );
}

function getItems(list) {
  return TestUtils.scryRenderedDOMComponentsWithClass(list, 'ml-data');
}

function getMore(list) {
  return TestUtils.findRenderedDOMComponentWithClass(list, 'ml-more');
}

function getAll(list) {
  return TestUtils.findRenderedDOMComponentWithClass(list, 'ml-show-all');
}

describe('More List', function() {
  it('creates a list with 4 elements', function() {
    var list = makeList(null, 4);

    var items = TestUtils.scryRenderedDOMComponentsWithClass(list, 'ml-data');
    expect(items.length).toBe(4);
  });

  it('defaults to size of 4 items', function() {
    var list = makeList(null, 25);

    var items = getItems(list);
    expect(items.length).toBe(4);

    var moreButton = getMore(list);
    expect(moreButton).not.toBeNull();
  });

  it('shows 5 items even with default size', function() {
    var list = makeList(null, 5);

    var items = getItems(list);
    expect(items.length).toBe(5);
  });

  it('expands to show 20 more items', function() {
    var list = makeList(null, 30);

    var items = getItems(list);
    expect(items.length).toBe(4);

    var more = getMore(list);
    TestUtils.Simulate.mouseDown(more);

    items = getItems(list);
    expect(items.length).toBe(24);
  });

  it('adds a show all element with too many items', function() {
    var list = makeList({allowShowAll: true}, 30);

    var items = getItems(list);
    expect(items.length).toBe(4);

    var showAll = getAll(list);
    TestUtils.Simulate.mouseDown(showAll);

    items = getItems(list);
    expect(items.length).toBe(30);
  });

  it('can change the initial size', function() {
    var list = makeList({initialSize: 10}, 30);

    var items = getItems(list);
    expect(items.length).toBe(10);
  });

  it('can change the number expanded', function() {
    var list = makeList({moreSize: 10}, 30);

    var items = getItems(list);
    expect(items.length).toBe(4);

    var more = getMore(list);
    TestUtils.Simulate.mouseDown(more);

    items = getItems(list);
    expect(items.length).toBe(14);
  });

  it('shows all with moreSize == 0', function() {
    var list = makeList({moreSize: 0}, 60);

    var items = getItems(list);
    expect(items.length).toBe(4);

    var more = getMore(list);
    TestUtils.Simulate.mouseDown(more);

    items = getItems(list);
    expect(items.length).toBe(60);
  });

  it('doesn\'t show "Show All" when items are covered by "More"', function() {
    var list = makeList({allowShowAll: true}, 40);

    var more = getMore(list);
    var all = getAll(list);

    TestUtils.Simulate.mouseDown(more);

    expect(function(){getAll(list)}).toThrow();
  });
});