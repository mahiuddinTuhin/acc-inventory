const Store = require("./../model/Store");

exports.getStoreService = async () => {
  const result = Store.find({});
  return result;
};

exports.saveStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};

exports.updateStoreByIdService = async ({ id, data }) => {
  const result = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};

exports.deleteStoreByIdService = async (id) => {
  const result = await Store.deleteOne({ _id: id });
  return result;
};
