import * as Minio from "minio";
import dotenv from "dotenv"

dotenv.config();

const minioClient = new Minio.Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: process.env.ACCESSKEYMINIO,
    secretKey: process.env.SECRETKEYMINIO
});

export default minioClient;