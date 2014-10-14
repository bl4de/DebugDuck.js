/* jshint indent:4 */
/* global DebugTest */

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
testSuite
    .addTest(test1)
    .addTest(test2);

// alternative method of adding simple test - using delegated method createSimpleTest(name, assertion, message)

testSuite.createSimpleTest("Another simple test", (10 % 3 === 1), "Yes, 10 modulo 3 equals 1");
testSuite.createSimpleTest("Yet another simple test", (12 + 12 === 24), "Yes, 12 plus 12 equals 24, nothing surprising here :)");
testSuite.createSimpleTest("And yet another simple test", (12 + 12 === 25), "Uh, oh, 12 plus 12 not equals 25? :/ ");

// run testSuite
testSuite.run();

/*
output in console:

Test one
Indeed, one equals one :P
Test two
Assertion failed

*/
