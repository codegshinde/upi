"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "merchantRouteSchema", {
    enumerable: true,
    get: function() {
        return merchantRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    name: _typebox.Type.String(),
    displayName: _typebox.Type.String(),
    email: _typebox.Type.String(),
    mobile: _typebox.Type.String(),
    password: _typebox.Type.String(),
    city: _typebox.Type.String()
});
const merchantRouteSchema = {
    body: options
};
