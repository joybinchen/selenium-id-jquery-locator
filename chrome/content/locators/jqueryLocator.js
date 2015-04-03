// vim:sw=4 ts=4 is et

LocatorBuilders.add('jquery', function(e) {
    try {
    var jQuery = JQueryWrapper.prototype.jQuery;
    this.log.info("LocatorBuilder $=" + jQuery);
    this.log.info(jQuery);
    var tagName = e.tagName.toLowerCase();
    var locator = tagName;

    var innerText = e.textContent.trim();
    if (innerText != "") {
        locator += ":contains('" + innerText + "')";
        var elements = jQuery(locator, e.ownerDocument);
        if (elements.length == 1) {
            try {
                return "jquery=" + locator;
            } finally {
                this.log.info("LocatorBuilder for jquery find locator jquery=" + locator);
            }
        }
    }

    var attributes = ['name', 'title', 'alt'];
    for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];
        var value = e.getAttribute(attr);
        if (value == null) continue;

        if (value == '') {
            locator += "[" + attr + "]";
        } else {
            locator += "[" + attr + "='" + value + "']";
        }

        if (jQuery(locator, e.ownerDocument).length == 1) {
            return "jquery=" + locator;
        }
    }
    return null;
    } catch(ex) {alert(ex);}
});


var order = LocatorBuilders.order;
var pos = order.indexOf('jquery');
if (pos === order.length - 1) {
    order = order.slice(0, pos);
    pos = -1;
}
console.log("indexOf jquery is " + pos);
console.log("order.length is " + order.length);
console.log("order is " + order);
if (pos < 0) {
    pos = 0;
    for (var locateMethod in {id:0,link:0,name:0}) {
        var i = order.indexOf(locateMethod);
        if (pos < i) {
            console.log("change pos for " + locateMethod + " from " + pos + " to " + i);
            pos = i;
        }
    }
    console.log("order above " + order.slice(0, pos + 1));
    console.log("order after " + order.slice(pos + 1, order.length));
    LocatorBuilders.order = Array.concat(order.slice(0, pos + 1), ['jquery'], order.slice(pos+1, order.length));
    console.log("new order " + LocatorBuilders.order);
    var options = SeleniumIDE.Preferences.load();
    SeleniumIDE.Preferences.setAndSave(options, 'locatorBuildersOrder', LocatorBuilders.order.join(','));
}
//SeleniumIDE.Preferences.setString("internalLogThreshold", "INFO");

