var expect = require("./utils/expect");
var fromSelector = require("../");
var Temple = require("templejs");

describe("fromSelector Tests", function() {

	it("fromSelector should take a basic css selector and return a new Temple Element binding.", function() {
		var b = fromSelector("span.a-class#myid");
		expect(b).to.be.instanceof(Temple.Element);
		expect(b.tagname).to.equal("span");
		expect(b.node.className).to.equal("a-class");
		expect(b.node.id).to.equal("myid");
	});

	it("fromSelector should accept multiple classes and keep their order.", function() {
		var b = fromSelector("span.class1.class2#myid.class3");
		expect(b).to.be.instanceof(Temple.Element);
		expect(b.tagname).to.equal("span");
		expect(b.node.className).to.equal("class1 class2 class3");
	});

	it("fromSelector should accept only one id", function() {
		expect(function() {
			fromSelector("span#id1.myclass#id2");
		}).to.throw(Error);
	});

	it("fromSelector should accept attribute tags, with and without quotes", function() {
		var b = fromSelector("span[attr1=foo][attr2='bar'][attr3=\"baz\"]");
		expect(b).to.be.instanceof(Temple.Element);
		expect(b.tagname).to.equal("span");
		expect(b.getAttribute("attr1")).to.equal("foo");
		expect(b.getAttribute("attr2")).to.equal("bar");
		expect(b.getAttribute("attr3")).to.equal("baz");
	});

});