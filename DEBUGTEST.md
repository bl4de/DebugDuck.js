DebugTest Doc
=============

**DebugTest.js** is simple library for creating simple tests and test suites with formatted, beautified output in console or in browser.

For sample usage run **debugtest.html** (via browser) or **debugtestsample.js** in console.

https://github.com/bl4de/DebugDuck.js/blob/master/debugtest.html


Standard usage
==============

**Create test suite**

```javascript

var testSuite = DebugTest.createTestSuite("Sample test suite");


```

**Create unit tests**

```javascript

// as objects
var test1 = {
        testName: "Test one",
        assertion: 1 == 1,
        message: "Indeed, one equals one :P"
    };
    
testSuite.addTest(test1);
 
// by method
testSuite.createSimpleTest("Another simple test", (10 % 3 === 1), "Yes, 10 modulo 3 equals 1");

```

**Run test suite**

```javascript

testSuite.run();

```

Create and run the whole tests just in one JSON
===============================================

You can also create the whole test suite as one JSON object:

```javascript

var newtest = {
	testSuiteName: "Another test suite",
	tests: [
		{
			testName: "Some new test",
			assertion: "Audi".length === 4,
			message: "Four rings, four letters :P"
		},
		{
			testName: "Yet another test",
			assertion: someFuncToTest(10,20) === 30,
			message: "someFuncToTest() works well, as expected, just perfect :)"
		}

	]
};

```

Now, it is only one step to create and run test suite:

```javascript

DebugTest.initTestSuite(newtest);


```


Output
======

**See output in console**

Sample output:

https://www.dropbox.com/s/6jc0y4zp8wa1y2m/debugtest_pretty_output.png?dl=0
