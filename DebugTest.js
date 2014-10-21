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

		//__print: function() {
		//	console.log.apply(console.log, arguments);
		//},


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
			var __testSuiteName = testSuiteName || "DebugTest test suite";

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
				var _total,
					i,
					_passed = 0,
					_passedBar = "",
					_passedPercentage,
					_failed = 0,
					_failedBar = "",
					_failedPercentage;

				_total = DebugTest.testSuite[__testSuiteName].length;

				if (DebugTest.testSuite[__testSuiteName] && DebugTest.testSuite[__testSuiteName].length > 0) {


					console.log("%c *** DebugTest test suite runner ***   ",
						"font-weight:bold; background-color:#ddd; color:#111;");
					console.log("%c *** " + __testSuiteName + " ***   ",
						"font-weight:bold; background-color:#ddd; color:#111;");
					DebugTest.testSuite[__testSuiteName].forEach(function (__test) {
						if (__test.assertion === true) {
							console.log("%c" + " [+]   PASSED: " + "%c " + __test.message + "  (" + __test.testName + ")  ",
								"color:#fff; font-weight:bold; background-color:#206f20;",
								"color:#eee; background-color:#01aa01;");
							_passed++;
						} else {
							console.warn("%c" + " [-]   FAIL:   " + "%c " + __test.message + "  (" + __test.testName + ")  ",
								"color:#fff; font-weight:bold; background-color:#a01111;",
								"color:#eee; background-color:#f33;");
							_failed++;
						}
					});
					console.log("%c ***           SUMMARY           *** ",
						"font-weight:bold; background-color:#ddd; color:#111;");

					console.log("%c  total tests run: " + _total + "                 ",
						"background-color:#eee; color:#222; font-weight:bold;");
					_passedPercentage = parseInt((_passed / _total) * 100, 10);
					_failedPercentage = parseInt((_failed / _total) * 100, 10);

					for (i = 0; i < (10 - (_passedPercentage / 10)); i++) {
						_failedBar += "---";
					}

					i = 0;
					while (i < (10 - (_failedPercentage / 10))) {
						_passedBar += "+++";
						i++;
					}

					console.log("%c  " + _passedBar + "%c" + _failedBar + "     ",
						"font-weight:bold; background-color:#ddd; color:#206f20",
						"background-color:#ddd; font-weight:bold; color:#a01111;");
					console.log("%c  passed: " + _passed + " (" + _passedPercentage +
						"%)                  " + ((_passedPercentage > 99) ? " " : (_passedPercentage < 10) ? "   " : "  "),
						"background-color:#eee; font-weight:normal; color:#206f20;");
					console.log("%c  failed: " + _failed + " (" + _failedPercentage +
						"%)                  " + ((_failedPercentage > 99) ? " " : (_failedPercentage < 10) ? "   " : "  "),
						"background-color:#eee; font-weight:normal; color:#a01111;");

					console.log("%c *** DebugTest says: I'm done :P *** ",
						"font-weight:bold; background-color:#ddd; color:#111;");

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
