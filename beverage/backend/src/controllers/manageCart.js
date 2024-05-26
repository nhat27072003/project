const { addCart, getTotalCart, getCart, deleteCart } = require("../services/cartServices");

const handleAddCart = async (req, res) => {
  const username = req.body.userData;
  const productID = req.body.productID;
  const result = await addCart(username, productID);

  return res.status(200).json({
    EM: result.EM,
    EC: result.EC,
    DT: result.DT
  })
}
const handleGetTotalCart = async (req, res) => {
  if (req.query && req.query.username) {
    const username = req.query.username;
    const result = await getTotalCart(username);

    res.json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
  else res.json({
    EM: "missleading params",
    EC: 2,
    DT: []
  })
}
const handleGetCart = async (req, res) => {
  if (req.query && req.query.username) {
    const result = await getCart(req.query.username);
    res.json({
      EM: result.EM,
      EC: result.EC,
      DT: result.DT
    });
  }
  else res.json({
    EM: "missleading params",
    EC: 2,
    DT: []
  })
}
const handleDeleteCart = async (req, res) => {
  const id = req.query.id;
  const username = req.query.username;
  console.log("id:", id, " username: ", username);
  const result = await deleteCart(id, username);

  res.status(200).json({
    EC: result.EC,
    EM: result.EM,
    DT: result.DT
  })
}

module.exports = {
  handleAddCart,
  handleGetTotalCart,
  handleGetCart,
  handleDeleteCart,
}