var xhttp = new XMLHttpRequest();
var variant;
var path;
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        showResult(xhttp.responseXML, "How many legs are on the table?");
    }
};
// furniture XML example is used since it has two different namespaces
xhttp.open("GET", "furniture_and_html4.xml", true);
xhttp.send();

function showResult(xml, variant) {
    //var variant = "";
    switch (variant) {
        case "What is the name of the table?":
            // the table uses the "f" namespace
            path = "string(//*[name()='f:name'])";      // the "name()" selector requires "f:name" with the prefix "f"
                                                        // "local-name() selector doesn't require the "f" prefix
            xmlnamespace = 'https://www.w3schools.com/furniture';
            break;
        case "How tall is the table?":
            // the table uses the "f" namespace
            path ="string(//*[local-name()='height'])"  ;
            xmlnamespace = 'https://www.w3schools.com/furniture';
            break;
        case "How many legs are on the table?":
            path ="string(//*[local-name()='height']/@amountoflegs)";
            xmlnamespace = 'https://www.w3schools.com/furniture';
            break;
        default:
            variant = "default";
    }
    function nsResolver(){
        return xmlnamespace;
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
    document.getElementById("demo_2").innerHTML = txt;
}
