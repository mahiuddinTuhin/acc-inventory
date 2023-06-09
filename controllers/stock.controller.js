const {
  getStockService,
  createStockService,
  updateStockService,
  bulkUpdateStockService,
  deleteStockByIdService,
  bulkDeleteStockService,
  bulkCreateStockService,
  getStockByIdService,
} = require("../services/stock.services");

exports.getStocks = async (req, res) => {
  try {
    console.log("Stock called");
    // const Stocks = await Stock.where("name").equals(/\w/);
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

    const Stocks = await getStockService(filters, queries);

    res.status(200).json({
      status: "success",
      Stock: Stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.getStockById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getStockByIdService(id);
    res.status(200).json({
      status: "Stock get successfully.",
      stock: result,
    });
  } catch (error) {}
};

// getStockByIdService;

exports.createStock = async (req, res, next) => {
  try {
    const result = await createStockService(req.body);

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

exports.bulkCreateStock = async (req, res, next) => {
  try {
    const result = await bulkCreateStockService(req.body);

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

exports.updateStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await updateStockService({ id, data });

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

exports.bulkUpdateStock = async (req, res, next) => {
  console.log("inside controller");
  try {
    const data = req.body;

    const result = await bulkUpdateStockService({ data });

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

exports.deleteStockById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteStockByIdService(id);

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

exports.bulkDeleteStock = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const result = await bulkDeleteStockService(ids);

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

// exports.fileUpload = async (req, res) => {
//   try {
//     res.status(200).json(req.files);
//   } catch (error) {}
// };
