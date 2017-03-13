function openLinkInTab(URL, switchToTab, index) {
	browser.tabs.create({
		url: URL,
		active: switchToTab,
		index: index
	});
}


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

function handleMessage(request, sender, sendResponse) {
	if(request.gesture === "U" && request.targeturl !== undefined) {
		browser.tabs.query({currentWindow: true, active: true})
		.then(function(tabs) {
			openLinkInTab(request.targeturl, true, tabs[0].index + 1);
		});
	}

	if(request.gesture === "D" && request.targeturl !== undefined) {
		browser.tabs.query({currentWindow: true, active: true})
		.then(function(tabs) {
			openLinkInTab(request.targeturl, false, tabs[0].index + 1);
		});
	}

	if(request.gesture === "LR") {
		browser.tabs.create({
		active: true
	});
	}

	if(request.gesture === "DR") {
		browser.tabs.query({currentWindow: true, active: true})
		.then(function(tabs) {
			browser.tabs.remove(tabs[0].id);
		});
	}

	if(request.gesture === "UD") {
		browser.tabs.query({currentWindow: true, active: true})
		.then(function(tabs) {
			browser.tabs.reload(tabs[0].id, {
				bypassCache: true
			});
		});
	}	

	if(request.gesture === "L") {
		browser.tabs.query({currentWindow: true, active: true})
		.then(function(tabs) {
			browser.tabs.executeScript(tabs[0].id, {
			  code: "window.history.back()"
			});
		});
	}	

	if(request.gesture === "R") {
		browser.tabs.query({currentWindow: true, active: true})
		.then(function(tabs) {
			browser.tabs.executeScript(tabs[0].id, {
			  code: "window.history.forward()"
			});
		});
	}
	return true;
}

browser.runtime.onMessage.addListener(handleMessage);

onStartUp();

