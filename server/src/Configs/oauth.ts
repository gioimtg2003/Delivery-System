export const Oauth = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    GOOGLE_SUCCESS_REDIRECT_URL:
        process.env.NODE_ENV === "development"
            ? process.env.DEV_GOOGLE_SUCCESS_REDIRECT_URL
            : process.env.PROD_GOOGLE_SUCCESS_REDIRECT_URL,
};
