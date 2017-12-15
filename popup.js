function attachOpentabOnEnterEvent(element) {
    element.onkeydown = function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            openQueryTab();
            return false;
        }
    };
}

function openQueryTab() {
    var searchText = getSlelectedSearchString();
    {
        storeQueryText(searchText);
        chrome.tabs.create({url: "http://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=" + searchText});
    }
}

function getSearchString() {
    return document.getElementById('inputField');
}

function getSlelectedSearchString() {
       return (getSearchString().value);
}


function storeQueryText(TextValue) {
             chrome.storage.local.set({'lastEnteredText': TextValue});
}

function loadQueryText() {
    chrome.storage.local.get('lastEnteredText', function(storedNumber) {
        {
            if(storedNumber.lastEnteredText !== undefined){
                getSearchString().value = storedNumber.lastEnteredText;
            }
        }
    });

}

loadQueryText();
attachOpentabOnEnterEvent(getSearchString());
