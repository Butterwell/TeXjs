@{%

// line lexer: next delivers one line at a time
let lexer = {
    buffer: [],
	line: 0,
    reset: function(chunk, Info) {
		this.buffer = chunk.split("\n")
		this.line = Info || 0
	},
	next: function() {
		this.line++
		if (this.line-1 < this.buffer.length) {
		    return {
			  type: "line",
		      value: this.buffer[this.line-1]
		    }
		} else {
		   // End of input
		   return null
		}
    },
    save: function() {
	   return this.line
	},
    formatError: function(token) {
		return "Err: "+token
	},
    has: function(token_type) {
		//console.log("Parser asked for token type:",token_type)
		return token_type
	}
}
%}

@lexer lexer

main -> aline:* {% function(d) { return d[0] } %} 

aline -> %line {% function(d) { return d[0].value } %}