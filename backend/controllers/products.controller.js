import { uploadOnCloudinary } from "../config/cloudinary.js";
import Product from "../model/Product.schema.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      message: "fetched all products",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getAllProducts error: ${error.message}`,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || !description || !price || !stock) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    let uploadedImage;
    if (req.file) {
      uploadedImage = await uploadOnCloudinary(req.file.path);
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: uploadedImage,
      stock,
    });

    return res.status(200).json({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `createProduct error: ${error.message}`,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
     const updatedFields = req.body;
    const { id } = req.params;

    if(Object.keys(updatedFields).length === 0){
        return res.status(400).json({ message: 'No fields to update' });
    }

    if(req.file){
        updatedFields.image=await uploadOnCloudinary(req.file.path)
    }

    

    const product = await Product.findByIdAndUpdate(
      id,updatedFields,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `updateProduct error: ${error.message}`,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id)

    return res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `deleteProduct error: ${error.message}`,
    });
  }
};
