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
  const page = req.query.page ?? 1
  const pageSize = req.query.pageSize
  const offset = (page - 1) * pageSize

  const name = req.query.name ?? '';
  const review_count = req.query.review_count ?? 0;
  const useful = req.query.useful ?? 0;
  const funny = req.query.funny ?? 0;
  const cool = req.query.cool ?? 0;
  const fans = req.query.fans ?? 0;
  const average_stars_low = req.query.average_stars_low ?? 0;
  const average_stars_high = req.query.average_stars_high ?? 5;
  const ordered_by = req.query.ordered_by ?? 'review_count'

  q = `
  SELECT *
  FROM User
  WHERE (
    (name LIKE '%${name}%')
    AND (review_count >= ${review_count})
    AND (useful >= ${useful})
    AND (funny >= ${funny})
    AND (cool >= ${cool})
    AND (fans >= ${fans})
    AND (average_stars >= ${average_stars_low}) AND (average_stars <= ${average_stars_high})
  )
  ORDER BY ${ordered_by} DESC, name
  LIMIT ${pageSize}
  OFFSET ${offset} 
  `
  
  connection.query(`
  SELECT *
  FROM User
  WHERE (
    (name LIKE '%${name}%')
    AND (review_count >= ${review_count})
    AND (useful >= ${useful})
    AND (funny >= ${funny})
    AND (cool >= ${cool})
    AND (fans >= ${fans})
    AND (average_stars >= ${average_stars_low}) AND (average_stars <= ${average_stars_high})
  )
  ORDER BY ${ordered_by} DESC, name
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
GET /user/:user_id/mostReviewedCategoryByUser
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

const search_businesses = async function(req, res) {
    //default parameters for the query parameters
    const queryParams = [
        { key: 'city', value: req.query.city ?? '' },
        { key: 'name', value: req.query.name ?? '' },
        { key: 'state', value: req.query.state_abreviation ?? '' },
        { key: 'postal_code', value: req.query.postal_code ?? 0 },
        { key: 'stars', value: req.query.stars ?? 0 },
        { key: 'review_count', value: req.query.review_count ?? 0 },
        { key: 'is_open', value: req.query.is_open !== undefined ? (req.query.is_open === 'true' ? 1 : 0) : 0 },
        { key: 'AcceptsInsurance', value: req.query.accepts_insurance !== undefined ? (req.query.accepts_insurance === 'true' ? 1 : 0) : 0 },
        { key: 'ByAppointmentOnly', value: req.query.by_appointment_only !== undefined ? (req.query.by_appointment_only === 'true' ? 1 : 0) : 0 },
        { key: 'BusinessAcceptsCreditCards', value: req.query.accept_creditcard !== undefined ? (req.query.accept_creditcard === 'true' ? 1 : 0) : 0 },
        { key: 'BusinessParking_garage', value: req.query.garage_parking !== undefined ? (req.query.garage_parking === 'true' ? 1 : 0) : 0 },
        { key: 'BusinessParking_lot', value: req.query.lot_parking !== undefined ? (req.query.lot_parking === 'true' ? 1 : 0) : 0 },
        { key: 'BusinessParking_street', value: req.query.street_parking !== undefined ? (req.query.street_parking === 'true' ? 1 : 0) : 0 },
        { key: 'BusinessParking_valet', value: req.query.valet_parking !== undefined ? (req.query.valet_parking === 'true' ? 1 : 0) : 0 },
        { key: 'BYOB', value: req.query.b_YOB !== undefined ? (req.query.b_YOB === 'true' ? 1 : 0) : 0 },
        { key: 'Open24Hours', value: req.query.open_24_hours !== undefined ? (req.query.open_24_hours === 'true' ? 1 : 0) : 0 },
        { key: 'BusinessAcceptsBitcoin', value: req.query.accepts_bitcoin !== undefined ? (req.query.accepts_bitcoin === 'true' ? 1 : 0) : 0 },
        { key: 'DogsAllowed', value: req.query.dogs_allowed !== undefined ? (req.query.dogs_allowed === 'true' ? 1 : 0) : 0 },
        { key: 'DriveThru', value: req.query.drive_thru !== undefined ? (req.query.drive_thru === 'true' ? 1 : 0) : 0 },
        { key: 'RestaurantsDelivery', value: req.query.delivery !== undefined ? (req.query.delivery === 'true' ? 1 : 0) : 0 },
        { key: 'OutdoorSeating', value: req.query.outdoor_seating !== undefined ? (req.query.outdoor_seating === 'true' ? 1 : 0) : 0 },
        { key: 'GoodForDancing', value: req.query.good_for_dancing !== undefined ? (req.query.good_for_dancing === 'true' ? 1 : 0) : 0 },
        { key: 'HappyHour', value: req.query.happy_hour !== undefined ? (req.query.happy_hour === 'true' ? 1 : 0) : 0 },
        { key: 'RestaurantsTakeOut', value: req.query.take_out !== undefined ? (req.query.take_out === 'true' ? 1 : 0) : 0 },
        { key: 'RestaurantsReservations', value: req.query.reservations !== undefined ? (req.query.reservations === 'true' ? 1 : 0) : 0 },
        { key: 'WiFi', value: req.query.w_ifi !== undefined ? (req.query.w_ifi === 'true' ? 1 : 0) : 0 },
        { key: 'RestaurantsGoodForGroups', value: req.query.good_for_groups !== undefined ? (req.query.good_for_groups === 'true' ? 1 : 0) : 0 },
        { key: 'Ambience_casual', value: req.query.casual !== undefined ? (req.query.casual === 'true' ? 1 : 0) : 0 },
        { key: 'Ambience_upscale', value: req.query.upscale !== undefined ? (req.query.upscale === 'true' ? 1 : 0) : 0 },
        { key: 'Ambience_trendy', value: req.query.trendy !== undefined ? (req.query.trendy === 'true' ? 1 : 0) : 0 },
        { key: 'Ambience_touristy', value: req.query.touristy !== undefined ? (req.query.touristy === 'true' ? 1 : 0) : 0 },
        { key: 'Ambience_divey', value: req.query.divey !== undefined ? (req.query.divey === 'true' ? 1 : 0) : 0 },
        { key: 'Ambience_hipster', value: req.query.hipster !== undefined ? (req.query.hipster === 'true' ? 1 : 0) : 0 },
        { key: 'Ambience_classy', value: req.query.classy !== undefined ? (req.query.classy === 'true' ? 1 : 0) : 0 },
        { key: 'Ambience_intimate', value: req.query.intimate !== undefined ? (req.query.intimate === 'true' ? 1 : 0) : 0 },
        { key: 'Ambience_romantic', value: req.query.romantic !== undefined ? (req.query.romantic === 'true' ? 1 : 0) : 0 },
        { key: 'Alcohol', value: req.query.alcohol !== undefined ? (req.query.alcohol === 'true' ? 1 : 0) : 0 },
    ];
    //base query string
    let queryString = "SELECT * FROM Business b JOIN Business_Attributes ba ON b.business_id = ba.business_id WHERE 1=1";

    //dynamically creates query based on the input query parameters
    queryParams.forEach(param => {
        if (param.value !== '' && param.value !== 0) {
            if (typeof param.value === 'number') {
                queryString += ` AND ${param.key} >= ${param.value}`;
            } else {
                queryString += ` AND ${param.key} LIKE '%${param.value}%'`;
            }
        }
    });

    // Add the ORDER BY
    queryString += ' ORDER BY stars DESC';

    // Add the LIMIT clause to get only the top 100 results
    queryString += ' LIMIT 100';


  connection.query(
        queryString,
      (err, data) => {
        if (err) {
          console.error('Error executing query:', err);
          res.json({});
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.json(data);
        }
      });
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
        res.json(data)
      }
    },
  )
}

const weekends = async function (req, res) {
  connection.query(
    `WITH temp AS (
      SELECT bh.business_id, name, stars, monday, tuesday, wednesday, thursday, friday, saturday, sunday
      FROM Business
      JOIN Business_Hours bh ON Business.business_id = bh.business_id
      WHERE monday = 'None' AND tuesday = 'None' AND wednesday = 'None' AND thursday = 'None'
        AND friday != 'None' AND saturday != 'None' AND sunday != 'None'
      )
      SELECT business_id, name, AVG(stars) AS rating
      FROM temp
      GROUP BY name
      ORDER BY rating DESC;`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err)
        res.json({})
      } else {
        console.log(data.length)
        res.json(data)
      }
    },
  )
}

/*
GET /topCities
Gets cities with with highest average star rating and activity across all buildings 
*/
const topCities = async function (req, res) {

  connection.query(
    `
    WITH Cities AS (
      SELECT b.city, AVG(b.stars) AS avg_business_rating, COUNT(DISTINCT t.tip_id) AS num_tips
      FROM Business b
      JOIN Tip t ON b.business_id=t.business_id
      GROUP BY b.city
    )
    SELECT city, (avg_business_rating * num_tips) AS ranking
    FROM Cities
    ORDER BY ranking DESC 
    LIMIT 15
  `,
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
  search_businesses,
  userReviews,
  userTips,
  weekends,
  topCities,
}
