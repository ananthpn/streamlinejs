<blockquote>
Simple things should be simple. Complex things should be possible.
<em>Alan Kay</em>
</blockquote>

## [Hello world!](tuto1._js)

Let us start with streamline's version of node's hello world:

```javascript
"use strict";
var streams = require('streamline/lib/streams/server/streams');

streams.createHttpServer(function(request, response, _) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end("Hello world!");

}).listen(_, 1337);
console.log('Server running at http://127.0.0.1:1337/');
```

Save this source as `tuto1._js` and start it with:

```javascript
_node tuto1
```

Now, point your browser to http://127.0.0.1:1337/. You should get a `"hello world"` message.

This is very close to the original version. Just a few differences:

* the server is created with streamline's `streams.createHttpServer` rather than with node's `http.createServer` call. 
* the server callback takes an additional `_` parameter. This parameter is streamline's _callback stub_. This is the magic token that you will pass to all asynchronous calls that expect a node.js callback.
* the `request` and `response` parameters are streamline wrappers around node's request and response streams. These wrappers don't make a difference for now but they will make it easier to read and write from these streams later.
* `listen` is called with an `_` argument. This is because `listen` is an asynchronous call. The streamline version prints the `'Server running ...'` message after receiving the `listening` event, while the original node version prints the message without waiting for the `listening` event. This is a really minor difference though, and streamline makes it easy to avoid the wait if you don't care: just call `listen` as a _future_ by passing `null` instead of `_`. If you're discovering streamline.js don't worry about all this now. I'll talk more about futures at the end of this tutorial.
* the source file extension is `._js` instead of `.js` and you run it with `_node` rather than `node`. This is because streamline.js extends the JavaScript language and the code needs to be transformed before being passed the JavaScript engine (note: `_node` has a `--cache` option which speeds up load time by shortcircuiting the transformation when files don't change).

## [Setting up a simple search form](tuto2._js)

Now, we are going to be a bit more ambitious and turn our page into a simple search form:

```javascript
"use strict";
var streams = require('streamline/lib/streams/server/streams');
var url = require('url');
var qs = require('querystring');

var begPage = '<html><head><title>My Search</title></head></body>' + //
'<form action="/">Search: ' + //
'<input name="q" value="{q}"/>' + //
'<input type="submit"/>' + //
'</form><hr/>';
var endPage = '<hr/>generated in {ms}ms</body></html>';

streams.createHttpServer(function(request, response, _) {
	var query = qs.parse(url.parse(request.url).query),
		t0 = new Date();
	response.writeHead(200, {
		'Content-Type': 'text/html'
	});
	response.write(_, begPage.replace('{q}', query.q || ''));
	response.write(_, search(_, query.q));
	response.end(endPage.replace('{ms}', new Date() - t0));
}).listen(_, 1337);
console.log('Server running at http://127.0.0.1:1337/');

function search(_, q) {
	return "NIY: " + q;
}
```

Nothing difficult here. We are using node's `url` and `querystring` helper modules to parse the URL and its query string component. We are now writing the response in 3 chunks. The first 2 are written with the asynchronous `write` method of the wrapped response stream.

We are going to implement the `search` function next. For now we are just returning a `NIY` message. Note that we pass `_` as first parameter to our `search` function. We need this parameter because `search` will be an asynchronous function.

## [Calling Google](tuto3._js)

Now we are going to implement the `search function by passing our search string to Google. Here is the code:

```javascript
function search(_, q) {
	if (!q || /^\s*$/.test(q)) return "Please enter a text to search";
	// pass it to Google
	var json = streams.httpRequest({
		url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + q,
		proxy: process.env.http_proxy
	}).end().response(_).checkStatus(200).readAll(_);
	// parse JSON response
	var parsed = JSON.parse(json);
	// Google may refuse our request. Return the message then.
	if (!parsed.responseData) return "GOOGLE ERROR: " + parsed.responseDetails;
	// format result in HTML
	return '<ul>' + parsed.responseData.results.map(function(entry) {
		return '<li><a href="' + entry.url + '">' + entry.titleNoFormatting + '</a></li>';
	}).join('') + '</ul>';
}
```

`streams.httpRequest` is a small wrapper around node's `http.request` call. It allows us to obtain the response with a simple `response(_)` asynchronous call, and to read from this response with a simple asynchronous `readAll` call (there is also an asynchronous `read` call which allows you to read one chunk at a time, or to read a given length). Notice how the calls can be naturally chained to obtain the response data.

In this example we do not need to post any data to the remote URL. But this would not be difficult either. Just a matter of calling asynchronous `write(_, data)` methods before calling the `end()` method.

## [Dealing with errors](tuto4._js)

If our search function fails, an exception will be propagated. If we don't do anything special, the exception will bubble up to the request dispatcher created by `streams.createHttpServer(...)`. This dispatcher will catch it and generate a 500 response with the error message.

This is probably a bit rude to our users. But we can do a better job by trapping the error and including the error message into our HTML page. all we need is a `try/catch` inside our `search` function:

```javascript
function search(_, q) {
	if (!q || /^\s*$/.test(q)) return "Please enter a text to search";
	// pass it to Google
	try {
		var json = streams.httpRequest({
			url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + q,
			proxy: process.env.http_proxy
		}).end().response(_).checkStatus(200).readAll(_);
		// parse JSON response
		var parsed = JSON.parse(json);
		// Google may refuse our request. Return the message then.
		if (!parsed.responseData) return "GOOGLE ERROR: " + parsed.responseDetails;
		// format result in HTML
		return '<ul>' + parsed.responseData.results.map(function(entry) {
			return '<li><a href="' + entry.url + '">' + entry.titleNoFormatting + '</a></li>';
		}).join('') + '</ul>';
	} catch (ex) {
		return 'an error occured. Retry or contact the site admin: ' + ex.message;
	}
}```

## [Searching through files](tuto5._js)

Now, we are going to extend our search to also search the text in local files. Our `search` function becomes:

```javascript
function search(_, q) {
	if (!q || /^\s*$/.test(q)) return "Please enter a text to search";
	try {
		return '<h2>Web</h2>' + googleSearch(_, q) + '<hr/><h2>Files</h2>' + fileSearch(_, q);
	} catch (ex) {
		return 'an error occured. Retry or contact the site admin: ' + ex.stack;
	}
}

function googleSearch(_, q) {
	var json = streams.httpRequest(...
	...
	return '<ul>' + ...
}

function fileSearch(_, q) {
	var t0 = new Date();
	var results = '';

	function doDir(_, dir) {
		fs.readdir(dir, _).forEach_(_, function(_, file) {
			var stat = fs.stat(dir + '/' + file, _);
			if (stat.isFile()) {
				fs.readFile(dir + '/' + file, 'utf8', _).split('\n').forEach(function(line, i) {
					if (line.indexOf(q) >= 0) results += '<br/>' + dir + '/' + file + ':' + i + ':' + line;
				});
			} else if (stat.isDirectory()) {
				doDir(_, dir + '/' + file);
			}
		});
	}
	doDir(_, __dirname);
	return results + '<br/>completed in ' + (new Date() - t0) + ' ms';;
}
```

The `forEach_` function is streamline's asynchronous variant of the standard EcmaScript 5 `forEach` array function. It is needed because the body of the loop contains asynchronous calls. And steamline will give you an error if you use the synchronous `forEach` with an asynchronous loop body. You will also find asynchronous variants of the other standard ES5 array functions: `map`, `some`, `every`, `filter`, `reduce` and `reduceRight`.

Otherwise, there is not much to say about `fileSearch`. It uses a simple recursive directory traversal logic. 

## [Searching in MongoDB](tuto6._js)

Now, we are going to extend our search to a mongodb database.

To run this you need to install MongoDB and start the mongod deamon. You also need to install the node MongoDB driver:

```sh
npm install mongodb
```

We have to modify our `search` function:

```javascript
function search(_, q) {
	if (!q || /^\s*$/.test(q)) return "Please enter a text to search";
	// pass it to Google
	try {
		return '<h2>Web</h2>' + googleSearch(_, q) //
		+ '<hr/><h2>Files</h2>' + fileSearch(_, q) //
		+ '<hr/><h2>Mongo</h2>' + mongoSearch(_, q);
	} catch (ex) {
		return 'an error occured. Retry or contact the site admin: ' + ex.stack;
	}
}
```

Here comes `mongoSearch`:

``` javascript
function mongoSearch(_, q) {
	var t0 = new Date();
	var db = new mongodb.Db('tutorial', new mongodb.Server("127.0.0.1", 27017, {}));
	db.open(_);
	try {
		var coln = db.collection('movies', _);
		if (coln.count(_) === 0) coln.insert(MOVIES, _);
		var re = new RegExp(".*" + q + ".*");
		return coln.find({
			$or: [{
				title: re
			}, {
				director: re
			}]
		}, _).toArray(_).map(function(movie) {
			return movie.title + ': ' + movie.director;
		}).join('<br/>') + '<br/>completed in ' + (new Date() - t0) + ' ms';;
	} finally {
		db.close();
	}
}
```

where `MOVIES` is our little movies database:

```javascript
var MOVIES = [{
	title: 'To be or not to be',
	director: 'Ernst Lubitsch'
}, {
	title: 'La Strada',
	director: 'Federico Fellini'
}, {
	...
}];
```

The `mongoSearch` function should be rather straightforwards. The `try/finally` is rather interesting: it guarantees that the database will be closed regardless of whether the `try` block completes successfully or throws an exception.

## [Parallelizing](tuto7._js)

So far so good. But the code that we have written executes completely sequentially. So we only start the directory search after having obtained a response from Google and we only start the Mongo search after having completed the directory search. This is very inefficient. We should run the 3 search operations in parallel.

This is where _futures_ come into play. The principle is simple: if you call an asynchronous function with `null` instead of `_`, the function returns a _future_ `f` that you can call later as `f(_)` to obtain the result.

So, to parallelize, we just need a small change to our `search` function:

```javascript
function search(_, q) {
	if (!q || /^\s*$/.test(q)) return "Please enter a text to search";
	// pass it to Google
	try {
		var googleFuture = googleSearch(null, q);
		var fileFuture = fileSearch(null, q);
		var mongoFuture = mongoSearch(null, q)
		return '<h2>Web</h2>' + googleFuture(_) //
		+ '<hr/><h2>Files</h2>' + fileFuture(_) //
		+ '<hr/><h2>Mongo</h2>' + mongoFuture(_);
	} catch (ex) {
		return 'an error occured. Retry or contact the site admin: ' + ex.stack;
	}
}
```

## Wrapping up

In this tutorial we have done the following:

* [Create a simple web server](tuto1._js)
* [Set up a little search form](tuto2._js)
* [Call a Google API to handle the search](tuto3._js) 
* [Handle errors](tuto4._js) 
* [Search a tree of files](tuto5._js) 
* [Search inside MongoDB](tuto6._js) 
* [Parallelize the 3 search operations](tuto7._js)

This should give you a flavor of what streamline.js programming looks like. Don't forget to read the [README](../README.md) and the [FAQ](../FAQ.md).


