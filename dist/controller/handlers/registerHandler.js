"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerRouteOptions", {
    enumerable: true,
    get: function() {
        return registerRouteOptions;
    }
});
const _registerSchema = require("../schemas/registerSchema");
/**
 * Handles the registration request.
 * @param { FastifyRequest } request - The Fastify request object.
 * @param { FastifyReply } response - The Fastify response object.
 * @returns { Promise<void> } A promise that resolves once the handler is complete.
 */ async function registerHandler(request, response) {
    const data = request.body;
    try {
        const mobile = await request.getDocument({
            mobile: data.mobile
        });
        if (mobile) {
            throw new Error("Mobile number already exists");
        }
        const email = await request.getDocument({
            email: data.email
        });
        if (email) {
            throw new Error("Email address already exists");
        }
        data.password = await request.hashPassword(data.password);
        data.userId = await request.createUniqId(data.firstName, data.lastName);
        const user = await request.createDocument(data);
        delete user.password;
        response.send({
            user: user,
            message: "new user registered successfully."
        });
    } catch (error) {
        throw error;
    }
}
const registerRouteOptions = {
    schema: _registerSchema.registerRouteSchema,
    handler: registerHandler
};
