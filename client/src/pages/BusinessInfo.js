import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import {
  faLightbulb,
  faFaceGrinSquint,
  faFaceSurprise,
  faThumbsUp,
} from '@fortawesome/free-regular-svg-icons'
import '../components/styles.css'

const config = require('../config.json')

function useBusinessData(businessId) {
  const [business, setbusiness] = useState([])
  const [reviews, setReviews] = useState([])
  const [tips, setTips] = useState([])
  const [hours, setHours] = useState([])

  useEffect(() => {
    fetch(
      `http://${config.server_host}:${config.server_port}/business/${businessId}`,
    )
      .then((res) => res.json())
      .then((resJson) => setbusiness(resJson))

    fetch(
      `http://${config.server_host}:${config.server_port}/business/${businessId}/reviews`,
    )
      .then((res) => res.json())
      .then((resJson) => setReviews(resJson))
    fetch(
      `http://${config.server_host}:${config.server_port}/business/${businessId}/tips`,
    )
      .then((res) => res.json())
      .then((resJson) => setTips(resJson))

    fetch(
      `http://${config.server_host}:${config.server_port}/business/${businessId}/hours`,
    )
      .then((res) => res.json())
      .then((resJson) => setHours(resJson))
  }, [businessId])

  return { business, reviews, tips, hours }
}

function OneBusinessPage() {
  const { business_id } = useParams()
  const { business, reviews, tips, hours } = useBusinessData(business_id)

  return (
    <div className="one-business-page">
      <h1 className="business-name">
        {business.name && business.name.replace(/['"]/g, '')}
      </h1>
      <div className="business-address">
        {business.address && business.address.replace(/['"]/g, '')},{' '}
        {business.city}, {business.state}, {business.postal_code}
      </div>

      {business.stars && (
        <div className="business-stars">
          {[...Array(Math.floor(business.stars))].map((star, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              style={{ color: '#ff9529' }}
            />
          ))}
        </div>
      )}
      {hours && (
        <div className="business-hours">
          <h3>Hours:</h3>
          {Object.entries(hours).map(([day, hours]) => (
            <div key={day}>
              <span>{day.charAt(0).toUpperCase() + day.slice(1)}: </span>
              <span>{hours}</span>
            </div>
          ))}
        </div>
      )}

      {reviews && Array.isArray(reviews) && (
        <div className="business-reviews">
          <h3>Reviews:</h3>
          {reviews.map((review) => (
            <div className="review-item" key={review.id}>
              <NavLink to={`/user/${review.user_id}`}>
                <div className="review-name">{review.name}</div>
              </NavLink>

              <div className="margin">
                {[...Array(Math.floor(review.stars))].map((star, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    style={{ color: '#ff9529' }}
                  />
                ))}
                <span className="review-date">{review.date}</span>
              </div>
              <div>{review.text}</div>
              <div className="icon-container">
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon={faLightbulb} />
                  <span className="text">Useful {review.useful}</span>
                </div>
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon={faFaceGrinSquint} />
                  <span className="text">Funny {review.funny}</span>
                </div>
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon={faFaceSurprise} />
                  <span className="text">Cool {review.cool}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {tips && Array.isArray(tips) && (
        <div className="business-reviews">
          <h3>Tips:</h3>
          {tips.map((tip) => (
            <div className="review-item" key={tip.id}>
              <NavLink to={`/user/${tip.user_id}`}>
                <div className="review-name">{tip.name}</div>
              </NavLink>

              <div className="tip-date">{tip.date}</div>
              <div>{tip.text}</div>
              <div className="icon-container">
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span className="text">Likes {tip.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OneBusinessPage
