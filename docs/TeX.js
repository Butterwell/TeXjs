var get_file_chunk = function (url, range, callback) {
  var xhr = new XMLHttpRequest;

  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) {
      return;
    }
	callback(xhr.response)
  }

  xhr.open('GET', url, true);
  xhr.setRequestHeader('Range', 'bytes='+range[0]+'-'+range[1]);
  xhr.send(null);
}

var get_file = function (url, callback) {
  var xhr = new XMLHttpRequest

  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) {
      return;
    }
    callback(xhr.response)
  }

  xhr.open('GET', url, true);
  xhr.send(null);
}

var parseable = []
get_file( "tex.web", function( tex_web) {
	parseable.push({
		file: "tex.web",
		content: tex_web
	}
})


get_file( "web.ne", function( web_ne ) {
	var content = document.getElementById("content")
	var pre = document.createElement("pre")
	pre.textContent = web_ne
	content.appendChild(pre)
	
	compile_parser(web_ne)
	//on_change(pre, compile_parser)
})

var parser;
function compile_parser( source ) {
	var nearley_parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)
	nearley_parser.feed( source )
	console.log(nearley_parser.results)
	var opts = {}
	// Compile 
	var c = Compile(nearley_parser.results[0], opts);
	var src = generate(c, "e") // "parser" instead of "e"?
	console.log( src )
	parser = src 
}

// grammar - bootstrapped from nearley-language-bootstrapped.js

// option.file - input file
// option.out - output file

// option.export - variable to set parser to. Default: grammar

// Parse nearley language
//var nearley_parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

//var chunk = "main -> int {% function(d) {return d[0]; } %}\n" +
//	"int -> [0-9]:+        {% function(d) {return d[0].join(''); } %}\n"
	
//nearley_parser.feed(chunk)
//console.log(nearley_parser.results)

//var opts = {}
// Compile 
//var c = Compile(nearley_parser.results[0], opts);
//var src = generate(c, "e")

// generate
// lint
//        lint(c, {'out': process.stderr});
//        output.write(generate(c, opts.export));

function lintNames(grm, opts) {
    var all = [];
    grm.rules.forEach(function(rule) {
        all.push(rule.name);
    });
    grm.rules.forEach(function(rule) {
        rule.symbols.forEach(function(symbol) {
            if (!symbol.literal && !symbol.token && symbol.constructor !== RegExp) {
                if (all.indexOf(symbol) === -1) {
                    warn(opts,"Undefined symbol `" + symbol + "` used.");
                }
            }
        });
    });
}

function warn(opts, err) {
	console.log(err)
}
