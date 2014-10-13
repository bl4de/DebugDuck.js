/* jshint indent:4 */
/* global console */

/*
 DebugTestSample.js

 @description: sample test suite for DebugTest.js
 @author: "Rafal 'bl4de' Janicki",
 @created: 13.10.2014

 The MIT License (see LICENCE file)
 */

// create testSuite
var testSuite = DebugTest.createTestSuite("Sample test suite");


// two simple test - first should pass, second shouldn't
var test1 = {
        testName: "Test one",
        assertion: 1 == 1,
        message: "Indeed, one equals one :P"
    },
    test2 = {
        testName: "Test two",
        assertion: "DebugTest".length > 10,
        message: "Uh oh, DebugTest has more than 10 signs, surprising... :P"
    };

// add these tests to testSuite
testSuite.addTest(test1);
testSuite.addTest(test2);

// run testSuite
testSuite.run();

/*
output in console:

Test one
Indeed, one equals one :P
Test two
Assertion failed

*/
