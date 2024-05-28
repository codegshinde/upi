"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createMerchantRouteOptions", {
    enumerable: true,
    get: function() {
        return createMerchantRouteOptions;
    }
});
const _Merchant = require("../../models/Merchant");
const _createMerchantSchema = require("../schemas/createMerchantSchema");
// Define the handler function for creating a merchant
async function createMerchantHandler(request, response) {
    try {
        const body = request.body;
        // Check if the mobile number already exists
        const existingMerchantMobile = await _Merchant.Merchant.findOne({
            mobile: body.mobile
        });
        if (existingMerchantMobile) {
            return response.status(400).send({
                status: "error",
                message: "Mobile Number Already Exists"
            });
        }
        // Check if the email address already exists
        const existingMerchantEmail = await _Merchant.Merchant.findOne({
            email: body.email
        });
        if (existingMerchantEmail) {
            return response.status(400).send({
                status: "error",
                message: "Email Address Already Exists"
            });
        }
        // Hash the password before saving
        const hashedPassword = await request.hashPassword(body.password);
        body.password = hashedPassword;
        // Create a new merchant instance and save it to the database
        const newMerchant = new _Merchant.Merchant(body);
        await newMerchant.save();
        // Send a success response with the created merchant
        response.send({
            status: "success",
            merchant: newMerchant
        });
    } catch (error) {
        // Log the error and send a generic error response
        request.log.error(error);
        response.status(500).send({
            status: "error",
            message: "Internal Server Error"
        });
    }
}
const createMerchantRouteOptions = {
    schema: _createMerchantSchema.merchantRouteSchema,
    handler: createMerchantHandler
};
