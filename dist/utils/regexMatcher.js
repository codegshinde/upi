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
async function regexMatcher(text) {
    try {
        // Regular expression to match the amount in the format ₹1.35 or Rs.1.35
        const regex = /(?:₹|Rs\.)\d+\.\d+/;
        const match = text.match(regex);
        if (match) {
            // Extract the matched amount
            const amountWithCurrency = match[0];
            // Remove the currency symbol from the matched amount
            const amount = amountWithCurrency.replace(/(?:₹|Rs\.)/, "");
            // console.log("Amount:", amount);
            return amount;
        } else {
            console.log("No match found.");
            return null;
        }
    } catch (error) {
        throw error;
    }
}
