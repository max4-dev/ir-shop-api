export default () => ({
  database: process.env.MONGODB_CONNECTION,
  jwt_secret: process.env.JWT_SECRET,
});