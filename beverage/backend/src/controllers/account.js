const { getAccount, signAccount, getCookie } = require('../services/accountServices');



const handleLogin = async (req, res) => {

  if (!req.body.username || !req.body.password) {
    return res.status(200).json({
      EC: 1,
      EM: "missleading information",
      DT: ""
    })
  }
  else {
    const username = req.body.username;
    const password = req.body.password;

    const result = await getAccount(username, password);

    if (result.EC === 0) {
      res.cookie('jwt', result.DT.access_token, { httpOnly: true });
    }

    res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
};
const handleSignAccount = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(200).json({
      EC: 1,
      EM: "missleading information",
      DT: []
    })
  }
  else {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    const result = await signAccount(user);

    res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
};
const handleGetCookie = async (req, res) => {
  if (req.cookies && req.cookies.jwt) {
    const result = await getCookie(req.cookies.jwt);
    console.log(result);
    res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
  else res.status(200).json({
    EC: 4,
    EM: "don't have cookie jwt!",
    DT: {}
  })
}

module.exports = {
  handleLogin,
  handleSignAccount,
  handleGetCookie
}