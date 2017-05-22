var files = ["tex.web"]

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

get_file( files[0], function(tex_web) {
	var content = document.getElementById("content")
	var pre = document.createElement("pre")
	pre.textContent = tex_web
	content.appendChild(pre)
	console.log(tex_web.length)
})

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


// grammar - bootstrapped from nearley-language-bootstrapped.js

// option.file - input file
// option.out - output file

// option.export - variable to set parser to. Default: grammar

// Parse nearley language
var nearley_parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

var chunk = "main -> int {% function(d) {return d[0]; } %}\n" +
	"int -> [0-9]:+        {% function(d) {return d[0].join(''); } %}\n"
	
nearley_parser.feed(chunk)
console.log(nearley_parser.results)

var opts = {}
// Compile 
var c = Compile(nearley_parser.results[0], opts);
var src = generate(c, "e")

// generate
// lint
//        lint(c, {'out': process.stderr});
//        output.write(generate(c, opts.export));
