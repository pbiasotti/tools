// ==UserScript==
// @name         Export Azure Devops Pipelines task times
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  In the builds page it adds a button to download the tasks time in CSV format
// @author       You
// @match        https://dev.azure.com/azurecom/ACOM/_build/results*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var array = [];

    console.log('running script')

    $('div.task-log-step-content.step-log-content.flex').each(function() {
        var valueAsString = $(this).find('.bolt-time-item > span').first().text().replace('<1s', '1s');
        var minutes = (/([0-9]*)m/g).exec(valueAsString);
        var seconds = (/([0-9]*)s/g).exec(valueAsString);
        var timeInSeconds = 0;

        if (minutes && minutes.length > 0)
        {
            timeInSeconds += parseInt(minutes[1]) * 60
        }

        if (seconds && seconds.length > 0)
        {
            timeInSeconds += parseInt(seconds[1])
        }

        array.push({
            title: $(this).find('.left-section-step-title').first().text(),
            value: timeInSeconds
        });
    });

    const rows = [["Task", "Time"]];
    var csvContent = '';

    array.forEach(function(rowArray){
        let row = rowArray.title + ',' + rowArray.value;
        csvContent += row + "\r\n";
    });


    var a = $('<a download="data.csv" type="text/csv">Download Csv</a>');
    a.attr("href", URL.createObjectURL(new Blob([csvContent])));
    $(a).insertAfter('.phase-name');
})();


