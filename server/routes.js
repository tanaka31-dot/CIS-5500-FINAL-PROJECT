const mysql = require('mysql')
const config = require('./config.json')

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
  });
  connection.connect((err) => err && console.log(err));

  /******************
 *ROUTES BELOW*
 ******************/

 // Route 1: GET /user/:user-id
const user= async function(req, res) {
  //Given a user_id, returns all information about the user
  const id = req.params.user_id;

  connection.query(`
  SELECT *
  FROM User
  WHERE user_id = "${id}"`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      
      res.json(
        {
          user_id: data[0].user_id,
          name: data[0].name,
          review_count: data[0].review_count,
          yelping_since: data[0].yelping_since,
          useful: data[0].useful,
          funny:data[0].funny,
          cool:data[0].cool,
          fans:data[0].fans,
          elite: data[0].elite,
          average_stars: data[0].average_stars,
          friends:data[0].friends,

        });
    }
  });
}

 // Route 1: GET /business/:business-id
 const business= async function(req, res) {
  //Given a user_id, returns all information about the user
  const id = req.params.user_id;

  connection.query(`
  SELECT *
  FROM Business
  WHERE business_id = "${id}"`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      console.log(data[0])
      res.json(
        {
          name: data[0].name,
          address: data[0].address,
          city: data[0].city,
          state: data[0].city,
          postal_code: data[0].postal_code,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          stars: data[0].stars,
          review_count: data[0].review_count,
          is_open: data[0].is_open,
          business_id: data[0].business_id,
          categories: data[0].categories,
        });
    }
  });
}

//GET /businesses
const businesses = async function(req, res) {
  connection.query(`
  SELECT *
  FROM Business
  LIMIT 27`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      console.log("query executed")
      console.log(data.length)
      res.json(data);
    }
  });
}

module.exports = {
  user,
  business,
  businesses,
}