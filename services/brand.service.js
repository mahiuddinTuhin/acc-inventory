const Brands = require("./../model/Brands");

exports.createBrandService = async (data) => {
  const result = await Brands.create(data);
  console.log(result);
  return result;
};

exports.createBulkBrandService = async (data) => {
  console.log("{ result }");
  const result = await Brands.insertMany(data);
  console.log(result);
  return result;
};

exports.getBrandService = async (data) => {
  const result = await Brands.find({}).select("");
  return result;
};

exports.getBrandByIdService = async (id) => {
  const result = await Brands.findOne({ _id: id }).populate("products");

  return result;
};

exports.updateBrandService = async ({ data, id }) => {
  const result = await Brands.updateOne({ _id: id }, data, {
    runValidators: true,
  });

  return result;
};
