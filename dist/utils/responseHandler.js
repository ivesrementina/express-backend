"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleSuccess = void 0;
const handleSuccess = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({ success: true, data });
};
exports.handleSuccess = handleSuccess;
const handleError = (res, error) => {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
};
exports.handleError = handleError;
