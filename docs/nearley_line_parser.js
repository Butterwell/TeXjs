var nearley_line_parser = {
	init: function( callback ) {
		var me = this
		get_file( "line.ne", function( web_ne ) {
			me.source = web_ne
			me.compile( web_ne )
			me.generate()
			callback()
		})
	},
	compile: function() {
	    var nearley_parser = new nearley.Parser(grammar)
	    nearley_parser.feed( this.source )
	    var opts = {}
	    this.compiled = Compile(nearley_parser.results[0], opts);
	},
	generate: function( ) {
		var script = generate( this.compiled, "nearley_line_parser.grammar" )
		eval( script )
	},
    parse: function( text ) {
	    var parser = new nearley.Parser( this.grammar )
	    parser.feed( text )
	    return parser.results
	},
    lint: function() { // Just names for now
        var all = []
		var messages = []
        this.grammar.rules.forEach(function(rule) {
            all.push(rule.name)
        });
        this.rules.forEach(function(rule) {
            rule.symbols.forEach(function(symbol) {
                if (!symbol.literal && !symbol.token && symbol.constructor !== RegExp) {
                    if (all.indexOf(symbol) === -1) {
                        messages.push("Undefined symbol `" + symbol + "` used.")
                    }
                }
            });
        });
		return messages
	},
	test_data: (function() {
        var many = []
        for (var i=0; i<20000; i++) { many.push(i+"\n") }
		return many.join("")
	})(),
	test: function() {
		return this.parse( this.test_data )
	}
}

nearley_line_parser.init( function() {
	var content = document.getElementById("content")
	var pre = document.createElement("pre")
	pre.textContent = nearley_line_parser.source
	content.appendChild(pre)
})
