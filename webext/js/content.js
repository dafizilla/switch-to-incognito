function handleMessage(request, sender, sendResponse) {
    if (request.method === 'noIncognitoGrant') {
        alert('You must allow to run in Private Windows otherwise this addon is useless');
        return Promise.resolve({openHelp: true});
    }
}

browser.runtime.onMessage.addListener(handleMessage)
