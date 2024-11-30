/**
 * Handles and logs errors
 * @param {Error} error - The error object
 */
const errorHandler = (error) => {
    console.error('Error: ', error.message);
    // Additional logging logic can be added here
    // e.g., send error details to a logging service
};

/**
 * Sends a standardized response for successful operations
 * @param {Response} res - The Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {Object} data - Response data
 */
const successResponse = (res, statusCode, data) => {
    res.status(statusCode).json({
        status: 'success',
        data
    });
};

/**
 * Sends a standardized response for failed operations
 * @param {Response} res - The Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Error message
 */
const errorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'error',
        message
    });
};

module.exports = {
    errorHandler,
    successResponse,
    errorResponse
};
