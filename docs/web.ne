main -> int    {% function(d) {return d[0]; } %}
int -> [0-9]:+ {% function(d) {return d[0].join(''); } %}