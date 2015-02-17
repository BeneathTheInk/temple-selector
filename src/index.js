var Temple = require("./temple");
var SelectorParser = require("./selector");

// converts a simple css selector to an element binding
var fromSelector = module.exports = function(sel) {
	if (typeof sel !== "object") {
		sel = fromSelector.parse(sel);
	}

	var el = new Temple.Element(sel.tagname);
	if (sel.id != null) el.prop("id", sel.id);
	el.addClass(sel.classes);
	el.attr(sel.attributes);
	el.append(Temple.util.toArray(arguments).slice(1));

	return el;
}

var parse = fromSelector.parse = function(sel) {
	return SelectorParser.parse(sel);
}

