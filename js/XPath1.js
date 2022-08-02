var xhttp = new XMLHttpRequest();
var variant;
var path;
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        showResult(xhttp.responseXML, "select price nodes with price>35");
    }
};
xhttp.open("GET", "books.xml", true);
xhttp.send();

function showResult(xml, variant){
    //var variant = "";
    switch (variant){
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
            path = "/bookstore/book[price<35]/price";
            break;
        case "select title nodes with price>35":
            path = "/bookstore/book[price<35]/title";
            break;
        default:
            path = "/bookstore/book[1]/title";

    }

    var txt = "";
    //path = "/bookstore/book/price[text()]"
    if (xml.evaluate){
        var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();
        while (result) {
            txt += result.childNodes[0].nodeValue + "<br>";
            result = nodes.iterateNext();
        }
    }
    document.getElementById("demo").innerHTML = txt;
}