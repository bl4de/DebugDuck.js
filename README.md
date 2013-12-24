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

See comments in DebugDuck.js file for details.