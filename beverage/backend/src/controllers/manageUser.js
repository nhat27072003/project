const { getAllAccount, getPage } = require("../services/manageUserServices");

// const handleUser = async (req, res) => {
//   let data = await getAllAccount();
//   res.status(200).json({
//     EM: data.EM,
//     EC: data.EC,
//     DT: data.DT
//   })
// }

const handleGetPage = async (req, res) => {
  if (req.query.limit && req.query.page) {

    let limit = req.query.limit;
    let page = req.query.page;

    let total = await getAllAccount();
    let data = await getPage(page, limit);
    const dataset = {
      totalPage: Math.ceil(total / limit),
      totalRow: total,
      users: data.DT
    }
    if (page > dataset.totalPage)
      res.status(200).json({
        EM: "page out-of-bounds",
        EC: 2,
        DT: []
      })
    else {
      res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: dataset
      })
    }
  }
  else res.status(200).json({
    EM: "missleading params",
    EC: 2,
    DT: []
  })
}

module.exports = {
  // handleUser,
  handleGetPage
}