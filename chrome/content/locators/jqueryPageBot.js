// vim:sw=4 ts=4 is et

PageBot.prototype.locateElementByJquery = function(locator, inDocument) {
    var jQuery = JQueryWrapper.prototype.jQuery;
    var doc;
    if (XPCNativeWrapper && "unwrap" in XPCNativeWrapper) {
        doc = XPCNativeWrapper.unwrap(inDocument);
    } else {
        doc = inDocument;
    }
    LOG.debug("locateElementByJquery(" + locator + ", " + doc + ")" );
    //var $ = doc.defaultView.$
    var elements = jQuery(locator, inDocument);
    LOG.debug("locateElementByJquery " + elements.length);
    if (elements.length > 0) {
        return elements[0];
    }
    return null;
}

