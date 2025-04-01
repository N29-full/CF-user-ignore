// ==UserScript==
// @name         Codeforces Ignore Users
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hide comments from specific users on Codeforces
// @author       N29
// @match        https://codeforces.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Add usernames to this list to ignore them
    const ignoredUsers = ["sunsetinParis"];

    function hideIgnoredComments() {
        document.querySelectorAll('.comment-table').forEach(comment => {
            let userElement = comment.querySelector('.rated-user');
            if (userElement) {
                let username = userElement.textContent.trim();
                if (ignoredUsers.includes(username)) {
                    comment.style.display = 'none';
                }
            }
        });
    }

    // Run once on page load
    hideIgnoredComments();

    // Observe for dynamically loaded comments
    const observer = new MutationObserver(hideIgnoredComments);
    observer.observe(document.body, { childList: true, subtree: true });
})();
