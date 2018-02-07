window.onload = function() {
    let saveButton = document.getElementById("save");
    let loadButton = document.getElementById("load");
    let message = document.getElementById("message");
    let isLoggedIn = false;

    chrome.identity.getAuthToken({interactive: false}, function (token) {
        if (!token) {
            if (chrome.runtime.lastError.message.match(/not signed in/)) {
                isLoggedIn = false;
            } else {
                isLoggedIn = true;
            }
        }
    });

    saveButton.onclick = function() {
        saveButton.innerHTML = "Saving...";

        chrome.tabs.query({},function(tabs){     
            let urls = [];

            tabs.forEach(function(tab){
                urls.push(tab.url);
            });

            if (isLoggedIn) {
                chrome.storage.sync.set({"urls": urls}, function() {
                    saveButton.innerHTML = "Save";
                    message.innerHTML = "Saved";
                })
            } else {
                alert("Please sign in to Chrome");
            }
        });
    }

    loadButton.onclick = function() {
        if (isLoggedIn) {
            chrome.storage.sync.get("urls", function(data) {
                for (let i = 0; i < data.urls.length; i++) {
                    chrome.tabs.create({
                        url: data.urls[i]
                    })
                }
    
                message.innerHTML = "Loaded";
            })
        } else {
            alert("Please sign in to Chrome");
        }
    }
}