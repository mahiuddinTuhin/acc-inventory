const Stock = require("../model/stock");
const Brands = require("../model/Brands");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getStockService = async (filters, queries) => {
  const Stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);

  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, Stocks, page };
};

exports.getStockByIdService = async (id) => {
  console.log(ObjectId(id));

  const stock = await Stock.aggregate([
    { $match: { _id: ObjectId(id) } },
    { $project: { field1: 1, field2: 1 } },
  ]);

  return stock;
};

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);

  // const { _id: StockId, brand } = stock;

  // const res = await Brands.updateOne(
  //   { _id: brand.id },
  //   { $push: { stocks: StockId } }
  // );

  return stock;
};

exports.bulkCreateStockService = async (data) => {
  await Stock.insertMany(data);

  await data.every(async (Stock) => {
    const { _id: StockId, brand } = Stock;

    const res = await Brands.updateOne(
      { _id: brand.id },
      { $push: { Stocks: StockId } }
    );

    console.log(res);

    return Stock;
  });
};

exports.updateStockService = async ({ id, data }) => {
  const result = await Stock.updateOne(
    { _id: id },
    {
      $inc: { price: 100 },
    },
    {
      runValidators: true,
    }
  );
};

exports.bulkUpdateStockService = async ({ data }) => {
  const Stocks = [];

  data.ids.forEach((Stock) => {
    Stocks.push(Stock.updateOne({ _id: Stock.id }, Stock.data));
  });

  const result = await Promise.all(Stocks);
  console.log(result);
  return result;
};

exports.deleteStockByIdService = async (id) => {
  const result = await Stock.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteStockService = async (ids) => {
  const result = await Stock.deleteMany({});
  console.log(result);
  return result;
};
