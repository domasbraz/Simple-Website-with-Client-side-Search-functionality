//redirects user to new page when called
function redirect(url)
{
    //stores default value when exiting browse.html (more info on lines 49-81)
    if (testHref() && checkSupported())
    {
        localStorage.setItem("chosen", "all");
    }

    //only allows users with supported browsers to access category.html
    if (url == "category.html")
    {
        if (checkSupported())
        {
            window.location.assign(url);
        }
        else
        {
            fail("unsupported");
        }
    }
    else
    {
        //https://www.w3schools.com/js/js_window_location.asp
        window.location.assign(url);
    }
}

//a bunch of error messages
function fail(failType)
{
    switch (failType)
    {
        case "unsupported":
            alert("Sorry, your browser does not support this feature!");
            break;

        case "placeholder":
            alert("Sorry, this page is currently unavailable, please try again later!");
            break;

        case "notFound":
            alert("Sorry, the code you have entered does not appear in our database, please ensure the code you have entered is correct!");
            break;
    }
}

//https://www.w3schools.com/html/html5_webstorage.asp#gsc.tab=0
//takes the category chosen in category.html and stores it on the browser so it can be used by other webpages, and then redirects user to browse.html
function categoryChosen(category)
{
    localStorage.setItem("chosen", category);

    redirect("browse.html");
}

//loads the information from local storage onto the "select" input in browse.html
function setCategory()
{
    let stored = localStorage.getItem("chosen");
    if (stored.length > 0)
    {
        document.getElementById("categoryList").value = stored;
    }
}

//checks if browser supports this code
function checkSupported()
{
    return(typeof(Storage) !== "undefined");
}

//checks if user is currently viewing browse.html
function testHref()
{
    //sets regular expression
    let pattern = /browse.html/;

    //tests to see if expression is found within current url
    return(pattern.test(window.location.href));
}

//https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
//this code calls a function once the Enter/Return key is pressed in the search bar
//(only valid for browse.html)
document.getElementById("searchBar").addEventListener("keydown", (event) =>
{
    if (event.key == "Enter")
    {
		searchBar();
	}
}
);

function searchBar()
{
    /*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp
    new RegExp()
    */

    //gets value inside test input field from webpage and converts it into a regural expression so we can display any divs that match the string value
    let searchValue = new RegExp(document.getElementById("searchBar").value);

    //counts the number of divs with "products" class
    let productAmount = document.getElementsByClassName("products").length;

    //used in case the user inputs an invalid value in the search bar
    let failCount = 0;

    //cycles through all the "products" divs
    for (let x = 0; x < productAmount; x++)
    {
        //select "products" div at index of x
        let currentDiv = document.getElementsByClassName("products")[x];

        //checks if the "id" attribute inside the selected div matches the value inside the search bar
        //also checks for category filters (more info on lines 144-158)
        if (searchValue.test(currentDiv.id) && matchesCFilter(x))
        {
            //if a match is found, the selected div will appear
            currentDiv.style.display = "block";
        }
        else
        {
            //if a match is not found within the div, it is hidden
            currentDiv.style.display = "none";
            failCount++;
        }

        //if the function fails to find any div codes matching the search value and category filter, an error will occur
        if (failCount > 9)
        {
            fail("notFound");

            //resets all div visibility according to category filter
            document.getElementById("searchBar").value = "";
            searchBar();
        }
    }

}

//using the index of the select "products" div, checks if category value matches the "select" input field
function matchesCFilter(productIndex)
{
    //gets value of "select" input and converts into lower case for easier comparisons
    let filterInfo = document.getElementById("categoryList").value.toLocaleLowerCase();

    //takes the info inside the "info3" tag which holds category information, from the selected div 
    let productInfo = document.getElementsByClassName("products")[productIndex].querySelector("info3").textContent.toLocaleLowerCase();
        
    //first removes "category:" text, then removes any spaces so that values can be compared easily
    productInfo = productInfo.replaceAll(/category:/g, "").replaceAll(/[^a-z]/g, "");

    //tells us if the selected category matches the current div or is set to "all" in which case should display all divs
    return (filterInfo == productInfo || filterInfo == "all");
}
