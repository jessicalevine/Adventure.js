var AMANTIA = (function() {
    var DATA = {
        player : (function() {
            return {
                level : 0,
                loc : {
                    "x" : 0,
                    "y" : 0,
                    "invalid_moves" : ["Does not exist."],
                    validate : function (x, y) {
                        x = (typeof(x) === undefined) ? this.x : x;
                        y = (typeof(y) === undefined) ? this.y : y;
                        var loc = map[x + "," + y];
                        if (!loc) { return false; }
                        if (!loc.passable) { return false; }
                        return true;
                    },
                    validation : function (x, y) {
                        x = (typeof(x) === undefined) ? this.x : x;
                        y = (typeof(y) === undefined) ? this.y : y;
                        var loc = map[x + "," + y];
                        if (!loc) { return "Does not exist."; }
                        if (!loc.passable) { return loc.impass; }
                        return true;
                    },      
                    valid : function (x, y) {
                        return this.validate(x, y) ? true : (this.validation(x, y));
                    },
                    valid_move : function (dist, axis) {
                        if (axis === "y") 
                            return this.validate(this.x, this.y + dist);
                        else if (axis === "x") 
                            return this.validate(this.x + dist, this.y);
                        else
                            return false;
                    },                         
                    validate_move : function (dist, axis) {
                        if (axis === "y") 
                            return this.validation(this.x, this.y + dist);
                        else if (axis === "x") 
                            return this.validation(this.x + dist, this.y);
                        else
                            return false;
                    }
                },
                go : function(direction, dist) {
                    dist = dist || 1;
                    var success = "You travel " + direction + ".";
                    switch (direction) {
                        case "north":                    
                            if (!this.loc.valid_move(1, "y")) { return this.loc.validate_move(1, "y");}
                            this.loc.y += dist;        
                            break;
                        case "east":
                            if (!this.loc.valid_move(1, "x")) { return this.loc.validate_move(1, "x"); }
                            this.loc.x += dist;
                            break;
                        case "south":
                            if (!this.loc.valid_move(-1, "y")) { return this.loc.validate_move(-1, "y"); }
                            this.loc.y -= dist;
                            break;
                        case "west":
                            if (!this.loc.valid_move(-1, "x")) { return this.loc.validate_move(-1, "x"); }
                            this.loc.x -= dist;
                            break;
                        default:
                            success = "I am sorry, I do not know how to do that.";
                    }//switch
                    return success;
                }
            };
        })(),
        map : (function() {
            //TODO Prototype a map block to default to passable
            var map = {
                "0,0" : {
                    desc : "You find yourself in an open field. A passage leads north.",
                    passable : true
                },
                "0,1" : {
                    desc : "You see a small clearing with a large tree. Thick forest surrounds you, except for a path running south and turning east.",
                    passable : true
                },
                "0,2" : {
                    impass : "The forest is too thick! You cannot go this way.",
                    passable : false
                },
                "1,1" : {
                    desc : "You are in a sparse forest, with a path running west.",
                    passable : true
                }
            };
            for(var i = 0; i < 10; i++) {
                map[-1 + "," + i] = {
                    impass : "The forest is too thick! You cannot go this way.",
                    passable : false
                };
                map[i + "," + -1] = {
                    impass : "The forest is too thick! You cannot go this way.",
                    passable : false
                };
                
            }
            return map;
        })()
    };//store persistent immutable game data
    
    //set app level variables
    var count = 0;
    var player = DATA.player;
    var map = DATA.map;
    
    function run() {
        $(document).ready(function() {
            $("#in").keyup(textbox_handler); 
            $("#in").focus();
        });
    }//run function
    
    function submit(ev) {
        ev.target.parentNode.appendChild(document.createElement("br"));
        ev.target.parentNode.appendChild(document.createElement("br"));
        
        //Handle current command
        var response = "I am sorry, I do not know how to do that.";
        
        var input = ev.target.value;
        var cmd = input.split(" ")[0].toLowerCase();
        var argument = input.split(" ")[1].toLowerCase();
        
        if (["go", "travel", "walk", "move"].contains(cmd)) {
            if(["north", "south", "east", "west"].contains(argument)) {
                response = player.go(argument);
            }//if
        }//if

        var response_node = document.createTextNode(response + " ");
        ev.target.parentNode.appendChild(response_node);
        
        //Increment DOM elements and compose id
        var id = count + "in";
        count++;   
        
        //Describe the current location
        var location = map[player.loc.x + "," + player.loc.y];
        var desc_node = document.createTextNode(location.desc);
        ev.target.parentNode.appendChild(desc_node);
       
        //Append the next input box
        var nodes = input_nodes(id);
        for (var i = 0; i < nodes.length; i++) {
            ev.target.parentNode.appendChild(nodes[i]);
        }//for  
        $("#" + id).keyup(textbox_handler); 
        $("#" + id).focus();
    }//submit function
    
    function input_nodes(id) {
        var break_node = document.createElement("br");
        var prein_node = document.createTextNode(">");
        var in_node = document.createElement("input");  
        in_node.setAttribute("class", "textin");
        in_node.setAttribute("id", id);
        return [break_node, prein_node, in_node];  
    }//input_nodes function
    
    function textbox_handler(ev) {
        if(ev.keyCode == 13){
                submit(ev);
        }
    }//textbox_handler function
    
    
    
    var itself = {};
    itself.run = run;
    return itself;
}());

AMANTIA.run();