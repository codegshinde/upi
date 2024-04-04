"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateUpiTransactionRouteSchema", {
    enumerable: true,
    get: function() {
        return updateUpiTransactionRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
// Define the options object schema with optional properties
const options = _typebox.Type.Object({
    packageName: _typebox.Type.String(),
    title: _typebox.Type.String(),
    text: _typebox.Type.String()
});
const updateUpiTransactionRouteSchema = {
    body: options
};
