import * as Minio from "minio";

const minioClient = new Minio.Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: process.env.ACCESSKEYMINIO || "admin",
    secretKey: process.env.SECRETKEYMINIO || "admin123456"
});

export default minioClient;