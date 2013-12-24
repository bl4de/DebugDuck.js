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
                // prefix 
                prefix: '',

                // styles for output
                style: '',

                // default background color
                defBgColor: '#a0a0a0',

                // default text color
                defColor: '#fafafa',

                // 'DebugDuck says' style
                ddStyle: 'background-color: #f00; color: #fff;',

                // prefix setter
                // alias: dd.sp(prefix)
                setprefix: function(prefix) {
                    this.prefix = prefix;
                    return this;
                },

                // output style definition
                // alias: dd.ss(style)
                setstyle: function(style) {
                    this.style = style || 'background-color: ' + this.defBgColor + '; color: '  + this.defColor;
                    return this;
                },

                // display variable value - wrapper for console.log()
                // alias: dd.p(value)
                printvar: function(value) {
                    this.__formatAndPrint(value);
                    return this;
                },

                // format output for console.log() using settings
                __formatAndPrint: function(value) {
                    var __output = '';
                    if (this.prefix) {
                        __output = this.prefix + __output;
                    }

                    __output += ' ' + value;
                    console.log("%c DebugDuck says:%c " + __output + " ", this.ddStyle, this.style );
                }


            };

            // definitions of aliases
            DebugDuck.ss = DebugDuck.setstyle;
            DebugDuck.sp = DebugDuck.setprefix;
            DebugDuck.p = DebugDuck.printvar;

            // asigned to global as 'dd':
            g.dd = DebugDuck;
        }

    } catch (e) {
        // e.message
    }
})(this);