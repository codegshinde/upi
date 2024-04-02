"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "upiRouteSchema", {
    enumerable: true,
    get: function() {
        return upiRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    packageName: _typebox.Type.String(),
    title: _typebox.Type.String(),
    text: _typebox.Type.String()
});
const upiRouteSchema = {
    body: options
};
