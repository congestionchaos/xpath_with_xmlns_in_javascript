var xhttp = new XMLHttpRequest();
var variant;
var path;
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        showResult(xhttp.responseXML, "is there an author that starts with Row..?");
    }
};
xhttp.open("GET", "books.xml", true);
xhttp.send();

function showResult(xml, variant) {
    //var variant = "";
    switch (variant) {
        case "how many books are in the bookstore?":
            // tests the Number result type
            path = "count(//book)";
            break;
        default:
            variant = "default";
    }

    var txt = "You have asked for: " + variant  + "<br>" + "..and the result is: " + "<br>";

    if (xml.evaluate) {
        var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        nodesresult = console.log(nodes);
        console.log(nodes);
        resulttype = nodes.resultType;
        switch (resulttype) {
            case 1:
                // resultType 1: result is of number type;
                txt += nodes.numberValue;
                break;
            case 2:
                // resultType 2: result is of string type;
                txt += nodes.stringValue;
                break;
            case 3:
                // resultType 3: result is of boolean type;
                txt += nodes.booleanValue;
                break;
            case 4:
                // resultType 4: result is an (unordered) XPathResultIterator --> a Set of Nodes
                var result = nodes.iterateNext();
                while (result) {
                    txt += result.childNodes[0].nodeValue + "<br>";
                    result = nodes.iterateNext();
                }
                break;
            default:
            // default behavior
        }
    }

}
