const {
  getCategoryServive,
  saveCategoryServive,
  deleteCategoryByIdService,
  updateCategoryByIdService,
} = require("../services/category.service");

exports.getCategory = async (req, res) => {
  try {
    const result = await getCategoryServive();

    res.status(200).json({
      status: "Successfully get category.",
      category: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed to get category.",
      error: error.message,
    });
  }
};

exports.saveCategory = async (req, res) => {
  try {
    const result = await saveCategoryServive(req.body);
    res.status(200).json({
      status: "Successfully save category.",
      category: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed to save category.",
      error: error.message,
    });
  }
};

exports.deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteCategoryByIdService(id);

    if (!deleteCount) {
      return res.status(400).json({
        status: "failed to delete category.",
        error: error.message,
      });
    }
    console.log(result);
    res.status(200).json({
      status: "Successfully deleted category.",
      category: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed to delete category.",
      error: error.message,
    });
  }
};

exports.updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await updateCategoryByIdService({ id, data });

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "failed to update category.",
        error: error.message,
      });
    }
    console.log(result);
    res.status(200).json({
      status: "Successfully updated category.",
      category: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed to update category.",
      error: error.message,
    });
  }
};
