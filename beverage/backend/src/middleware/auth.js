const { getRole, getUrl } = require("../services/accountServices");
const { verifyToken } = require("./JWTAction")

const publicRouter = ['/acount', '/login', '/sign', '/product', '/popular', '/cookie', '/review'];
const productRegex = /^\/product\/\d+$/;


const authenicateUser = async (req, res, next) => {
  //check path
  if (publicRouter.includes(req.path) || productRegex.test(req.path)) {
    next();
  }
  else {
    //check cookie
    if (req.cookies && req.cookies.jwt) {
      const decoded = verifyToken(req.cookies.jwt);
      //cookie authenicated
      if (decoded != null) {
        const username = decoded.username;
        const url = await getUrl(username);
        console.log("comer here", url);
        const regexUrls = url.map(item => {
          const regexPattern = item.url.replace(/:[^\s/]+/g, '([0-9]+)');
          return new RegExp(`^${regexPattern}$`);
        });
        if (regexUrls.some(regex => regex.test(req.path))) {
          next();
        } else {
          console.log("come here");
          res.status(401).json({
            EC: 4,
            EM: "you don't have permission",
            DT: []
          })
        }
      }
      else {
        res.status(401).json({
          EC: 401,
          EM: "error authenicate!",
          DT: []
        })
      }
    }
  }
}

module.exports = {
  authenicateUser
}