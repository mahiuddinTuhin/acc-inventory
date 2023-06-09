const {
  createSupplierService,
  createBulkSupplierService,
  getSupplierService,
  getSupplierByIdService,
  updateSupplierService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res) => {
  try {
    const result = await createSupplierService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully created the Supplier.",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

exports.createBulkSupplier = async (req, res) => {
  try {
    const result = await createBulkSupplierService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully created the Suppliers.",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Couldn't create the Suppliers now.",
    });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const result = await getSupplierService(req.body);
    res.status(200).json({
      status: "Success",
      Supplier: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Couldn't get the Suppliers.",
    });
  }
};

exports.getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getSupplierByIdService(id);

    if (!result) {
      return res.status(400).json({
        status: failed,
        error: "Couldn't find Supplier with this id.",
      });
    }
    res.status(200).json({
      status: "Success",
      Supplier: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Couldn't get the Suppliers.",
    });
  }
};

exports.updateSupplier = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await updateSupplierService({ id, data });

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: failed,
        error: "Couldn't update the Supplier.",
      });
    }
    res.status(200).json({
      status: "Successfully updated the Supplier.",
      Supplier: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Couldn't update the Suppliers.",
    });
  }
};
