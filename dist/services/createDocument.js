"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDocument", {
    enumerable: true,
    get: function() {
        return createDocument;
    }
});
const _User = require("../models/User");
async function createDocument(data, options) {
    try {
        const document = new _User.User(data);
        await document.save(options);
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
