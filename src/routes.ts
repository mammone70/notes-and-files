/**
 * An array of routes that are accessible to the public. 
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
];

/**
 * An array of routes that are required for authentication. 
 * These routes do not require authentication.
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register"
];

/**
 * The prefix for API authenitcation routes
 * Use for API Auth
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default path to redirect user to upon login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";