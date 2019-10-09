// ==UserScript==
// @name       Devops Item - Copy updates message for Slack thread
// @namespace  http://tampermonkey.net/
// @version    0.3
// @description  Open preview For EOD
// @match      https://dev.azure.com/azurecom/*/_workitems/edit/*
// @copyright  Pablo Biasotti
// @author     pbiasotti
// @require http://code.jquery.com/jquery-latest.js
// @grant        GM_setClipboard
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var highPriorityLevels = ["high", "urgent", "hotfix", "next"];

    setTimeout(function() {
        $('.work-item-form-header-controls-container')
            .append('<button id="slackButton">Copy For Slack</button>');

        $('#slackButton').click(function () {
            // Get the priority level
            var itemPriorityLevel = $('label').filter( function (i) { return $(this).html().toLowerCase() === 'priority level'}).parent().next().find('input').val();

            // Build the slack message
            var priorityIcon = ':icrnormal:';

            if (highPriorityLevels.includes(itemPriorityLevel.toLowerCase()))
            {
                priorityIcon = ':icrhigh:'
            }

            GM_setClipboard(priorityIcon + " @here Updates on `" + document.title + "`\n" + window.location.replace(" - Boards", "") , 'text');
        });
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
