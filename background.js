
//Sets up the background page on startup
function onStartUp() {
	browser.storage.local.get()
	.then(function(items) {
		//Checks to see if these settings are in storage, if not create and set the default

	}).catch(onError);
}


//Set the defaults 
function setDefaults() {
	browser.storage.local.clear()
	.then(function() {
		onStartUp();
	});

}

//The set of urls
var urlsToRemove;


onStartUp();

