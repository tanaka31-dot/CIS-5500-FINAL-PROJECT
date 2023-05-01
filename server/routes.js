const mysql = require('mysql')
const config = require('./config.json')

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
})
connection.connect((err) => err && console.log(err))

/******************
 *ROUTES BELOW*
 ******************/

/*
 Route 1: GET /user/:user-id
 Given a user_id, returns all information about the user
 */
const user = async function (req, res) {

  const id = req.params.user_id

  connection.query(
    `
  SELECT *
  FROM User
  WHERE user_id = "${id}"`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        res.json({
          user_id: data[0].user_id,
          name: data[0].name,
          review_count: data[0].review_count,
          yelping_since: data[0].yelping_since,
          useful: data[0].useful,
          funny: data[0].funny,
          cool: data[0].cool,
          fans: data[0].fans,
          elite: data[0].elite,
          average_stars: data[0].average_stars,
          friends: data[0].friends,
        })
      }
    },
  )
}

/*
 Route 1: GET /business/:business_id
 Given a business id return all information of that business
 */
const business = async function (req, res) {
  const id = req.params.business_id
  connection.query(
    `
  SELECT *
  FROM Business
  WHERE business_id = "${id}"`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        res.json({
          name: data[0].name,
          address: data[0].address,
          city: data[0].city,
          state: data[0].state,
          postal_code: data[0].postal_code,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          stars: data[0].stars,
          review_count: data[0].review_count,
          is_open: data[0].is_open,
          business_id: data[0].business_id,
          categories: data[0].categories,
        })
      }
    },
  )
}

/*
GET /businesses
get all businesses on a specific page
*/
const businesses = async function (req, res) {
  const page = req.query.page
  const pageSize = req.query.page_size
  const offset = (page - 1) * pageSize
  connection.query(
    `
  SELECT *
  FROM Business
  LIMIT ${pageSize}
  OFFSET ${offset};`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json([])
      } else {
        console.log(data.length)
        res.json(data)
      }
    },
  )
}

/*
GET /users
Get all users on a specific page
*/
const users = async function (req, res) {
  const page = req.query.page
  const pageSize = req.query.page_size
  const offset = (page - 1) * pageSize

  connection.query(`
    SELECT *
    FROM User
    ORDER BY review_count DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `,(err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json([])
      } else {
        res.json(data)
      }
    },
  )
}

/*
GET businesses/:business_id/reviews
Given a business id return the review and the name of the user who made the review
*/
const businessReviews = async function (req, res) {
  const id = req.params.business_id

  connection.query(
    `SELECT u.name, r.*
    FROM Review r JOIN User u ON r.user_id = u.user_id 
    WHERE r.business_id = ${id}`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        res.json(data)
      }
    },
  )
}


/*
GET businesses/:business_id/tips
Given a business id return the tip and the name of the user who made the tip
*/
const businessTips = async function (req, res) {
  const id = req.params.business_id

  connection.query(
    `SELECT u.name, t.*
    FROM Tip t JOIN User u ON t.user_id = u.user_id
    WHERE t.business_id = ${id}`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        res.json(data)
      }
    },
  )
}



/*
GET businesses/:business_id/hours
Given a business id return the business hours.
*/
const businessHours = async function (req, res) {
  const id = req.params.business_id
  connection.query(
    `SELECT h.*
    FROM Business_Hours h
    WHERE h.business_id = ${id}`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        res.json({
          monday: data[0].monday,
          tuesday: data[0].tuesday,
          wednesday: data[0].wednesday,
          thursday: data[0].thursday,
          friday: data[0].friday,
          saturday: data[0].saturday,
          sunday: data[0].sunday,
        })
      }
    },
  )
}

/*
GET /topTenCategories
Return the ten most reviewed business categories.
top_business_categories is a VIEW for a complex query.
*/
const topTenCategories = async function (req, res) {
  connection.query(
    `
    SELECT category FROM top_business_categories;
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        res.json(data)
      }
    },
  )
}


/*
GET /bussinesses/:category
Given a business category return the top 20 businesses that have that category ordered by stars and review count
 */
const businessesInCategory = async function (req, res) {
  const category = req.params.category
  connection.query(
    `
    SELECT *
    FROM Business 
    WHERE categories LIKE "%${category}%" 
    ORDER BY stars DESC, review_count DESC
    LIMIT 20;
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        res.json(data)
      }
    },
  )
}

/*
GET /user/:user_id/topfivecategories
Given a user id return the top five most reviewed categories by the user
*/
const mostReviewedCategoryByUser = async function (req, res) {
  const id = req.params.user_id
  connection.query(
    `
    SELECT
    SUBSTRING_INDEX(SUBSTRING_INDEX(b.categories, ';', n.n), ',', -1) AS category,
    COUNT(*) AS count
    FROM
    Review r
    INNER JOIN
    Business b ON r.business_id = b.business_id
    INNER JOIN
    (SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) n
    ON LENGTH(b.categories) - LENGTH(REPLACE(b.categories, ',', '')) >= n.n - 1
    WHERE r.user_id = ${id}
    GROUP BY category
    ORDER BY count DESC
    LIMIT 5;
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        res.json(data)
      }
    },
  )
}


module.exports = {
  user,
  users,
  business,
  businesses,
  businessReviews,
  businessTips,
  businessHours,
  topTenCategories,
  businessesInCategory,
  mostReviewedCategoryByUser,
}
