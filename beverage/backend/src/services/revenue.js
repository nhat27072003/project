const { pool, sql } = require("../config/database");

//admin revenue
const adminGetRevenue = async (limit) => {
  try {
    let sqlstr = null;
    if (limit === 'month') {
      sqlstr = `SELECT 
                    YEAR(orderDate) AS Year,
                    MONTH(orderDate) AS Month,
                    SUM(sum) AS TotalRevenue
                FROM 
                    Orders
                GROUP BY 
                    YEAR(orderDate), 
                    MONTH(orderDate)
                ORDER BY 
                    Year, 
                    Month;`;
    }
    else if (limit === 'year') {
      sqlstr = `SELECT 
                  YEAR(orderDate) AS Year,             
                  SUM(sum) AS TotalRevenue
                FROM 
                  Orders
                GROUP BY 
                  YEAR(orderDate)
                ORDER BY 
                  Year`;
    }
    else {
      return {
        EC: 2,
        EM: "server error",
        DT: []
      }
    }

    await pool.connect();

    const result = await pool.request()
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
    }
  }
  catch (error) {
    console.log(error);
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}

const adminGetRevenueDate = async (limit, start, end) => {
  try {
    let sqlstr = null;
    if (limit === 'month') {
      sqlstr = `SELECT 
                    YEAR(orderDate) AS Year,
                    MONTH(orderDate) AS Month,
                    SUM(sum) AS TotalRevenue
                FROM 
                    Orders
                WHERE
                    orderDate BETWEEN @start AND @end
                GROUP BY 
                    YEAR(orderDate), 
                    MONTH(orderDate)
                ORDER BY 
                    Year, 
                    Month;`
    } else if (limit === 'year') {
      sqlstr = `SELECT 
                    YEAR(orderDate) AS Year,
                    SUM(sum) AS TotalRevenue
                FROM 
                    Orders
                WHERE
                    orderDate BETWEEN @start AND @end
                GROUP BY 
                    YEAR(orderDate)
                ORDER BY 
                    Year`
    }
    else {
      return {
        EC: 2,
        EM: "server error",
        DT: []
      }
    }

    await pool.connect();

    const result = await pool.request()
      .input('start', sql.Date, start)
      .input('end', sql.Date, end)
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
    }
  }


  catch (error) {
    console.log(error)
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}

const adminGetRevenueCategory = async () => {
  try {
    let sqlstr = null;
    sqlstr = `SELECT 
                  p.category,
                    
                    SUM(o.sum) AS TotalRevenue
                FROM 
                    Orders o
                JOIN OrderProduct op ON op.orderID=o.orderID
                JOIN Product p ON p.productID=op.productID

                GROUP BY
                  p.category`;


    await pool.connect();

    const result = await pool.request()
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
    }
  }
  catch (error) {
    console.log(error);
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}

const adminGetRevenueCategoryDate = async (start, end) => {
  try {
    let sqlstr = null;
    sqlstr = `SELECT 
                p.category,
                  
                  SUM(o.sum) AS TotalRevenue
              FROM 
                  Orders o
              JOIN OrderProduct op ON op.orderID=o.orderID
              JOIN Product p ON p.productID=op.productID
              WHERE o.orderDate BETWEEN @start AND @end

              GROUP BY
                p.category`;

    await pool.connect();

    const result = await pool.request()
      .input('start', sql.Date, start)
      .input('end', sql.Date, end)
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
    }
  }
  catch (error) {
    console.log(error);
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}

//store revenue
const storeGetRevenue = async (query) => {
  try {
    console.log(query);
    let sqlstr = null;
    if (query.limit === 'month') {
      sqlstr = `SELECT 
                    YEAR(orderDate) AS Year,
                    MONTH(orderDate) AS Month,
                    SUM(sum) AS TotalRevenue
                FROM 
                    Orders
                WHERE
                  storeId = @storeId
                GROUP BY 
                    YEAR(orderDate), 
                    MONTH(orderDate)
                ORDER BY 
                    Year, 
                    Month;`;
    }
    else if (query.limit === 'year') {
      sqlstr = `SELECT 
                  YEAR(orderDate) AS Year,             
                  SUM(sum) AS TotalRevenue
                FROM 
                  Orders
                WHERE
                  storeId = @storeId
                GROUP BY 
                  YEAR(orderDate)
                ORDER BY 
                  Year`;
    }
    else {
      return {
        EC: 2,
        EM: "server error",
        DT: []
      }
    }

    await pool.connect();

    const result = await pool.request()
      .input('storeId', sql.Int, query.storeId)
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
    }
  }
  catch (error) {
    console.log(error);
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}

const storeGetRevenueDate = async (query, start, end) => {
  try {
    let sqlstr = null;
    if (query.limit === 'month') {
      sqlstr = `SELECT 
                    YEAR(orderDate) AS Year,
                    MONTH(orderDate) AS Month,
                    SUM(sum) AS TotalRevenue
                FROM 
                    Orders
                WHERE
                    storeId = 3 AND (orderDate BETWEEN @start AND @end)
                GROUP BY 
                    YEAR(orderDate), 
                    MONTH(orderDate)
                ORDER BY 
                    Year, 
                    Month;`
    } else if (query.limit === 'year') {
      sqlstr = `SELECT 
                    YEAR(orderDate) AS Year,
                    SUM(sum) AS TotalRevenue
                FROM 
                    Orders
                WHERE
                    storeId = @storeId AND (orderDate BETWEEN @start AND @end)
                GROUP BY 
                    YEAR(orderDate)
                ORDER BY 
                    Year`
    }
    else {
      return {
        EC: 2,
        EM: "server error",
        DT: []
      }
    }

    await pool.connect();

    const result = await pool.request()
      .input('storeId', sql.Int, query.storeId)
      .input('start', sql.Date, start)
      .input('end', sql.Date, end)
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
    }
  }


  catch (error) {
    console.log(error)
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}

const storeGetRevenueCategory = async (storeId) => {
  try {
    let sqlstr = null;
    sqlstr = `SELECT 
                  p.category,
                    
                    SUM(o.sum) AS TotalRevenue
                FROM 
                    Orders o
                JOIN OrderProduct op ON op.orderID=o.orderID
                JOIN Product p ON p.productID=op.productID
                WHERE 
                  storeId = @storeId 
                GROUP BY
                  p.category`;


    await pool.connect();

    const result = await pool.request()
      .input('storeId', sql.Int, storeId)
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
    }
  }
  catch (error) {
    console.log(error);
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}

const storeGetRevenueCategoryDate = async (storeId, start, end) => {
  try {
    let sqlstr = null;
    sqlstr = `SELECT 
                p.category,
                  
                  SUM(o.sum) AS TotalRevenue
              FROM 
                  Orders o
              JOIN OrderProduct op ON op.orderID=o.orderID
              JOIN Product p ON p.productID=op.productID
              WHERE
                  o.storeId = @storeId AND (o.orderDate BETWEEN @start AND @end)
              GROUP BY
                p.category`;

    await pool.connect();

    const result = await pool.request()
      .input('storeId', sql.Int, storeId)
      .input('start', sql.Date, start)
      .input('end', sql.Date, end)
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
    }
  }
  catch (error) {
    console.log(error);
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}
module.exports = {
  adminGetRevenue,
  adminGetRevenueDate,
  adminGetRevenueCategory,
  adminGetRevenueCategoryDate,
  storeGetRevenue,
  storeGetRevenueDate,
  storeGetRevenueCategory,
  storeGetRevenueCategoryDate
}