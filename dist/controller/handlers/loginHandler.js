"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "loginRouteOptions", {
    enumerable: true,
    get: function() {
        return loginRouteOptions;
    }
});
const _loginSchema = require("../schemas/loginSchema");
/**
 * Handles the login request.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} response - The Fastify response object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */ async function loginHandler(request, response) {
    const data = request.body;
    try {
        // Find the user by userId, lean() for a plain JavaScript object
        const user = await request.getDocument({
            mobile: data.mobile
        });
        if (!user) {
            throw new Error("Invalid userId. User not found.");
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await request.comparePassword(data.password, user.password);
        if (isPasswordValid) {
            // Sign a JWT token with user information (excluding password)
            const token = request.signJWT({
                id: user._id,
                mobile: user.mobile
            });
            // Omit the password from the response
            delete user.password;
            // Send the user details and token in the response
            response.send({
                user: user,
                token: token
            });
        } else {
            throw new Error("Authentication failed. Invalid password.");
        }
    } catch (error) {
        // Throw any caught errors
        throw error;
    }
}
const loginRouteOptions = {
    schema: _loginSchema.loginRouteSchema,
    handler: loginHandler
};
