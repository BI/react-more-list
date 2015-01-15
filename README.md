react-more-list
===============

A list control that gives you the ability to to limit the ammount of items shown. The more list should have only list items (i.e. `<li>`) as its children. For an example, see [this demo](http://yeahbuthats.github.io/react-more-list/).

To do initial setup, open a command window in the directory and run the following:

    npm install
    webpack

Usage
-----

    <MoreList>
        <li>Apple</li>
        <li>Banana</li>
        <li>Coconut</li>
        <li>Durian</li>
        <li>Elderberry</li>
        <li>Fig</li>
        <li>Grape</li>
        <li>Huckleberry</li>
        <li>Ita Palm</li>
        <li>Jujubes</li>
        <li>Kiwi</li>
        <li>Lemon</li>
        <li>Mango</li>
        <li>Nectarine</li>
        <li>Orange</li>
        <li>Pineapple</li>
        <li>Quince</li>
        <li>Raspberry</li>
        <li>Strawberry</li>
        <li>Tangerine</li>
        <li>Ugli</li>
        <li>Voavanga</li>
        <li>Watermelon</li>
        <li>Xigua melon</li>
        <li>Yellow watermelon</li>
        <li>Zucchini</li>
    </MoreList>

Generates a list like the following:

* Apple
* Banana
* Coconut
* Durian
* More... 22

Properties
----------

### initialSize ###

**Type:** number  
**Default:** 4  
**Example:** `<MoreList initialSize={4}>`  
**Required:** no

* The initial size of the list. You will get a maximum number of list items equal to `initialSize` (not including "More").
* If the actual number of list items is greater than `initialSize`, you will end up with one additional item; "More... x" will be appended to the end of the list. Clicking "More" will show more elements.
* If the number of list items is smaller than `initialSize`, the list will display all of them.

#### See Also ####

* `moreSize`
* `tolerance`

### moreSize ###

**Type:** number  
**Default:** 20  
**Example:** `<MoreList moreSize={20}>`  
**Required:** no

* The number of elements added when "More" is clicked. If there are more elements than `moreSize` another "More" will appear after it is clicked.
* If `moreSize` is set to 0, all items will be shown when "More" is clicked, regardless of the count.
* The number shown for unshown items will show the most relevant number.
    * If `allowShowAll` is false, the number shown is the number of unshown items.
    * If `allowShowAll` is true and the remaining unshown items is greater than `moreSize`, the number shown  will be `moreSize` with a "+" appended (e.g. "More... 20+").
    * If `allowShowAll` is true and the remaining unshown items is less than or equal to, the number shown is the remaining items ("Show All" won't be shown in this case).

#### See Also ####

* `tolerance`
* `allowShowAll`

### tolerance ###

**Type:** number  
**Default:** 1  
**Example:** `<MoreList tolerance={1}>`  
**Required:** no

* The number of items over the current calculated number of items to show anyway.
* If the number of elements hidden by "More" would be equal to or less than `tolerance` instead of showing "More" the remining elements would be displayed.
    * e.g. If `tolerance` is 1, and there is only 1 unshown item, the unshown item is displayed anyway (instead of displaying "More").

### allowShowAll ###

**Type:** boolean  
**Default:** false  
**Example:** `<MoreList allowShowAll={false}>`  
**Required:** no

* Adds a "Show All" option after "More" if the number of items hidden by "More" is greater than `moreSize`.
    * The maximum list size if this is set to true is `initialSize` + 2 ("More" and "Show All").
* If `moreSize` is set to 0 this will have no effect.
* This does factor in `tolerance`, so it may not appear if `moreSize` + `tolerance` >= remaining items.
* In short: "Show All" will not appear if clicking "More" will show all of the remaining data.
* Size shown will always be the total number of items still not shown.

### showCount ###

**Type:** boolean  
**Default:** true  
**Example:** `<MoreList showCount={true}>`  
**Required:** no

* If true, shows the count of items next to "More" and "Show All."

CSS Classes
-----------

* **MoreList:** Will become an `<ul>` with class `ml-list`.
* **List Items:** Stays a `<li>`, gains `ml-list-item` and `ml-data` class.
* **More:** Becomes a `<li>` with classes `ml-list-item`, `ml-expander`, and `ml-more`. The count of items hidden is wrapped in a `<span>` with classes `ml-count` and `ml-more-count`.
* **Show All:** Becomes a `<li>` with classes `ml-list-item`, `ml-expander`, and `ml-show-all`. The count of items hidden is wrapped in a `<span>` with classes `ml-count` and `ml-show-all-count`.
