const storeService = require("./../services/store.service");

exports.getStoreController = async (req, res) => {
  try {
    const result = await storeService.getStoreService();
    res.status(200).json({
      status: "Successfully get stores.",
      store: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed to get stores.",
      error: error.message,
    });
  }
};

exports.saveStoreController = async (req, res) => {
  try {
    const data = req.body;
    const result = await storeService.saveStoreService(data);

    console.log(result);

    res.status(200).json({
      status: "Successfully saved store.",
      store: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed to save store.",
      error: error.message,
    });
  }
};

exports.updateStoreController = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const result = await storeService.updateStoreByIdService({ id, data });

    console.log(result);

    res.status(200).json({
      status: "Successfully update store.",
      store: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed to update store.",
      error: error.message,
    });
  }
};

exports.deleteStoreController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await storeService.deleteStoreByIdService(id);

    console.log(result);

    res.status(200).json({
      status: "Successfully update store.",
      store: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed to update store.",
      error: error.message,
    });
  }
};
