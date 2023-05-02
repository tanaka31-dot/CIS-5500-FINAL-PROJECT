import React from 'react';
import './SearchForm.css';

//the code on this page creates the search for using the style from SearchForm.css
const SearchForm = ({ searchParams, handleChange, handleSubmit }) => {
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group-text">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={searchParams.name} onChange={handleChange}/>
                </div>

                <div className="form-group-text">
                    <label htmlFor="city">City:</label>
                    <input type="text" name="city" value={searchParams.city} onChange={handleChange} />
                </div>

                <div className="form-group-text">
                    <label htmlFor="state_abreviation">State Abreviation (2 letters):</label>
                    <input type="text" name="state_abreviation" value={searchParams.state_abreviation} onChange={handleChange}
                           pattern=".{0,2}" maxLength="2"/>
                </div>

                <div className="form-group-text">
                    <label htmlFor="postal_code">Postal Code:</label>
                    <input type="number" name="postal_code" value={searchParams.postal_code} onChange={handleChange}
                    maxLength="5"/>
                </div>

                <div className="form-group-text">
                    <label htmlFor="stars">Minimum Number of Stars:</label>
                    <input type="number" name="stars" value={searchParams.stars} onChange={handleChange}
                    maxLength="1"/>
                </div>

                <div className="form-group-text">
                    <label htmlFor="review_count">Minimum Number of Reviews:</label>
                    <input type="number" name="review_count" value={searchParams.review_count} onChange={handleChange} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group-checkbox">
                    <label htmlFor="is_open">Is Open:</label>
                    <input type="checkbox" name="is_open" checked={searchParams.is_open} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="accepts_insurance">Accepts Insurance:</label>
                    <input type="checkbox" name="accepts_insurance" checked={searchParams.accepts_insurance} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="by_appointment_only">By Appointment Only:</label>
                    <input type="checkbox" name="by_appointment_only" checked={searchParams.by_appointment_only} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="accept_creditcard">Accepts Credit Card:</label>
                    <input type="checkbox" name="accept_creditcard" checked={searchParams.accept_creditcard} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="garage_parking">Has Garage Parking:</label>
                    <input type="checkbox" name="garage_parking" checked={searchParams.garage_parking} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="lot_parking">Has Lot Parking:</label>
                    <input type="checkbox" name="lot_parking" checked={searchParams.lot_parking} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="street_parking">Has Street Parking:</label>
                    <input type="checkbox" name="street_parking" checked={searchParams.street_parking} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="valet_parking">Has Valet Parking:</label>
                    <input type="checkbox" name="valet_parking" checked={searchParams.valet_parking} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="b_YOB">BYOB:</label>
                    <input type="checkbox" name="b_YOB" checked={searchParams.b_YOB} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="open_24_hours">Open 24 Hours:</label>
                    <input type="checkbox" name="open_24_hours" checked={searchParams.open_24_hours} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="accepts_bitcoin">Accepts Bitcoin:</label>
                    <input type="checkbox" name="accepts_bitcoin" checked={searchParams.accepts_bitcoin} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="dogs_allowed">Allows Dogs:</label>
                    <input type="checkbox" name="dogs_allowed" checked={searchParams.dogs_allowed} onChange={handleChange} />
                </div>

            </div>
            <div className="form-row">

                <div className="form-group-checkbox">
                    <label htmlFor="drive_thru">Has Drive Thru:</label>
                    <input type="checkbox" name="drive_thru" checked={searchParams.drive_thru} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="delivery">Delivers:</label>
                    <input type="checkbox" name="delivery" checked={searchParams.delivery} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="outdoor_seating">Has Outdoor Seating:</label>
                    <input type="checkbox" name="outdoor_seating" checked={searchParams.outdoor_seating} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="good_for_dancing">Good For Dancing:</label>
                    <input type="checkbox" name="good_for_dancing" checked={searchParams.good_for_dancing} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="happy_hour">Has Happy Hour:</label>
                    <input type="checkbox" name="happy_hour" checked={searchParams.happy_hour} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="take_out">Has Takeout:</label>
                    <input type="checkbox" name="take_out" checked={searchParams.take_out} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="reservations">Accepts Reservations:</label>
                    <input type="checkbox" name="reservations" checked={searchParams.reservations} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="w_ifi">Has WiFi:</label>
                    <input type="checkbox" name="w_ifi" checked={searchParams.w_ifi} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="good_for_groups">Good For Groups:</label>
                    <input type="checkbox" name="good_for_groups" checked={searchParams.good_for_groups} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="casual">Casual Ambiance:</label>
                    <input type="checkbox" name="casual" checked={searchParams.casual} onChange={handleChange} />
                </div>

            </div>
            <div className="form-row">
                <div className="form-group-checkbox">
                    <label htmlFor="upscale">Upscale Ambiance:</label>
                    <input type="checkbox" name="upscale" checked={searchParams.upscale} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="trendy">Trendy Ambiance:</label>
                    <input type="checkbox" name="trendy" checked={searchParams.trendy} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="touristy">Touristy Ambiance:</label>
                    <input type="checkbox" name="touristy" checked={searchParams.touristy} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="divey">Divey Ambiance:</label>
                    <input type="checkbox" name="divey" checked={searchParams.divey} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="hipster">Hipster Ambiance:</label>
                    <input type="checkbox" name="hipster" checked={searchParams.hipster} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="classy">Classy Ambiance:</label>
                    <input type="checkbox" name="classy" checked={searchParams.classy} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="intimate">Intimate Ambiance:</label>
                    <input type="checkbox" name="intimate" checked={searchParams.intimate} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="romantic">Romantic Ambiance:</label>
                    <input type="checkbox" name="romantic" checked={searchParams.romantic} onChange={handleChange} />
                </div>

                <div className="form-group-checkbox">
                    <label htmlFor="alcohol">Serves Alcohol:</label>
                    <input type="checkbox" name="alcohol" checked={searchParams.alcohol} onChange={handleChange} />
                </div>
            </div>


            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
