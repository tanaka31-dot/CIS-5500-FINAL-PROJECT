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

function useUserData(userId) {
    const [user, setUser] = useState([])
    const [reviews, setReviews] = useState([])
    const [tips, setTips] = useState([])
    const [categoryByUser, setCategoryByUser] = useState([])

    useEffect(() => {
      fetch(
        `http://${config.server_host}:${config.server_port}/user/${userId}`,
      )
        .then((res) => res.json())
        .then((resJson) => setUser(resJson))

      fetch(
        `http://${config.server_host}:${config.server_port}/user/${userId}/reviews`,
      )
        .then((res) => res.json())
        .then((resJson) => setReviews(resJson))

      fetch(
        `http://${config.server_host}:${config.server_port}/user/${userId}/tips`,
      )
        .then((res) => res.json())
        .then((resJson) => setTips(resJson))

      fetch(
        `http://${config.server_host}:${config.server_port}/user/${userId}/mostReviewedCategoryByUser`,
      )
        .then((res) => res.json())
        .then((resJson) => setCategoryByUser(resJson))

    }, [userId])
  
    return { user, reviews, tips, categoryByUser}
}

function UserPage() {
    const { user_id } = useParams()
    const { user, reviews, tips, categoryByUser } = useUserData(user_id)
    const friendsIds = user.friends ? user.friends.split(",").map(str => parseInt(str, 10)) : null;

    return(
        <div className="one-business-page">
            <h1 className="business-name">
                {user.name}
            </h1>
            {user.average_stars && (
                <div className="user-avg-stars">
                {[...Array(Math.floor(user.average_stars))].map((star, i) => (
                    <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    style={{ color: '#ff9529' }}
                    />
                ))}
                </div>
            )}

            <div className="icon-container">
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon={faLightbulb} />
                  <span className="text">Useful {user.useful}</span>
                </div>
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon={faFaceGrinSquint} />
                  <span className="text">Funny {user.funny}</span>
                </div>
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon={faFaceSurprise} />
                  <span className="text">Cool {user.cool}</span>
                </div>
              </div>

            <div className="user-info">
                <>
                    <span><strong>Total Reviews</strong>: </span>{user.review_count}<br />
                    <span><strong>Years Elite</strong>: </span>{user.elite}<br />
                </>  
            </div>

            {categoryByUser && Array.isArray(categoryByUser) && (
                <div className="category-by-user">
                    <h3>Most Reviewed Business Categories:</h3>
                    {categoryByUser.map((cat, index) => (
                        <div className="category-item" key={cat.category}>
                            <span><strong></strong> </span>{cat.category}<br />
                        </div>    
                    ))}
                </div>
            )}

            {friendsIds && Array.isArray(friendsIds) && (
            <div className="user-friends">
                <h3>Friends:</h3>
                <div className="friend-container">
                {friendsIds.map((friend, index) => (
                    <div className="friend-item" key={friend.id}>
                    <NavLink to={`/user/${friend}`}>
                        <div className="friend-name">Friend {index}</div>
                    </NavLink>
                    </div>
                ))}
                </div>
            </div>
            )}
            
            {reviews && Array.isArray(reviews) && (
                <div className="business-reviews">
                <h3>Reviews:</h3>
                {reviews.map((review) => (
                    <div className="review-item" key={review.id}>
                    <NavLink to={`/business/${review.business_id}`}>
                        <div className="review-name">{review.name.replace(/['"]/g, '')}</div>
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
                    <NavLink to={`/business/${tip.Business_id}`}>
                        <div className="review-name">{tip.name.replace(/['"]/g, '')}</div>
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

export default UserPage