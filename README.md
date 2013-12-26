DebugDuck.js
============

Simple wrapper for console object functions.
Reference of 'console' - see:
https://developers.google.com/chrome-developer-tools/docs/console


After including DebugDuck.js into project, you can use dd object:
```javascript

    // shortest usage
    var k = 321;
    dd.p(k);

    // standard usage
    var i = 10;
    dd.setprefix("value of 'i' =").setstyle().printvar(i);

    // with aliases:
    var j = 123;
    dd.sp("Value of 'j' : ").ss("background-color: #0f0; color: #faa;").p(j);
```


Usage
=====

Basic methods
-------------

**setprefix(prefix, type)**

Sets prefix for output in console:

```javascript
// standard usage
dd.setprefix("output is: ", "warn");

// alias
dd.sp("output is: ", "warn")
```
**setstyle(style, type)**

Sets style for output string. 'style' must be a valid CSS syntax string

```javascript
dd.setstyle("color: #f00;", "error");
```
**printvar(value, type)**

Equal to 'console.log(value)'. Output will be formatted using settings from setstyle() and setprefix(), or default Duck's settings (see DebigDuck.js, definitions of defBgColor, defColor, ddStyle, timerStyle).

'Type' indicates what type of console message should be displayed (values corresponding to console types: log, warn or error)
console.log is default.

Grouping
--------

**group(groupname)**

**groupend()**

Groups output. Example:

```javascript

    var iterator = function(element) {
        dd.p(element);
    };

    // start grup with caption "TestArray elements", then show each of TestArray element
    dd.sp("TestArray element: ").g("TestArray array elements:");
        TestArray.forEach( iterator );  
    // end group  
    dd.ge();

```

Timing functions
================


