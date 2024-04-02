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
const _postRoute = /*#__PURE__*/ _interop_require_default(require("./postRoute"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function registerRoutes(fastify) {
    await fastify.register(_postRoute.default);
}
const _default = (0, _fastifyplugin.default)(registerRoutes);
