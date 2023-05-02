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

// Route 1: GET /user/:user-id
const user = async function (req, res) {
  //Given a user_id, returns all information about the user
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

// Route 1: GET /business/:business_id
const business = async function (req, res) {
  //Given a user_id, returns all information about the user
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

//GET /businesses
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
        res.json(data)
      }
    },
  )
}

//GET /users
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

//GET businesses/:business_id/reviews
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

//GET businesses/:business_id/fivereviews
// const fiveReviews = async function (req, res) {
//   const id = req.params.business_id
//   connection.query(
//     `SELECT u.name, r.*
//     FROM Review r JOIN User u ON r.user_id = u.user_id 
//     WHERE r.business_id = ${id}
//     LIMIT 5`,
//     (err, data) => {
//       if (err || data.length === 0) {
//         console.log(err)
//         res.json({})
//       } else {
//         res.json(data)
//       }
//     },
//   )
// }

//GET businesses/:business_id/tips
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

//GET businesses/:business_id/fivetips
// const fiveTips = async function (req, res) {
//   const id = req.params.business_id

//   connection.query(
//     `SELECT u.name, t.*
//     FROM Tip t JOIN User u ON t.user_id = u.user_id
//     WHERE t.business_id = ${id}
//     LIMIT 5`,
//     (err, data) => {
//       if (err || data.length === 0) {
//         console.log(err)
//         res.json({})
//       } else {
//         res.json(data)
//       }
//     },
//   )
// }

//GET businesses/:business_id/hours
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

//GET user/:user-id/reviews
const userReviews = async function (req, res) {
  const id = req.params.user_id
  connection.query(
    `SELECT b.name, r.*
     FROM Review r JOIN Business b ON r.business_id = b.business_id
     WHERE r.user_id = ${id}`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        console.log("REVIEW DATA :", data)
        res.json(data)
      }
    },
  )
}

//GET user/:user-id/tips
const userTips = async function (req, res) {
  const id = req.params.user_id
  connection.query(
    `SELECT b.name, t.*
    FROM Tip t JOIN Business b ON t.Business_id = b.business_id
    WHERE t.user_id = ${id}`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        console.log(data)
        res.json(data)
      }
    },
  )
}

const topTenCategories = async function (req, res) {
  connection.query(
    `
    SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(categories, ';', numbers.n), ',', -1) AS category, COUNT(*) AS num_reviews
    FROM Business
    JOIN (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
      UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10) numbers
      ON CHAR_LENGTH(categories) - CHAR_LENGTH(REPLACE(categories, ',', '')) >= numbers.n - 1
      JOIN Review ON Business.business_id = Review.business_id
      GROUP BY category
      ORDER BY num_reviews DESC
      LIMIT 10;
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
  userReviews,
  userTips,
  topTenCategories,
  mostReviewedCategoryByUser,
}
