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

		// constants
		DT_LINE_LENGTH: 110,

		testSuite: {},

		/*
		 simpleTest object:
		 simpleTest: {
		 testName: name of simple test
		 assertion: assertion to be checked
		 message: message to be displayed if assertion is true; otherwise default message 'Assertion failed'
		 }
		 */

		/*
		 InitTestSuite(object)

		 Create test suite with some test as JSON object and
		 pass it to this method - the rest DebugTest will do for you
		 automatically

		 testSuiteObj: {
		 testSuiteName: <string> Test Suite Name
		 tests: [
		 {
		 testName: name of simple test
		 assertion: assertion to be checked
		 message: message to be displayed if assertion is true; otherwise default message 'Assertion failed'
		 }
		 ]
		 }
		 */
		initTestSuite: function (testSuiteObj) {

			var __testSuite;

			if (testSuiteObj.hasOwnProperty("testSuiteName")
				&& testSuiteObj.hasOwnProperty("tests")
				&& testSuiteObj.tests.length > 0) {
				// create test suite
				__testSuite = DebugTest.createTestSuite(testSuiteObj.testSuiteName);

				// add tests
				testSuiteObj.tests.forEach(function (__simpleTest) {
					__testSuite.addTest(__simpleTest);
				});

				// run
				__testSuite.run();
			}
		},


		/*
		 TestSuite

		 __testSuiteName: name of particular test suite
		 __simpleTest: simpleTest object

		 */
		createTestSuite: function (testSuiteName) {
			var __testSuiteName = testSuiteName || "DebugTest test suite",
				_lineLength = DebugTest.DT_LINE_LENGTH;

			/*
			 __simpleTest - instance of DebugTest.simpleTest
			 */
			var __addTest = function (__simpleTest) {
				DebugTest.testSuite[__testSuiteName].push(__simpleTest);
			};

			var __init = function () {
				DebugTest.testSuite[__testSuiteName] = [];
				return this;
			};

			// prints line in console, with fixed length
			this.__print = function (__str, __format, __format2) {
				var _strLength = (__format2) ? __str.length - 2 : __str.length,
					_padding = (_strLength < _lineLength) ? " ".repeat(_lineLength - _strLength) : "";


				__str = __str + _padding;
				if (__format2) {
					console.log(__str, __format, __format2);
				} else {
					console.log(__str, __format);
				}
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
				var _self = this,
					_total,
					i,
					_passed = 0,
					_passedBar = "",
					_passedPercentage,
					_failed = 0,
					_failedBar = "",
					_failedPercentage;

				_total = DebugTest.testSuite[__testSuiteName].length;

				if (DebugTest.testSuite[__testSuiteName] && DebugTest.testSuite[__testSuiteName].length > 0) {

					this.__print("%c *** DebugTest test suite runner ***   ", "font-weight:bold; background-color:#ddd; color:#111; border-top:2px solid #444;border-bottom:4px solid #ddd;");
					this.__print("%c *** " + __testSuiteName + " ***   ", "font-weight:bold; background-color:#ddd; color:#111;  border-bottom:4px solid #666;")

					DebugTest.testSuite[__testSuiteName].forEach(function (__test) {
						if (__test.assertion === true) {
							_self.__print("%c" + " [+]   PASSED: " + "%c " + __test.message + "  (" + __test.testName + ")  ",
								"color:#fff; font-weight:bold; background-color:#206f20;border-bottom:4px solid #206f20;",
								"color:#eee; background-color:#01aa01;border-bottom:4px solid #01aa01;");
							_passed++;
						} else {
							_self.__print("%c" + " [-]   FAIL:   " + "%c " + __test.message + "  (" + __test.testName + ")  ",
								"color:#fff; font-weight:bold; background-color:#a01111;border-bottom:4px solid #a01111;",
								"color:#eee; background-color:#f33;border-bottom:4px solid #f33;");
							_failed++;
						}
					});
					this.__print("%c ***           SUMMARY           *** ", "font-weight:bold; background-color:#ddd; color:#111; border-top:4px solid #666;border-bottom:4px solid #ddd;");

					_passedPercentage = parseInt((_passed / _total) * 100, 10);
					_failedPercentage = parseInt((_failed / _total) * 100, 10);
					this.__print("%c  total tests run: " + _total + "                 ", "background-color:#eee; color:#222; font-weight:bold;border-bottom:4px solid #eee;");

					for (i = 0; i < (10 - (_passedPercentage / 10)); i++) {
						_failedBar += "---";
					}

					while (i < 10) {
						_passedBar += "+++";
						i++;
					}

					this.__print("%c  " + _passedBar + "%c" + _failedBar + "     ",
						"font-weight:bold; background-color:#ddd; color:#206f20; border-bottom:4px solid #ddd;",
						"background-color:#ddd; font-weight:bold; color:#a01111; border-bottom:4px solid #ddd;");
					this.__print("%c  passed: " + _passed + " (" + _passedPercentage +
						"%)                  " + ((_passedPercentage > 99) ? " " : (_passedPercentage < 10) ? "   " : "  "),
						"background-color:#eee; font-weight:normal; color:#206f20;border-bottom:4px solid #eee;");
					this.__print("%c  failed: " + _failed + " (" + _failedPercentage +
						"%)                  " + ((_failedPercentage > 99) ? " " : (_failedPercentage < 10) ? "   " : "  "),
						"background-color:#eee; font-weight:normal; color:#a01111;border-bottom:4px solid #eee;");

					this.__print("%c *** DebugTest says: I'm done :P *** ", "font-weight:bold; background-color:#ddd; color:#111; border-bottom:2px solid #444;");

					// empty line separator
					console.log(" ");
					console.log(" ");

				}
			};

			__init();
			return this;
		}
	};


	g.DebugTest = g.DebugTest || DebugTest;

})(this);
