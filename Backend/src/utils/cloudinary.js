export const uploadOnCloudinary = async (localFilePath) => {
    // This is a placeholder for actual cloudinary upload logic
    // Just to show the structure
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        // const response = await cloudinary.uploader.upload(localFilePath, {
        //     resource_type: "auto"
        // })
        // console.log("file is uploaded on cloudinary ", response.url);
        // fs.unlinkSync(localFilePath)
        // return response;
        return { url: "https://placeholder-url.com/avatar.png" }
    } catch (error) {
        // fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}
