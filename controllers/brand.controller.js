const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandService,
  createBulkBrandService,
} = require("../services/brand.service");

exports.createBrand = async (req, res) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully created the brand.",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Couldn't create the brand.",
    });
  }
};

exports.createBulkBrand = async (req, res) => {
  try {
    const result = await createBulkBrandService(req.body);
 
    res.status(200).json({
      status: "Success",
      message: "Successfully created the brands.",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Couldn't create the brands.",
    });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const result = await getBrandService(req.body);
    res.status(200).json({
      status: "Success",
      brand: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Couldn't get the brands.",
    });
  }
};

exports.getBrandById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getBrandByIdService(id);

    if (!result) {
      return res.status(400).json({
        status: failed,
        error: "Couldn't find brand with this id.",
      });
    }
    res.status(200).json({
      status: "Success",
      brand: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Couldn't get the brands.",
    });
  }
};

exports.updateBrand = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await updateBrandService({ id, data });
    console.log(result);

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: failed,
        error: "Couldn't update the brand.",
      });
    }
    res.status(200).json({
      status: "Successfully updated the brand.",
      brand: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Couldn't update the brands.",
    });
  }
};
