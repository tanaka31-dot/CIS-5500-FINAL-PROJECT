import React, { useState, } from 'react';
import SearchForm from './SearchForm';
import {NavLink} from "react-router-dom";

const config = require('../config.json')

//these are the parameters for the search page
const BusinessSearchPage = () => {
    const [searchParams, setSearchParams] = useState({
        city: '',
        state_abreviation: '',
        name: '',
        postal_code: '',
        stars: '',
        review_count: '',
        is_open: false,
        accepts_insurance: false,
        by_appointment_only: false,
        accept_creditcard: false,
        garage_parking: false,
        lot_parking: false,
        street_parking: false,
        valet_parking: false,
        b_YOB: false,
        open_24_hours: false,
        accepts_bitcoin: false,
        dogs_allowed: false,
        drive_thru: false,
        delivery: false,
        outdoor_seating: false,
        good_for_dancing: false,
        happy_hour: false,
        take_out: false,
        reservations: false,
        w_ifi: false,
        good_for_groups: false,
        casual: false,
        upscale: false,
        trendy: false,
        touristy: false,
        divey: false,
        hipster: false,
        classy: false,
        intimate: false,
        romantic: false,
        alcohol: false,
    });

    const [searchResults, setSearchResults] = useState([]);

    //this handles changing the query parameters if they are input to the front end
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchParams((prevParams) => ({
            ...prevParams,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    //this function is called when the search button is clocked. It created the link using the query parameters
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make API request here
        const response = await fetch(`http://${config.server_host}:${config.server_port}/search/businesses?${new URLSearchParams(searchParams).toString()}`);
        const data = await response.json();
        setSearchResults(data);
    };
    //this is the UI for the business search page. The h2 tag contains a table that displays the search results if the
    //size of the result is non 0
    return (
        <div>
            <h1>Business Search</h1>
            <SearchForm searchParams={searchParams} handleChange={handleChange} handleSubmit={handleSubmit} />

            <h2>Search Results</h2>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((business) => (
                        <li key={business.business_id}>
                            <NavLink to={`/business/${business.business_id}`} style = {{textDecoration: 'none'}}>
                                {business.name} - {business.stars} stars - {business.city}, {business.state}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );


};


export default BusinessSearchPage;