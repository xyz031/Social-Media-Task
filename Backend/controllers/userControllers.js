const userDB = require("../model/userModel");
const cloudinary = require("../lib/cloudinary");

// img upload
exports.ImageUpload = async (req, res) => {
  const files = req.files.length > 0 && req.files;
  const { username, socialhandle } = req.body;

  if (!username || !files) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const preuser = await userDB.findOne({ username: username });
    if (preuser) {
      return res.status(400).json({ error: "This user already exists" });
    }

    // Upload files to Cloudinary
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "user_profiles", // Optional: Cloudinary folder name
        });
        return result.secure_url; // Store the secure URL
      })
    );

    // Save user data
    const userData = new userDB({
      username,
      socialhandle,
      userprofile: uploadedFiles,
    });

    await userData.save();
    res.status(200).json({ message: "Image successfully uploaded", userData });
  } catch (error) {
    console.error("Catch block:", error);
    res.status(500).json({ error: "An error occurred during upload" });
  }
};

// getUserdata
exports.getUserdata = async (req, res) => {
  try {
    const getUsers = await userDB.find();
    res.status(200).json(getUsers);
  } catch (error) {
    console.error("Catch block:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};
