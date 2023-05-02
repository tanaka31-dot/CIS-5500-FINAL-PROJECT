const express = require('express')
//const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('./config')
const routes = require('./routes')

const app = express()
app.use(
  cors({
    origin: '*',
  }),
)

// Routes here
app.get('/user/:user_id', routes.user)
app.get('/business/:business_id', routes.business)
app.get('/businesses', routes.businesses)
app.get('/business/:business_id/reviews', routes.businessReviews)
app.get('/business/:business_id/tips', routes.businessTips)
app.get('/business/:business_id/hours', routes.businessHours)
app.get('/topTenCategories', routes.topTenCategories)
app.get('/users', routes.users)
app.get('/bussinesses/:category', routes.businessesInCategory)
app.get('/user/:user_id/mostReviewedCategoryByUser', routes.mostReviewedCategoryByUser)
app.get('/search/businesses', routes.search_businesses)
app.get('/user/:user_id/reviews', routes.userReviews)
app.get('/user/:user_id/tips', routes.userTips)
app.get('/weekends', routes.weekends)
app.get('/topCities', routes.topCities)

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`,
  )
})

module.exports = app
