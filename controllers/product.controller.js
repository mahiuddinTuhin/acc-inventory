const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
  bulkCreateProductService,
} = require("../services/product.services");

const Product = require("./../model/Product");

exports.getProducts = async (req, res) => {
  try {
    console.log("product called");
    // const products = await Product.where("name").equals(/\w/);
    let filters = { ...req.query };

    const excludeFIelds = ["sort", "page", "limit"];
    excludeFIelds.forEach((field) => delete filters[field]);

    let filtersString = JSON.stringify(filters);

    // gt, lt, gte, lte

    filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => {
      // return `$${match}`;
      return `$${match}`;
    });

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductService(filters, queries);

    res.status(200).json({
      status: "success",
      product: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.bulkCreateProduct = async (req, res, next) => {
  try {
    const result = await bulkCreateProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await updateProductService({ id, data });

    res.status(200).json({
      status: "success",
      message: "Data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data can not updated",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  console.log("inside controller");
  try {
    const data = req.body;

    const result = await bulkUpdateProductService({ data });

    res.status(200).json({
      status: "success",
      message: "Data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data can not updated",
      error: error.message,
    });
  }
};

// delete controller

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductByIdService(id);

    res.status(200).json({
      status: "success",
      message: "Data deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data can not deleted",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const result = await bulkDeleteProductService(ids);

    if (!result) {
      return res.status(400).json({
        status: "Not found",
        message: "Provided id  is not founds",
        data: result,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data can not updated",
      error: error.message,
    });
  }
};

// file upload controller

exports.fileUpload = async (req, res) => {
  try {
    res.status(200).json(req.files);
  } catch (error) {}
};
