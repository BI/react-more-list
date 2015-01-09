react-more-list
===============

Note: None of these are implemented yet. This is outline document saying it what it will do.

A list control that gives you the ability to to limit the ammount of items shown. The more list should have only list items (i.e. `<li>`) as its children

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
    </MoreList>

Generates a list like the following:

* Apple
* Banana
* Coconut
* Durian
* more... (3)

Properties
----------

### initialSize ###

**Type:** number  
**Default:** 4  
**Example:** `<MoreList initialSize={4}>`  
**Required:** no

* The initial size of the list. You will get a maximum number of list items equal to `initialSize` (not including "more").
* If the actual number of list items is greater than `initialSize`, you will end up with one additional item; "more... (x)" will be appended to the end of the list. Clicking "more" will show more elements.
* If the number of list items is smaller than `initialSize`, the list will display all of them.

#### See Also ####

* `maxNewItems`
* `tolerance`

### maxNewItems ###

**Type:** number  
**Default:** 20  
**Example:** `<MoreList maxNewItems={20}>`  
**Required:** no

* Maximum number of elements added when "more" is clicked. If there are more elements than `maxNewItems` another "more" will appear after it is clicked.
* If `maxNewItems` is set to 0, all items will be shown when "more" is clicked, regardless of the count.

#### See Also ####

* `tolerance`
* `showAll`

### tolerance ###

**Type:** number  
**Default:** 1  
**Example:** `<MoreList tolerance={1}>`  
**Required:** no

* The number of items over `initialSize` to show anyway.
* If the number of elements hidden by "more" would be equal to or less than `tolerance` they are added to the list instead of displaying "more."

### showAll ###

**Type:** boolean  
**Default:** false  
**Example:** `<MoreList showAll={false}>`  
**Required:** no

* Adds a "show all" command after "more" if the number of items hidden by "more" is greater than `maxNewItems`.
* If `maxNewItems` is set to 0 this will have no effect.

### showCount ###

**Type:** boolean  
**Default:** true  
**Example:** `<MoreList showCount={true}>`  
**Required:** no

* If true, shows the count of items next to "more" and "show all."

CSS Classes
-----------

* **MoreList:** Will become an `<ul>` with class `ml-list`.
* **List Items:** Stays a `<li>`, gains `ml-list-item` class.
* **More:** Becomes a `<li>` with class `ml-more`. The count of items hidden is wrapped in a `<span>` with class `ml-more-count`.
* **Show All:** Becomes a `<li>` with class `ml-show-all`. The count of items hidden is wrapped in a `<span>` with class `ml-show-all-count`.
