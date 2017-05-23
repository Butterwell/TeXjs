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

var parseable = {}
get_file( "tex.web", function( tex_web) {
	parseable.tex_web = tex_web
})

