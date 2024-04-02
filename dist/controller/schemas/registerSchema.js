"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerRouteSchema", {
    enumerable: true,
    get: function() {
        return registerRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    firstName: _typebox.Type.String(),
    lastName: _typebox.Type.String(),
    email: _typebox.Type.String({
        format: "email"
    }),
    mobile: _typebox.Type.String({
        pattern: "^[0-9]{10}$"
    }),
    password: _typebox.Type.RegExp(`^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$`),
    address: _typebox.Type.Object({
        district: _typebox.Type.String(),
        subDistrict: _typebox.Type.String(),
        village: _typebox.Type.Optional(_typebox.Type.String()),
        postalCode: _typebox.Type.String({
            pattern: "^[0-9]{6}$"
        })
    })
});
const registerRouteSchema = {
    body: options
};
