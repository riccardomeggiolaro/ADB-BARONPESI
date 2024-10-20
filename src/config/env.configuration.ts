export default (): Record<string, object> => ({
  server: {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
  },
  database: {
    uri: process.env.MONGODB_URI,
  },
  auth: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION_TIME,
  },
});
