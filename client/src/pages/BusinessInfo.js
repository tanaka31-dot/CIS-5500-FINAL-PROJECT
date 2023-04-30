import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {
  faLightbulb,
  faFaceGrinSquint,
  faFaceSurprise,
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
      `http://${config.server_host}:${config.server_port}/business/${businessId}/fivereviews`,
    )
      .then((res) => res.json())
      .then((resJson) => setReviews(resJson))
    fetch(
      `http://${config.server_host}:${config.server_port}/business/${businessId}/fivetips`,
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
      <h1 className="business-name">{business.name}</h1>
      <div className="business-address">{business.address}</div>

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
              <span>{day}: </span>
              <span>{hours}</span>
            </div>
          ))}
        </div>
      )}

      {reviews && Array.isArray(reviews) && (
        <div className="business-reviews">
          <h3>Reviews:</h3>
          {reviews.map((review) => (
            <div key={review.id}>
              <div>{review.name}</div>
              <div>{review.text}</div>
              <div className="review-stars">
                {[...Array(Math.floor(review.stars))].map((star, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    style={{ color: '#ff9529' }}
                  />
                ))}
                {review.date}
              </div>
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
        <div className="business-tips">
          <h3>Tips:</h3>
          {tips.map((tip) => (
            <div key={tip.id}>
              <div>{tip.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OneBusinessPage
