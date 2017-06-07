//Sets up the background page on startup
function onStartUp() {
	browser.storage.local.get()
	.then(function(items) {
		//Checks to see if these settings are in storage, if not create and set the default

	});
}


//Set the defaults 
function setDefaults() {
	browser.storage.local.clear()
	.then(function() {
		onStartUp();
	});

}

var indexIncrement = 1;

browser.tabs.onActivated.addListener(function(activeInfo) {
	indexIncrement = 1;
});


function handleMessage(request, sender, sendResponse) {
	browser.tabs.query({currentWindow: true, active: true})
	.then((tabs) => {
		if(request.gesture === "U" && request.targeturl !== undefined) {
			browser.tabs.create({
				url: request.targeturl,
				active: true,
				cookieStoreId: tabs[0].cookieStoreId,
				index: tabs[0].index + indexIncrement
			});
		}

		if(request.gesture === "D" && request.targeturl !== undefined) {
			browser.tabs.create({
				url: request.targeturl,
				active: false,
				cookieStoreId: tabs[0].cookieStoreId,
				index: tabs[0].index + indexIncrement
			});
			indexIncrement++;
		}

		if(request.gesture === "LR") {
			browser.tabs.create({
				active: true
			});
		}

		if(request.gesture === "DR") {
			browser.tabs.remove(tabs[0].id);
		}

		if(request.gesture === "UD") {
			browser.tabs.reload(tabs[0].id, {
				bypassCache: false
			});
		}

		if(request.gesture === "UDU") {
			browser.tabs.reload(tabs[0].id, {
				bypassCache: true
			});
		}	

		if(request.gesture === "UD") {
			browser.tabs.reload(tabs[0].id, {
				bypassCache: false
			});
		}	

		if(request.gesture === "L") {
			browser.tabs.executeScript(tabs[0].id, {
				code: "window.history.back()"
			});
		}	

		if(request.gesture === "R") {
			browser.tabs.executeScript(tabs[0].id, {
				code: "window.history.forward()"
			});
		}

		if(request.gesture === "UL") {
			browser.tabs.query({index: tabs[0].index - 1})
			.then(function(tabs) {
				return browser.tabs.update(tabs[0].id, {           
					active: true
				}
				);
			});
		}

		if(request.gesture === "UR") {
			browser.tabs.query({index: tabs[0].index + 1})
			.then(function(tabs) {
				return browser.tabs.update(tabs[0].id, {           
					active: true
				}
				);
			});
		}

		if(request.gesture === "LU") {
			browser.tabs.executeScript(tabs[0].id, {
				code: "window.scrollTo(0, 0);"
			});
		}

		if(request.gesture === "LD") {
			browser.tabs.executeScript(tabs[0].id, {
				code: "window.scrollTo(0, document.body.scrollHeight);"
			});
		}
	});
	return true;
}

browser.runtime.onMessage.addListener(handleMessage);

onStartUp();

