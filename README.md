DebugDuck.js
============

Simple wrapper for console object functions.

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

Methods
-------

**setprefix(prefix, type)**

Sets prefix for output in console:

```javascript
dd.setprefix("output is: ", "warn");
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



