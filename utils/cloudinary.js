const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloud = async (file) => {
  try {
    const data = await cloudinary.uploader.upload(
      file,
      { public_id: "olympic_flag" },
      function (error, result) {
        console.log(result);
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};

const cloudinaryRemove = async (image) => {
  try {
    const data = await cloudinary.uploader.distroy(image);
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = { uploadToCloud, cloudinaryRemove };
