const { addCart, getTotalCart, getCart, deleteCart } = require("../services/cartServices");

const handleAddCart = async (req, res) => {
  //console.log(req.body);
  const username = req.body.userData;
  const productID = req.body.productID;
  const result = await addCart(username, productID);
  if (result) {
    res.json({ success: true });
  }
  else res.json({ success: false });
}
const handleGetTotalCart = async (req, res) => {
  const username = req.body.username;
  const result = await getTotalCart(username);
  if (result.recordset.length > 0) {
    res.json({ total: result.recordset[0].totalQuantity });
  }
  else {
    res.json({ total: 0 });
  }
}
const handleGetCart = async (req, res) => {
  const result = await getCart(req.body.username);

  res.json(result.recordset);
}
const handleDeleteCart = async (req, res) => {
  const id = req.body.id;
  const username = req.body.username;

  const result = await deleteCart(id, username);

  if (result) {
    res.json({ success: true });
  }
  else res.json({ success: false });

}

module.exports = {
  handleAddCart,
  handleGetTotalCart,
  handleGetCart,
  handleDeleteCart,
}