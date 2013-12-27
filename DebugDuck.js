/* jshint indent:4 */
/* global console */

/*
    DebugDuck.js

    @description: simple console() global object wrapper to display debug output via console
    @author: "Rafal 'bl4de' Janicki",
    @created: 24.12.2013

    The MIT License (see LICENCE file)
*/

(function(g) {
    "use strict";

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
                    "log" : "log",
                    "warn" : "warn",
                    "Warrning" : "warn",
                    "err" : "error",
                    "error" : "error"
                },

                // prefix 
                prefix: {},

                // styles for output
                style: {},

                // default background color
                defBgColor: '#FFFF00',

                // default text color
                defColor: '#2E2E2E',

                // 'DebugDuck says' style
                ddStyle: 'background-color: #868A08; color: #fff; font-size:10px; border: 1px solid #868A08;',

                // timer style:
                timerStyle: 'background-color: #fee; color: #111; font-size:10px; border: 1px solid #868A08;',

                
                // ########     Duck's interface   ###########

                // prefix setter
                // alias: dd.sp(prefix)
                setprefix: function(prefix, type) {
                    this.prefix[ this.types[type] || "log" ] = prefix;
                    return this;
                },

                // output style definition
                // alias: dd.ss(style)
                setstyle: function(style, type) {
                    this.style[ this.types[type] || "log" ] = style || 'background-color: ' + this.defBgColor + '; color: '  + this.defColor;
                    return this;
                },

                // display variable value - wrapper for console.log()
                // alias: dd.p(value)
                printvar: function(value, type) {
                    this.__formatAndPrint(value, type);
                    return this;
                },

                // grouping output
                group: function(groupname) {
                    console.group(groupname);
                    return this;
                },

                groupend: function() {
                    console.groupEnd();
                    return this;
                },

                timer: function(timername) {
                    if (!timername) {
                        timername = "timer_" + Math.floor(Math.random(1000)*1000);
                    }
                    console.time(timername);
                },

                timerEnd: function(timername) {
                    console.timeEnd(timername);
                },

                table: function(obj) {
                    console.table(obj);
                },


                // ########     Duck's inner methods   ###########

                // set timer for output
                __timer: function() {
                    var output = new Date();

                    return '\u238b ' + output.getHours() + ":" + output.getMinutes() + ":" 
                    + output.getSeconds() + "." + output.getMilliseconds();
                },

                // format output for console.log() using settings
                __formatAndPrint: function(value, type) {
                    var __output = '',
                        __type = this.types[type] || "log" ;

                    if (this.prefix[__type]) {
                        __output = this.prefix[__type] + __output;
                    }

                    __output += ' ' + value;
                    console[__type]( "%c" + this.__timer() + "%c DebugDuck says:%c " + __output + " ", 
                        this.timerStyle, this.ddStyle, this.style[__type] );
                }


            };

            // definitions of aliases
            DebugDuck.ss = DebugDuck.setstyle;
            DebugDuck.sp = DebugDuck.setprefix;
            DebugDuck.p = DebugDuck.printvar;
            DebugDuck.g = DebugDuck.group;
            DebugDuck.ge = DebugDuck.groupend;
            DebugDuck.ts = DebugDuck.timer;
            DebugDuck.te = DebugDuck.timerEnd;
            DebugDuck.t = DebugDuck.table;

            // asigned to global as 'dd':
            g.dd = DebugDuck;
        }

    } catch (e) {
        // e.message
    }
})(this);