// ==UserScript==
// @name       Devops Item - Copy updates message for Slack thread
// @namespace  http://tampermonkey.net/
// @version    0.3
// @description  Open preview For EOD
// @match      https://dev.azure.com/azurecom/*/_workitems/edit/*
// @copyright  Pablo Biasotti
// @require http://code.jquery.com/jquery-latest.js
// @grant        GM_setClipboard
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        // Get the priority level
        var itemPriorityLevel = $('#witc_20 input').val();

        // Build the slack message
        var priorityIcon = ':icrnormal:';

        if (itemPriorityLevel !== 'Low' && itemPriorityLevel !== 'Normal')
        {
            priorityIcon = ':icrhigh:'
        }

        $('.work-item-form-header-controls-container')
            .append('<button id="slackButton">Copy For Slack</button>');

        $('#slackButton').click(function () { GM_setClipboard(priorityIcon + " @here Updates on `" + document.title + "`\n" + window.location , 'text'); });
    }, 2000);
})();

GM_addStyle ( `
    #slackButton {
        background: rgb(0, 120, 212);
        color: rgb(255,255,255);
        cursor: pointer;
        border: none;
        font: 12px "Segoe UI";
        line-height: 26px;
`);
