require("chai").should();

var headcrab = require("../"),
	cheerio = require("cheerio");

describe("constructor", function(){

	it("should work as a simple, single use scraper if an url, options hash and callback are passed", function(done){
		headcrab("http://example.com", {
			selector: "h1",
			limit: 1,
			transform: function(el){
				return el.text()
			}
		}, function(err, headers){
			headers[0].should.equal("Example Domain");
			done();
		});
	});

	it("should work if options hash is omitted", function(done){
		headcrab("http://example.com", function(err, $){
			$.length.should.be.gt(0);
			done();
		});
	});

	it("should delegate to headcrab.Transformer if only an options hash is passed", function(){
		var t = headcrab({ selector: "span" });
		(t instanceof headcrab.Transformer).should.equal(true);
		t.options.selector.should.equal("span");
	});

	it("should require no options, and return a default transformer if nothing is passed", function(){
		var t = headcrab();
		(t instanceof headcrab.Transformer).should.equal(true);
	});

	it("should be able to be initiated directly - new headcrab.Transformer(options)", function(){
		var t = new headcrab.Transformer();
		t.parse.should.be.a("function");
	});

});