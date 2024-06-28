export default () => ({
  database: process.env.MONGODB_CONNECTION,
  jwt_secret: process.env.JWT_SECRET,
  client_url: process.env.CLIENT_URL,
  admin_url: process.env.ADMIN_URL,
  bucket: {
    name: process.env.BUCKET_NAME,
    id: process.env.BUCKEET_ID,
    keyId: process.env.B2_KEY_ID,
    key: process.env.B2_KEY,
    s3: process.env.S3_URL,
  },
});
