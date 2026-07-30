import supabase from "../../config/supabaseClient.js";

export const uploadFileToSupabase = async (
    bucket,
    objectName,
    buffer,
    mimeType
) => {
    const { error } = await supabase.storage
        .from(bucket)
        .upload(objectName, buffer, {
            contentType: mimeType,
            upsert: false,
        });

    if (error) throw error;

    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(objectName);

    return data.publicUrl;
};