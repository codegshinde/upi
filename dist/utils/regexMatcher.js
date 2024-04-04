"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "regexMatcher", {
    enumerable: true,
    get: function() {
        return regexMatcher;
    }
});
async function regexMatcher(string) {
    try {
        // Regular expression to match the amount in the format ₹1.35 or Rs.1.35
        const regex = /(?:₹|Rs\.)\d+\.\d+/;
        const match = string.match(regex);
        if (match) {
            console.log("Amount:", match[0]); // Output the matched amount
        } else {
            console.log("No match found.");
        }
        return;
    } catch (error) {
        throw error;
    }
}
