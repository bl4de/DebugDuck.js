describe("DebugDuck", function() {
    describe("dd:setprefix() function test suite", function() {
        it("setprefix: should be 'test' prefix for log messages", function() {
            dd.sp("log", "log");
            expect(dd.prefix.log).toEqual("log");
        });

        it("setprefix: should be 'warn' prefix warning log messages", function() {
            dd.sp("warn", "warn");
            expect(dd.prefix.warn).toEqual("warn");
        });

        it("setprefix: should be 'error' prefix for error messages", function() {
            dd.sp("error", "error");
            expect(dd.prefix.error).toEqual("error");
        });

    });
});