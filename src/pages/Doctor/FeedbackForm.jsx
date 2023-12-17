import {React , useState} from 'react'
import { AiFillStar } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL, token } from "../../config";

const FeedbackForm = ({doctorDetail}) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    const [rating,setRating] = useState(0)
    const [hover,setHover] = useState(0)
    const [reviewtext,setReviewText] = useState("");
 
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/doctors/${doctorDetail._id}/reviews`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),

            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
           
            toast.success('Review submitted successfully');
            // Handle success scenario, maybe display a success message or update the UI
        } catch (error) {
            // Handle errors, display an error message or handle error scenarios
            console.error('Error submitting review:', error.message);
            toast.error('Failed to submit review');

        }
    };


  return (
    <form onSubmit={handleSubmitReview}>
        <div>
            <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                How would you rate the overall experience?*
            </h3>

            <div>
                {[...Array(5).keys()].map((_, index) => {
                    index += 1;

                    return (
                        <button key={index} type="button" className={`${
                            index <= ((rating && hover) || hover)
                            ? "text-yellowColor"
                            : "text-gray-400"
                        } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                         onClick={()=> setRating(index)}
                         onMouseEnter={()=> setHover(index)}
                         onMouseLeave={()=> setHover(rating)}
                         onDoubleClick={() => {setHover(0); setRating(0);}}>
                            <span>
                                <AiFillStar />
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>

        <div className="mt-[30px]">
        <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                Share your feedback or suggestions*
            </h3>
            <textarea className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md' rows="5"
            placeholder="Write your message"
            name='reviewText'
            value={formData.reviewText}
            onChange={handleInputChange}
            >
            </textarea>
        </div>

        <button type='submit'className='btn'>Submit Feedback</button>
    </form>
  )
}

export default FeedbackForm