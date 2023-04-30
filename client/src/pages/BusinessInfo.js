import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const config = require('../config.json');

function useBusinessData(businessId) {
  const [business, setbusiness] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [tips, setTips] = useState([]);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    fetch(
      `http://${config.server_host}:${config.server_port}/business/${businessId}`,
    )
      .then((res) => res.json())
      .then((resJson) => setbusiness(resJson));

    fetch(
      `http://${config.server_host}:${config.server_port}/business/${businessId}/fivereviews`,
    )
      .then((res) => res.json())
      .then((resJson) => setReviews(resJson));
    fetch(
      `http://${config.server_host}:${config.server_port}/business/${businessId}/fivetips`,
    )
      .then((res) => res.json())
      .then((resJson) => setTips(resJson));

    fetch(
      `http://${config.server_host}:${config.server_port}/business/${businessId}/hours`,
    )
      .then((res) => res.json())
      .then((resJson) => setHours(resJson));
  }, [businessId]);

  return { business, reviews, tips, hours };
}

function OneBusinessPage() {
  const { business_id } = useParams();
  const { business, reviews, tips, hours } = useBusinessData(business_id);


  return (
    <div className="one-business-page">
        <h1 className="business-name">{business.name}</h1>
        <div className="business-address">{business.address}</div>
        <div className="business-hours">
        <h3>Hours:</h3>
        {Object.entries(hours).map(([day, hours]) => (
          <div key={day}>
            <span>{day}: </span>
            <span>{hours}</span>
          </div>
        ))}
      </div>

      <div className="business-reviews">
        <h3>Reviews:</h3>
        {reviews.map((review) => (
          <div key={review.id}>
            <div>{review.text}</div>
            <div className="review-stars">
              {[...Array(Math.floor(review.stars))].map((star, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default OneBusinessPage;

