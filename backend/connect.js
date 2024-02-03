var sql = require('mssql');

var config = {
    user: 'project',         // Thay thông tin đăng nhập của tài khoản vừa tạo
    password: '123', // Password
    server: 'localhost',    // Ở đây mình đặt DB trên localhost
    database: 'beverage',    // Chổ này thay bằng DB name của bạn
    trustServerCertificate: true,
    options: {
        enableArithAbort: true,
        encrypt: true
    }
};

var con = sql.connect(config, function(err){
    if(err) 
        console.log(err);
});

module.exports = {
    con: con,
    sql: sql
}
