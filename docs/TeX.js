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

var encolor = {
    line: function( d ) { return "<span style='color: gray'>" + d + "</span>" },
	newline: function( d ) { return "<br>" }
}

function color_parse( d ) {
	return encolor[d[0][0]](d[0][1]) + encolor[d[1][0]](d[1][0])
}

var parseable = {}

get_file( "peg_parser.txt", function( line_grammar ) {
	window.peg_line_parser = peg.generate(line_grammar)
	var content = document.getElementById("content")
	var h4 = document.createElement("h4")
	h4.textContent = "Peg.js Grammar Definition"
	content.appendChild(h4)
	var pre = document.createElement("pre")
	pre.textContent = line_grammar
	content.appendChild(pre)
    get_file( "tex.web", function( tex_web ) {
	    parseable.tex_web = tex_web
		var parsed = peg_line_parser.parse(tex_web)
		var display_html = parsed.map(color_parse).join('')
		var display = document.createElement("div")		
		display.className = "display"
		display.innerHTML = display_html
		content.appendChild(display)
    })
})

var test_data = (function() {
	var many = []
	for (var i=0; i<20000; i++) { many.push(i) }
	return many.join("\n")
})()

// Find bracketed things -- feels like cheating
var known_bracket_pairs = [
    ["<",">"],
    ["(",")"],
	["{","}"],
	["[","]"],
	["{{","}}"]
	["'","'"],
	['"','"'],
	["/*","*/"],
	["//","\n"],
	["#","\n"]
]

function hist_of_three( text ) {
	var tri = {}
	for (var i = 0; i<text.length-2; i++) {
		tri[text.substr(i,3)] = (tri[text.substr(i,3)] || 0) + 1
	}
	var hist = []
	for (var t in tri) {
		hist.push([t, tri[t]])
	}
	hist.sort(function(a, b) {
        return b[1] - a[1]
    })
	return hist
}

console.log(hist_of_three( "aaaaaaaaabbbbbbbb"))

