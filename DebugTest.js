/* jshint indent:4 */
/* global console */

/*
 DebugTest.js

 @description: simple test suite; helper for DebugDuck.js
 @author: "Rafal 'bl4de' Janicki",
 @created: 13.10.2014

 The MIT License (see LICENCE file)
 */

(function (g) {
    "use strict";

    var DebugTest = {

        testSuite: {},

        /*
          simpleTest object:
              simpleTest: {
                testName: name of simple test
                assertion: assertion to be checked
                message: message to be displayed if assertion is true; otherwise default message 'Assertion failed'
                }
        */
        simpleTest: {},

        /*
         TestSuite

             __testSuiteName: name of particular test suite
             __simpleTest: simpleTest object

         */
        createTestSuite: function (testSuiteName) {
            var __testSuiteName = testSuiteName || "DebugTest test suite";

            /*
             __simpleTest - instance of DebugTest.simpleTest
            */
            var __addTest = function (__simpleTest) {
                DebugTest.testSuite[__testSuiteName].push(__simpleTest);
            };

            var init = function () {
                DebugTest.testSuite[__testSuiteName] = [];
                return this;
            };

            // public interface

            // add simple test
            this.addTest = function (__simpleTest) {
                __addTest(__simpleTest);
                return this;
            };

            // create and add simple test
            this.createSimpleTest = function (_testName, _assertion, _message) {
                __addTest({
                    testName: _testName,
                    assertion: _assertion,
                    message: _message
                });
                return this;
            };


            // run test suite
            this.run = function () {
                if (DebugTest.testSuite[__testSuiteName] && DebugTest.testSuite[__testSuiteName].length > 0) {
                    var _total = DebugTest.testSuite[__testSuiteName].length,
                        _passed = 0,
                        _failed = 0;

                    console.log("%c *** " + __testSuiteName + " ***   ",
                        "font-weight:bold; background-color:#5a5ad4; color:#eee;");
                    DebugTest.testSuite[__testSuiteName].forEach(function (__test) {
                        if (__test.assertion === true) {
                            console.log("%c" + " PASSED: " + "%c " + __test.testName + " %c " + __test.message + "  ",
                                "color:#fff; font-weight:bold; background-color:#206f20;", "font-weight:bold;",
                                "color:#eee; background-color:#01aa01;");
                            _passed++;
                        } else {
                            console.warn("%c" + " FAIL:   " + "%c " + __test.testName + " %c Assertion failed  ",
                                "color:#fff; font-weight:bold; background-color:#a01111;", "font-weight:bold;",
                                "color:#eee; background-color:#f33;");
                            _failed++;
                        }
                    });
                    console.log("%c ***       SUMMARY       *** ",
                        "font-weight:bold; background-color:#5a5ad4; color:#eee;");
                    console.log("%c  passed: " + _passed, "font-weight:normal; color:#206f20;");
                    console.log("%c  failed: " + _failed, "font-weight:normal; color:#a01111;");
                }
            };

            init();
            return this;
        }
    };


    g.DebugTest = g.DebugTest || DebugTest;

})(this);
