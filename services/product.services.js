const Product = require("./../model/Product");
const Brands = require("./../model/Brands");

exports.getProductService = async (filters, queries) => {
  const Products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);

  const total = await Product.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, Products, page };
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);

  const { _id: productId, brand } = product;

  const res = await Brands.updateOne(
    { _id: brand.id },
    { $push: { products: productId } }
  );

  console.log(res);

  return product;
};

exports.bulkCreateProductService = async (data) => {
  await Product.insertMany(data);

  await data.every(async (product) => {
    const { _id: productId, brand } = product;

    const res = await Brands.updateOne(
      { _id: brand.id },
      { $push: { products: productId } }
    );

    console.log(res);

    return product;
  });
};

exports.updateProductService = async ({ id, data }) => {
  const result = await Product.updateOne(
    { _id: id },
    {
      $inc: { price: 100 },
    },
    {
      runValidators: true,
    }
  );
};

exports.bulkUpdateProductService = async ({ data }) => {
  const products = [];

  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);
  console.log(result);
  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({});
  console.log(result);
  return result;
};
