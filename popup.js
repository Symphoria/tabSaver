window.onload = function() {
    let saveButton = document.getElementById("save");
    let loadButton = document.getElementById("load");

    saveButton.onclick = function() {
        chrome.tabs.query({},function(tabs){     
            let urls = [];

            tabs.forEach(function(tab){
                urls.push(tab.url);
            });

            chrome.storage.sync.set({"urls": urls}, function() {
                console.log("Urls saved");
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
        })
    }
}