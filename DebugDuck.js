/* jshint indent:4 */
/* global console */

/**
 DebugDuck.js

 @description: simple console() global object wrapper to display debug output via console
 @author "Rafal 'bl4de' Janicki",
 @created 24.12.2013

 The MIT License (see LICENCE file)
 */
(function (g) {
    "use strict";

    /**
     * DebugDuckException definition
     * @param {String} message
     * @constructor
     */
    function DebugDuckException(message) {
        this.message = message;
        this.name = "DebugDuckException";
    }

    try {
        if (typeof g.console !== "object") {
            throw new DebugDuckException("global.console not exists, DebugDuck made a boo :(");
        } else {
            // definition of DebugDuck object
            var DebugDuck = {

                // ########     Duck's intestines   ###########

                // types of console messages
                types: {
                    "log": "log",
                    "warn": "warn",
                    "warning": "warn",
                    "err": "error",
                    "error": "error"
                },

                /**
                 *  default DebugDuck output message
                 */
                message: "DebugDuck default message",

                /**
                 * array where vars are storing for DD window
                 */
                vars: [],

                /**
                 * show/hide DD window?
                 */
                showDDWindow: true,

                /**
                 * events listener array
                 */
                events: [],

                /**
                 * prefix
                 */
                prefix: {},

                /**
                 * styles for output
                 */
                style: {},

                /**
                 * last profile name for console.profile()
                 */
                lastProfileName: "",

                /**
                 * profile names for multiple profiles
                 */
                profileNames: [],

                /**
                 * default output background color
                 */
                defBgColor: '#FFFF00',

                /**
                 * default output color
                 */
                defColor: '#2E2E2E',

                /**
                 * 'DebugDuck says' style
                 */
                ddStyle: 'background-color: #868A08; color: #fff; font-size:10px; border: 1px solid #868A08;',

                /**
                 * timer output style
                 */
                timerStyle: 'background-color: #fee; color: #111; font-size:10px; border: 1px solid #868A08;',

                // ########     Duck's initialization   ###########

                /**
                 * initialization of DebugDuck global onject
                 *
                 * @param {object} global object
                 * @private
                 */
                __init: function (g) {
                    if (g.document) {
                        // save references to interesting DOM objects :)
                        var _document = g.document,
                            _body = g.document.body,
                            __ddDiv = _document.createElement('div'),
                            __initialP = _document.createElement('p'),
                            __varList = _document.createDocumentFragment(),
                            __title = _document.createTextNode('Debug Duck says:'),
                            self = this;

                        // sets styles for DD window
                        __ddDiv.style.display = (this.showDDWindow === true) ? 'block' : 'none';
                        __ddDiv.style.width = "50%";
                        __ddDiv.style.padding = "10px";
                        __ddDiv.style.position = "absolute";
                        __ddDiv.style.overflow = "auto";
                        __ddDiv.style.top = "20px";
                        __ddDiv.style.right = "20px";
                        // __ddDiv.style.height = "25%";
                        __ddDiv.style.border = "2px solid #f00";
                        __ddDiv.style.borderRadius = "6px";
                        __ddDiv.style.backgroundColor = "rgba(220,220,220,0.4)";

                        // adds DD window to DOM
                        _body.insertBefore(__ddDiv);
                        __initialP.appendChild(__title);
                        __ddDiv.appendChild(__initialP);

                        // recursive display stored vars with updating
                        this.render = function () {
                            // cleanup window first
                            // __ddDiv.removeChild(__varList);
                            self.vars.forEach(function (v) {
                                if (!v.rendered) {
                                    var _varDiv = _document.createElement('div'),
                                        _varValue = _document.createTextNode(v.value);

                                    if (v.type === "err") {
                                        _varDiv.style.backgroundColor = "#f24";
                                    }

                                    if (v.type === "warn") {
                                        _varDiv.style.backgroundColor = "#FF9933";
                                    }

                                    _varDiv.appendChild(_varValue);
                                    __varList.appendChild(_varDiv);
                                    v.rendered = true;
                                }
                            });
                            __ddDiv.appendChild(__varList);
                        };

                        this.showWindow = function () {
                            // toggle DD window visibility
                            self.showDDWindow = !self.showDDWindow;
                            self.__ddDiv.style.display = (self.showDDWindow === true) ? 'block' : 'none';

                        };

                        this.attachEvent('UPDATE_WINDOW', this.render);

                    } else {
                        this.printvar("'document' object doesn't exists, probably not a web browser?");
                    }
                },

                // ########     Event listener     ###########

                /**
                 * Attaches event callback
                 *
                 * @param {String} evt event name
                 * @param {Function} callback
                 */
                attachEvent: function (evt, callback) {
                    this.events.push({
                        eventName: evt,
                        eventCallback: callback
                    });
                },

                /**
                 * Triggers event
                 *
                 * @param {String} evt event to trigger name
                 */
                triggerEvent: function (evt) {
                    this.events.forEach(function (e) {
                        if (e.eventName === evt) {
                            e.eventCallback();
                        }
                    });
                },

                // ########     Duck's interface   ###########

                /**
                 * Set prefix for output string
                 *
                 * @param {String} prefix
                 * @param {String} type
                 * @returns {DebugDuck} instance of DedugDuck
                 */
                setprefix: function (prefix, type) {
                    this.prefix[this.types[type] || "log"] = prefix;
                    return this;
                },

                /**
                 * Set styles for output string
                 *
                 * @param {String} style CSS string describes styles
                 * @param {String} type type of message (log, warn, error)
                 * @returns {DebugDuck} instance of DedugDuck
                 */
                setstyle: function (style, type) {
                    this.style[this.types[type] || "log"] = style || 'background-color: ' + this.defBgColor + '; color: ' + this.defColor;
                    return this;
                },

                /**
                 * Diplays value of variable using defined formatting
                 *
                 * @param {String} value
                 * @param {String} type
                 * @returns {DebugDuck}
                 */
                printvar: function (value, type) {
                    this.vars.push({
                        value: value,
                        type: type,
                        renderer: false
                    });

                    this.triggerEvent('UPDATE_WINDOW');

                    this.__formatAndPrint(value, type);
                    return this;
                },

                /**
                 * Set start of group
                 *
                 * @param groupname
                 * @returns {DebugDuck}
                 */
                group: function (groupname) {
                    console.group(groupname);
                    return this;
                },

                /**
                 * Closes group display
                 *
                 * @returns {DebugDuck}
                 */
                groupend: function () {
                    console.groupEnd();
                    return this;
                },

                timestamp: function (__message) {
                    var message = __message ? this.__setMessage(__message) : this.message;
                    console.timeStamp(message);
                    return this;
                },

                timer: function (timername) {
                    if (!timername) {
                        timername = "timer_" + Math.floor(Math.random(1000) * 1000);
                    }
                    console.time(timername);
                },

                timerend: function (timername) {
                    console.timeEnd(timername);
                },

                table: function (obj) {
                    console.table(obj);
                },

                trace: function (fn) {
                    console.trace(fn);
                },

                objectAsDir: function (obj) {
                    // use console.dir() if exists
                    if (console.hasOwnProperty("dir")) {
                        console.dir(obj);
                        return this;
                    }
                    // instead, try to format obj in console.log()
                    console.log("%O", obj);
                    return this;
                },

                // console.assert ?
                assert: function (exp, message) {
                    if (exp) {
                        this.setstyle("background-color:#1bad1b; font-weight:bold; color:#fff;");
                        this.__formatAndPrint("Assertion OK: [" + message + "]");
                    } else {
                        this.setstyle("background-color:#f00; font-weight:bold; color:#eee;");
                        this.__formatAndPrint("Assertion FAILED: [" + message + "] NOT PASS");
                    }
                    return this;
                },


                profileStart: function (profileName) {
                    if (!profileName) {
                        this.lastProfileName = "defaultProfile_" + this.profileNames.length;
                    } else {
                        this.lastProfileName = profileName;
                    }
                    this.profileNames.push(this.lastProfileName);
                    console.profile(this.lastProfileName);
                },


                profileEnd: function (profileName) {
                    if (profileName && this.profileNames.indexOf(profileName) > -1) {
                        console.profileEnd(profileName);
                        return;
                    }
                    console.profileEnd(this.profileNames[this.profileNames.length - 1]);
                    this.profileNames.pop();
                },

                memoryDump: function () {
                    var __memoryProp,
                        __memoryPropName,
                        __memoryPropKBValue,
                        __memoryPropMBValue;
                    if (console.hasOwnProperty("memory")) {
                        this.setstyle("background-color:#1bad1b; font-weight:bold; color:#fff;");
                        for (__memoryProp in console.memory) {
                            __memoryPropKBValue = parseInt(console.memory[__memoryProp] / 1024, 10);
                            __memoryPropMBValue = (__memoryPropKBValue > 1024) ? parseInt(__memoryPropKBValue / 1024, 10) : __memoryPropKBValue * 0.001024;
                            __memoryPropName = __memoryProp.replace(/([A-Z]+)/g, " $&").replace(/js|JS/, "JavaScript ");
                            this.__formatAndPrint(__memoryPropName + ': ' + __memoryPropKBValue + ' kB; ' + __memoryPropMBValue + ' MB');
                        }
                    }
                },

                // clearing the console
                clear: function () {
                    console.clear();
                    return this;
                },

                // counter
                count: function (counterName) {
                    if (console.count) {
                        console.count(counterName);
                    }
                    return this;
                },


                // ########     Duck's inner methods   ###########

                /*
                 custom call stack message
                 */
                __onerror: function (message, file, line, col, error) {
                    console.log("%c-------------------------------------------" +
                        "-----------------------------------------------" +
                        "-----------------------------------------------",
                        "color: #f00;"); // empty line separator

                    console.log("%c  " + message + "  ", "background-color:#ef2d2d; font-weight:bold; color:#fff;");
                    console.log("%c" + "at " + file + " in line " + line + "; column " + col,
                        "bakcground-color:#ef2d2d; font-weight:bold; color: #f00;");
                    console.log("%c STACK TRACE:", "font-weight: bold; background-color: #fff46d;");
                    console.log("%c" + error.stack,
                        "background-color: #fff46d; font-weight:normal; color: #f00;");
                    console.log("%c-------------------------------------------" +
                        "-----------------------------------------------" +
                        "-----------------------------------------------",
                        "color: #f00;"); // empty line separator

                },

                __setMessage: function (message) {
                    this.message = message || this.message;
                },

                // set timer for output
                __timer: function () {
                    var output = new Date();

                    return '\u238b ' + output.getHours() + ":" + output.getMinutes() + ":" + output.getSeconds() + "." + output.getMilliseconds();
                },

                // format output for console.log() using settings
                __formatAndPrint: function (value, type) {
                    var __output = '',
                        __type = this.types[type] || "log";

                    if (this.prefix[__type]) {
                        __output = this.prefix[__type] + __output;
                    }

                    __output += ' ' + value;
                    console[__type]("%c" + this.__timer() + "%c DebugDuck says:%c " + __output + " ",
                        this.timerStyle, this.ddStyle, this.style[__type]);
                }


            };

            // definitions of aliases
            DebugDuck.ss = DebugDuck.setstyle;
            DebugDuck.sp = DebugDuck.setprefix;
            DebugDuck.p = DebugDuck.printvar;
            DebugDuck.g = DebugDuck.group;
            DebugDuck.ge = DebugDuck.groupend;
            DebugDuck.ts = DebugDuck.timer;
            DebugDuck.te = DebugDuck.timerend;
            DebugDuck.t = DebugDuck.table;
            DebugDuck.tr = DebugDuck.trace;
            DebugDuck.d = DebugDuck.objectAsDir;
            DebugDuck.ts = DebugDuck.timestamp;
            DebugDuck.a = DebugDuck.assert;
            DebugDuck.clr = DebugDuck.clear;
            DebugDuck.c = DebugDuck.count;
            DebugDuck.m = DebugDuck.memoryDump;
            DebugDuck.ps = DebugDuck.profileStart;
            DebugDuck.pe = DebugDuck.profileEnd;


            // asigned to global as 'dd':
            g.dd = DebugDuck;

            // custom call stack handler from Debug Duck
            g.onerror = this.__onerror;

            // call __init
            DebugDuck.__init(g);
        }

    } catch (e) {
        // e.message
    }
})(this);
