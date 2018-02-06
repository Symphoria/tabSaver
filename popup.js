window.onload = function() {
    let saveButton = document.getElementById("save");
    let loadButton = document.getElementById("load");
    let message = document.getElementById("message");

    saveButton.onclick = function() {
        saveButton.innerHTML = "Saving...";

        chrome.tabs.query({},function(tabs){     
            let urls = [];

            tabs.forEach(function(tab){
                urls.push(tab.url);
            });

            chrome.storage.sync.set({"urls": urls}, function() {
                saveButton.innerHTML = "Save";
                message.innerHTML = "Saved";
            })
        });
    }

    loadButton.onclick = function() {
        chrome.storage.sync.get("urls", function(data) {
            for (let i = 0; i < data.urls.length; i++) {
                chrome.tabs.create({
                    url: data.urls[i]
                })
            }

            message.innerHTML = "Loaded";
        })
    }
}