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
	browser.tabs.query({currentWindow: true, active: true})
	.then((tabs) => {
		if(request.gesture === "U" && request.targeturl !== undefined) {
			browser.tabs.create({
				url: request.targeturl,
				active: true,
				cookieStoreId: tabs[0].cookieStoreId,
				openerTabId: tabs[0].id
			});
		}

		if(request.gesture === "D" && request.targeturl !== undefined) {
			browser.tabs.create({
				url: request.targeturl,
				active: false,
				cookieStoreId: tabs[0].cookieStoreId,
				openerTabId: tabs[0].id
			});
		}

		if(request.gesture === "LR") {
			browser.tabs.create({
				active: true
			});
		}

		// Switch to the tab before then delete the current tab
		if(request.gesture === "DR") {
			browser.tabs.remove(tabs[0].id)
			.then(() => browser.tabs.query({currentWindow: true, index: tabs[0].index - 1}))
			.then((tabs) => browser.tabs.update(tabs[0].id, {active: true}));
		}

		if(request.gesture === "DL") {
			browser.sessions.getRecentlyClosed({maxResults: 1})
			.then(sessions => sessions[0])
			.then(session => {
				const sessionId = session.tab.sessionId || session.window.sessionId;
				browser.sessions.restore(
					sessionId
				);
			});
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
