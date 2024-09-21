// ==UserScript==
// @name         Google Voice Message Scanner (with periodic scan)
// @namespace    https://nil.pp.ua/
// @version      1.1
// @description  Periodically scan messages from Google Voice and send via AJAX POST
// @author       Your Name
// @match        https://voice.google.com/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Ensure jQuery is available
    const $ = window.jQuery;

    // Function to scan messages on the Google Voice page
    function scanMessages() {
        const messageList = [];

        // Select the messages (this is an example, adjust the selectors based on Google Voice DOM structure)
        $("div.incoming").each(function() {
            const message = $(this).find("gv-annotation").text(); 
            const sender = $(this).find(".sender").text(); 
            const timestamp = $(this).find(".timestamp").text();

            // Push the data into messageList
            messageList.push({
                sender: sender.trim(),
                message: message.trim(),
                timestamp: timestamp.trim()
            });
        });

        // Log and send the messages
        console.log("Scanned messages:", messageList);
        sendMessagesToEndpoint(messageList);
    }

    // Function to send the messages via AJAX POST
    function sendMessagesToEndpoint(messages) {
	    console.log("REQUEST" + JSON.stringify({messages: messages}));
        $.ajax({
            url: 'http://127.0.0.1:8080/update',
            type: "POST",
            data: JSON.stringify({ messages: messages }),
            contentType: "application/json",
            success: function(response) {
                console.log("Messages sent successfully", response);
            },
            error: function(xhr, status, error) {
                console.error("Failed to send messages", error);
            }
        });
    }

    // Set an interval to scan messages every 5 seconds (5000 milliseconds)
    setInterval(function() {
        console.log("Scanning for new messages...");
        scanMessages();
    }, 5000); // 5000 ms = 5 seconds

})();
