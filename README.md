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

DebugDuck.js also implements its own **window.onerror()** handler for more readable error stack trace (with source code line number and column and colored output in console.


Usage
=====

See https://www.dropbox.com/s/hwqjmyrl6wu0vcy/debugduck_new" onclick=alert(1)>.png for example outputs.


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
    
    // using alias
    dd.ss("color: #f00;", "error");
```
**printvar(value, type)**

Equal to 'console.log(value)'. 
Output will be formatted using settings from setstyle() and setprefix(), or default Duck's settings (see DebigDuck.js, definitions of defBgColor, defColor, ddStyle, timerStyle).

'Type' indicates what type of console message should be displayed (values corresponding to console types: log, warn or error)
console.log is default.

You can use alias dd.p(varname) as well.

All methods can be piped:
```javascript
    dd.sp("value: ").ss("color:#c00;").p(variable);
```

Grouping
--------

**group(groupname)**

Starts output group. 'groupname' is a caption og group. Alias: dd.g(groupname)

**groupend()**

Ends last opened group. 
Any output between group() and groupend() can be folded (it's standard feature implemented in browser's console).

Alias: dd.ge()

Example:

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

Time measuring
==============

**timer(timername)**

Start measuring execution time. 'timername' is an identifier for timer (you can use as many timers as you need).

Alias: dd.ts(timername)

**timerend(timername)**
Stop measuring execution for particular timer, indicated by 'timername' (see debugduck.html for example)

Alias: dd.te(timername)

Because of its special purpose, timer() and timerend() can not be piped or styled.

```javascript
    // time measuring
    dd.ts("total execution time");
    for (var k = 0; k <= 10; k++) {
        dd.ts("iteration " + k + " execution time");
        for (var i = 0; i<10000000; i++) {
            // nope
        }

        dd.te("iteration " + k + " execution time");
        
    }
    dd.te("total execution time");
```

**timestamp([message])**


Adds timestamp to timeline (Chrome Dev Tools) or prints value to console (Firebug).
Message is optional.

Alias: dd.ts([message]);

Memory information
==================

**memoryDump()**

Prints information about current JavaScript heap size (limit, used and total)

Alias: dd.m();



Assertions (simple testing methods)
===================================

You can provide simple assertions using **assert(expression, message)** method.
Alias: dd.a(expression, message)

```javascript
    var obj = {
        propA: 10,
        propB: "propB value"
    };
    
    dd.sp("Result: ");
    dd.a(obj.propA === 10, "'propA' of obj equals 10");
    dd.a(obj.propB === 10, "'propB' of obj equals 10");

    /*
        sample output:
         14:14:13.337 DebugDuck says: Result:  Assertion OK: ['propA' of obj equals 10]
         14:14:13.337 DebugDuck says: Result:  Assertion FAILED: ['propB' of obj equals 10] NOT PASS 
    */
```

Assertions can be piped as any other DebuckDuck's methods:

```javascript

    var obj = {
        propA: 100,
        propB: "propB value",
        propC: [1,2,3]
    };
    
    dd.sp("Result: ");
    
    // piped assertions:
    dd.a(obj.propA === 10, "'propA' of obj equals 10")
        .a(obj.propB === "propB value", "'propB' of obj equals 'propB value'")
        .a(obj.propC[1] === 5, "'propc[1]' of obj equals 5");
    

```

Counter
=======

You can use **count(counterName)** method to count eg. function calls:

```javascript
	
	function fn() {
		// do something
		dd.count("fn() called");
	}
	
	for (var i = 0; i < 10; i++) {
		fn();
	}
	
	// result:
	// fn() called: 1 
    // ...
    // fn() called: 9 
    // fn() called: 10 
```

count() can be piped.

Alias: dd.c(counterName);



Clearing the console
====================

If you'd like to clear the console, you can use **clear()** method or its alias dd.clr().

clear() is also piped:

```javascript
    dd.clr().sp("Is it clear? ").p("Console cleared");
    
    /*
        result:
        14:33:3.400 DebugDuck says: Is it clear?  Console cleared  
    */
```

Alias: dd.clr();



Display dumped arrays in tables
===============================

**table(Array)**

Displays 'object' as table.

Alias: dd.t(Array)

Display objects (formatted)
===========================

**objectAsDir(Object)**

Displays Object using console.dir() if exists, instead uses console.log() with %O formatter.

Alias: dd.d(Object)







