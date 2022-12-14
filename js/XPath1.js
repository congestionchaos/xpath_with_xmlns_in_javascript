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

function showResult(xml, variant){
    //var variant = "";
    switch (variant){
        case "how many books are in the bookstore?":
            // tests the Number result type
            path = "count(//book)";
            break;
        case "what is the category of the first book?":
            // test the String result type
            path = "string(//book[1]/@category)";
            break;
        case "are there any books?":
            // test the Boolean result type
            path = "boolean(//book)";
            break;
        case "is there an author that starts with Row..?":
            path = "boolean(//author[contains(text(),'Row')])";
            // the contains syntax is:
            // contains( 'string1', 'string2') the  '-sign cannot be exchanged with "
            // if string1 contains string2 it returns true, otherwise it returns false
            break;
        case "select title":
            path = "/bookstore/book/title";
            break;
        case "select title of first book":
            path = "/bookstore/book[1]/title";
            break;
        case "select all the prices":
            path = "/bookstore/book/price[text()]";
            break;
        case "select price nodes with price>35":
            path = "/bookstore/book[price>35]/price";
            break;
        case "select title nodes with price<35":
            path = "/bookstore/book[price<35]/title";
            break;
        default:
            path = "/bookstore/book/title";
            variant = "default";

    }

    var txt = "You have asked for: " + variant  + "<br>" + "..and the result is: " + "<br>";
    //path = "/bookstore/book/price[text()]"
    if (xml.evaluate){
        var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        nodesresult = console.log(nodes);
        console.log(nodes);
        resulttype = nodes.resultType;
        switch(resulttype){
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
    document.getElementById("demo").innerHTML = txt;
}