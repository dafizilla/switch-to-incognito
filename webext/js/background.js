// see https://bugzilla.mozilla.org/show_bug.cgi?id=1618439#c6
async function openIncognitoTab(tab) {
    const isAllowed = await browser.extension.isAllowedIncognitoAccess();
    if (isAllowed) {
        await openPrivateTab(tab);
    } else {
        await alertUser(tab);
    }
}

async function openPrivateTab(tab) {
    await browser.windows.create({
        url: tab.url,
        incognito: true
    });
}

async function alertUser(tab) {
    const response = await browser.tabs.sendMessage(
        tab.id,
        {method: 'noIncognitoGrant'});

    if (response.openHelp) {
        await browser.tabs.create({
            active: true,
            url: 'https://support.mozilla.org/en-US/kb/extensions-private-browsing#w_extensions-in-private-windows'
        });
    }
}

function initializePageAction(tab) {
    browser.pageAction.show(tab.id).then();
}

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    initializePageAction(tab);
});

browser.pageAction.onClicked.addListener(openIncognitoTab);
