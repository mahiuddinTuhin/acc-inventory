const Category = require("./../model/Category");

exports.getCategoryServive = async () => {
  const result = await Category.find({});

  return result;
};

exports.saveCategoryServive = async (data) => {
  const result = await Category.create(data);

  return result;
};

exports.deleteCategoryByIdService = async (id) => {
  const result = await Category.deleteOne({ _id: id });
  return result;
};

exports.updateCategoryByIdService = async ({ id, data }) => {
  const result = await Category.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
