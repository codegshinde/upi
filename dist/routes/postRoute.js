"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _fastifyplugin = /*#__PURE__*/ _interop_require_default(require("fastify-plugin"));
const _createUpiTransactionHandler = require("../controller/handlers/createUpiTransactionHandler");
const _loginHandler = require("../controller/handlers/loginHandler");
const _merchantHandler = require("../controller/handlers/merchantHandler");
const _registerHandler = require("../controller/handlers/registerHandler");
const _updateUpiTransaction = require("../controller/handlers/updateUpiTransaction");
const _upiHandler = require("../controller/handlers/upiHandler");
const _upiTransactionStatusHandler = require("../controller/handlers/upiTransactionStatusHandler");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function postRoute(fastify) {
    fastify.post("/register", _registerHandler.registerRouteOptions);
    fastify.post("/login", _loginHandler.loginRouteOptions);
    fastify.post("/upi", _upiHandler.upiRouteOptions);
    fastify.post("/upi/create", _createUpiTransactionHandler.createUpiTransactionRouteOptions);
    fastify.post("/upi/update", _updateUpiTransaction.updateUpiTransactionRouteOptions);
    fastify.post("/merchant/register", _merchantHandler.createMerchantRouteOptions);
    fastify.post("/upi/transaction/status", _upiTransactionStatusHandler.upiTransactionStatusRouteOptions);
}
const _default = (0, _fastifyplugin.default)(postRoute);
