"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "upiUpdateStatusSchema", {
    enumerable: true,
    get: function() {
        return upiUpdateStatusSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    orderId: _typebox.Type.String()
});
const upiUpdateStatusSchema = {
    body: options
};
