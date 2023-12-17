import {React,useEffect,useState} from 'react';
import avatar from"../../assets/images/avatar-icon.png"
import { formateDate } from '../../utils/formateDate';
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';
import { BASE_URL, token } from "../../config";

const Feedback = ({ doctorDetails }) => {
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await fetch(`${BASE_URL}/doctors/${doctorDetails._id}/reviews`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch reviews');
          }
  
          const data = await response.json();
          setReviews(data.data);
        } catch (error) {
          console.error('Error fetching reviews:', error.message);
        }
      };
  
      fetchReviews();
    }, [doctorDetails]);
  
    return (
      <div>
        <div className="mb-[50px]">
          <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>
            All reviews({reviews.length})
          </h4>
  
          {reviews.map((review, index) => (
  <div key={index} className='flex justify-between gap-10 mb-[30px]'>
    <div className='flex gap-3'>
      <figure className='w-10 h-10 rounded-full'>
        <img className='w-full' src={review.user && review.user.photo ? review.user.photo : avatar} alt="" />
      </figure>

      <div>
        <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>
          {review.user && review.user.name ? review.user.name : 'Anonymous'}
        </h5>
        <p className='text-[14px] leading-6 text-textColor'>
          {formateDate(review.createdAt)}
        </p>
        <p className='text__para mt-3 font-medium text-[15px]'>
          {review.reviewText}
        </p>
      </div>
    </div>

    <div className='flex gap-1'>
      {[...Array(5).keys()].map((_, index) => (
        <AiFillStar key={index} color='#0067FF' />
      ))}
    </div>
  </div>
))}
        </div>
  
        {!showFeedbackForm && (
          <div className='text-center'>
            <button className='btn' onClick={() => setShowFeedbackForm(true)}>
              Give Feedback
            </button>
          </div>
        )}
  
        {showFeedbackForm && <FeedbackForm doctorDetail={doctorDetails} />}
      </div>
    );
  };
  
  export default Feedback;