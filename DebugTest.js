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

            // public interface
            var init = function () {
                DebugTest.testSuite[__testSuiteName] = [];
                return this;
            };

            this.addTest = function (__simpleTest) {
                __addTest(__simpleTest);
                return this;
            };

            this.run = function () {
                if (DebugTest.testSuite[__testSuiteName] && DebugTest.testSuite[__testSuiteName].length > 0) {
                    DebugTest.testSuite[__testSuiteName].forEach(function (__test) {
                        console.log("%c" + __test.testName, "font-weight:bold;");
                        if (__test.assertion === true) {
                            console.log("%c" + __test.message, "color:#eee; background-color:#01aa01;");
                        } else {
                            console.warn("%cAssertion failed", "color:#eee; background-color:#f33;");
                        }
                    });
                }
            };

            init();
            return this;
        }
    };


    g.DebugTest = g.DebugTest || DebugTest;

})(this);
