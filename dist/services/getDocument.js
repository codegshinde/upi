"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDocument", {
    enumerable: true,
    get: function() {
        return getDocument;
    }
});
const _User = require("../models/User");
async function getDocument(condition, options) {
    try {
        const document = await _User.User.findOne(condition, options).lean().exec();
        return document;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Mongoose error: ${error.message}`);
        // Handle specific Mongoose errors here
        } else {
            console.error(`Unexpected error: ${error}`);
        }
        throw error;
    }
}
