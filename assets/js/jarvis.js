//A simple homebrew utility library
var JARVIS = (function() {
    function run() {
        Array.prototype.contains = function(input, ignore_case) {
            ignore_case = ignore_case || false;
            if(!ignore_case) {
                return this.indexOf(input) != -1;
            }//if
            else {
                var bool = false;
                for (var  i = 0; i < this.length; i++) {
                    try { 
                        bool = (this[i].toLowerCase() === input.toLowerCase()); 
                        if (bool) return true;
                    }//try
                    catch (err) { bool = false; }
                }//for
            }//else
        };
    }//run function
    
    
    var itself = {};
    itself.run = run;
    return itself;
})();

JARVIS.run();