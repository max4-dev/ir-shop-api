export default () => ({
  database: process.env.MONGODB_CONNECTION,
  jwt_secret: process.env.JWT_SECRET,
  bucket: {
    name: process.env.BUCKET_NAME,
    id: process.env.BUCKEET_ID,
    keyId: process.env.B2_KEY_ID,
    key: process.env.B2_KEY,
    s3: process.env.S3_URL
  }
});