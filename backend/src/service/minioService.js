import minioClient from "../../config/minio.js";

export const uploadFileToMinio = async (bucketName, objectName, buffer, mimeType = "application/octet-stream") => {
    
    const exists = await minioClient.bucketExists(bucketName)
    if (!exists) {
        await minioClient.makeBucket(bucketName, "us-east-1")
    }

    // upload file
    await minioClient.putObject( bucketName, objectName, buffer, buffer.length,
        {
            "Content-Type": mimeType
        }
    )

    // stat right bucket
    const stat = await minioClient.statObject(bucketName, objectName)

    console.log("STAT:", stat)
    return stat
}