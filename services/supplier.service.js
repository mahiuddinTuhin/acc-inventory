const Suppliers = require("../model/suppliers");

exports.createSupplierService = async (data) => {
  const result = await Suppliers.create(data);
  console.log({ result });
  return result;
};

exports.createBulkSupplierService = async (data) => {
  const result = await Suppliers.insertMany(data);
  console.log(result);
  return result;
};

exports.getSupplierService = async (data) => {
  const result = await Suppliers.find({}).select("");
  return result;
};

exports.getSupplierByIdService = async (id) => {
  const result = await Suppliers.findOne({ _id: id }).populate("products");

  return result;
};

exports.updateSupplierService = async ({ data, id }) => {
  const result = await Suppliers.updateOne({ _id: id }, data, {
    runValidators: true,
  });

  return result;
};
