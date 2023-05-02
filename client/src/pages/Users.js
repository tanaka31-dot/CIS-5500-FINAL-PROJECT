import { useEffect, useState } from 'react'
import { Box, Container, Pagination } from '@mui/material'
import { Button, Slider } from '@mui/material';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLightbulb,
  faFaceGrinSquint,
  faFaceSurprise,
  faUser,
} from '@fortawesome/free-regular-svg-icons'
import '../components/styles.css'

const config = require('../config.json')

export default function UsersPage() {
    const pageSize = 20
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)

    const [name, setName] = useState('');
    const [review_count, setReviewCount] = useState(0);
    const [useful, setUseful] = useState(0);
    const [funny, setFunny] = useState(0);
    const [cool, setCool] = useState(0);
    const [fans, setFans] = useState(0);
    const [average_stars, setStars] = useState([0, 5]);
    const [ordered_by, setOrder] = useState('review_count');



    useEffect(() => {
        fetch(
          `http://${config.server_host}:${config.server_port}/users?page=${page}&pageSize=${pageSize}` +
          `&name=${name}&review_count=${review_count}&useful=${useful}&funny=${funny}&cool=${cool}&fans=${fans}` +
          `&average_stars_low=${average_stars[0]}&average_stars_high=${average_stars[1]}&ordered_by=${ordered_by}`
        )
          .then((res) => res.json())
          .then((resJson) => setUsers(resJson))
      }, [page])

    const search = () => {
      fetch(
        `http://${config.server_host}:${config.server_port}/users?page=${page}&pageSize=${pageSize}` +
        `&name=${name}&review_count=${review_count}&useful=${useful}&funny=${funny}&cool=${cool}&fans=${fans}` +
        `&average_stars_low=${average_stars[0]}&average_stars_high=${average_stars[1]}&ordered_by=${ordered_by}`
      )
        .then((res) => res.json())
        .then((resJson) => setUsers(resJson))
    }


    const bodyStyle = {
        // backgroundImage: `url(${require('./skyline.jpg')})`,
        backgroundColor: 'lightblue',
        backgroundSize: '100% auto',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'row',
        //position: "fixed"
      }

      const userCard = {
        width: '100%',
        height: '50%',
        border: '1px solid lightgrey',
        borderRadius: '60px',
        margin: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        transition: 'all .2s ease-in-out',
        backgroundColor : '#cceeff',
      }

      const filterCard = {
        width: '25%',
        height: '80%',
        border: '1px solid lightgrey',
        borderRadius: '40px',
        margin: '30px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        transition: 'all .2s ease-in-out',
        backgroundColor : '#cceeff',
        //position: 'fixed',
        
      }

      const handlePageChange = (e, newPage) => {
        // Can always go to previous page (TablePagination prevents negative pages)
        // but only fetch next page if we haven't reached the end (currently have full page of data)
        setPage(newPage)
        
      }

      function interpolateColors(color1, color2, ratio) {
        ratio = Math.max(Math.min(Number(ratio), 1), 0)
        const r1 = parseInt(color1.substring(1, 3), 16)
        const g1 = parseInt(color1.substring(3, 5), 16)
        const b1 = parseInt(color1.substring(5, 7), 16)
        const r2 = parseInt(color2.substring(1, 3), 16)
        const g2 = parseInt(color2.substring(3, 5), 16)
        const b2 = parseInt(color2.substring(5, 7), 16)
        const r = Math.round(r1 * (1 - ratio) + r2 * ratio)
        const g = Math.round(g1 * (1 - ratio) + g2 * ratio)
        const b = Math.round(b1 * (1 - ratio) + b2 * ratio)
        const hex =
          '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        return hex
      }
    
      const userCardHover = {
        transform: 'scale(1.05)',
        boxShadow: '2px 2px 10px darkgrey',
      }
    
      const flexFormat = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }

      return (
        <div style={bodyStyle}>
            <div className="filter-block"style={filterCard}>
              <h2>Search Users</h2>
              <form style={{marginLeft: '20px'}}>
                <label>
                  Name: {'    '}
                  <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} style={{borderRadius: '30px'}}/>
                </label>
                <div style={{display: 'flex'}}>
                  <p style={{marginRight: '10px'}}>Ordered by:</p>
                  <select onChange={(e) => setOrder(e.target.value)} style={{marginTop: '15px', width: '200px', height: '20px'}}>
                    <option value="review_count">Number of Reviews</option>
                    <option value="average_stars">Average Rating</option>
                    <option value="fans">Fans</option>
                    <option value="useful">Usefuls</option>
                    <option value="funny">Funnys</option>
                    <option value="cool">Cools</option>
                  </select>
                </div>
                <p>Average Rating:</p>
                <Slider
                  value={average_stars}
                  min={0}
                  max={5}
                  step={.01}
                  onChange={(e, newValue) => setStars(newValue)}
                  valueLabelDisplay='auto'
                  valueLabelFormat={value => <div>{value}</div>}
                />
                <p>Number of Reviews:</p>
                <Slider
                  value={review_count}
                  min={0}
                  max={15000}
                  step={1}
                  onChange={(e, newValue) => setReviewCount(newValue)}
                  valueLabelDisplay='auto'
                  valueLabelFormat={value => <div>{value}</div>}
                />
                <p>Fans:</p>
                <Slider
                  value={fans}
                  min={0}
                  max={1000}
                  step={1}
                  onChange={(e, newValue) => setFans(newValue)}
                  valueLabelDisplay='auto'
                  valueLabelFormat={value => <div>{value}</div>}
                />
                <p>Usefuls:</p>
                <Slider
                  value={useful}
                  min={0}
                  max={1000}
                  step={1}
                  onChange={(e, newValue) => setUseful(newValue)}
                  valueLabelDisplay='auto'
                  valueLabelFormat={value => <div>{value}</div>}
                />
                <p>Funnys:</p>
                <Slider
                  value={funny}
                  min={0}
                  max={1000}
                  step={1}
                  onChange={(e, newValue) => setFunny(newValue)}
                  valueLabelDisplay='auto'
                  valueLabelFormat={value => <div>{value}</div>}
                />
                <p>Cools:</p>
                <Slider
                  value={cool}
                  min={0}
                  max={1000}
                  step={1}
                  onChange={(e, newValue) => setCool(newValue)}
                  valueLabelDisplay='auto'
                  valueLabelFormat={value => <div>{value}</div>}
                />
                <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
                  Search
                </Button>
              </form>
            </div>
            <div style = {{}}>
              <Container style={flexFormat}>
                  {users
                      .map((user) => (
                        <NavLink to = {`/users/${user.user_id}`} style={{ textDecoration: 'none' }}>
                          <Box key={user.user_id} style = {userCard} sx = {{ ':hover': userCardHover }}> 
                          <div style={{display: 'flex', flexDirection: 'row'}}>
                              <h1 style={{ color: 'blue', margin: '0px 20px 0px', borderRight: '6px light blue'}}>
                                <img src={require('./profile_icon.png')} width= '50px' height = '50px' style={{verticalAlign: 'middle'}} alt=''/>
                                {'     '}{user.name}
                              </h1>
                          </div>                        
                            <div className="icon-container" style={{fontSize: '10px', margin: "20px 0px 0px 0px"}}>
                                  <div className="icon-wrapper" style={{borderRadius: "60px", color: "black", backgroundColor: "white"}}>
                                    <FontAwesomeIcon icon={faUser} />
                                    <span className="text">Fans {user.fans}</span>
                                  </div>
                                  <div className="icon-wrapper" style={{borderRadius: "60px", color: "black", backgroundColor: "white"}}>
                                    <FontAwesomeIcon icon={faLightbulb} />
                                    <span className="text">Useful {user.useful}</span>
                                  </div>
                                  <div className="icon-wrapper" style={{borderRadius: "60px", color: "black", backgroundColor: "white"}}>
                                    <FontAwesomeIcon icon={faFaceGrinSquint} />
                                    <span className="text">Funny {user.funny}</span>
                                  </div>
                                  <div className="icon-wrapper" style={{borderRadius: "60px", color: "black", backgroundColor: "white"}}>
                                    <FontAwesomeIcon icon={faFaceSurprise} />
                                    <span className="text">Cool {user.cool}</span>
                                  </div>
                                </div>
                          <h4 style={{color: "black",  marginTop: '10px', marginBottom: '10px', marginLeft: '10px', display: 'flex' }}>
                              {'Average Rating:    '}
                                {Array.from({ length: 5 }, (_, i) => {
                                  let color = 'lightgrey'
                                  if (i < Math.floor(user.average_stars)) {
                                    color = '#fe643d' // full stars
                                  } else if (
                                    i === Math.floor(user.average_stars) &&
                                    user.average_stars.toFixed(1) % 1 !== 0
                                  ) {
                                    // add code for a gradient color
                                    const starFraction = (user.average_stars % 1) * 100 // get the decimal part of the star rating
                                    const gradientColor = interpolateColors(
                                      '#fe643d',
                                      '#D3D3D3',
                                      starFraction / 100,
                                    )
                                    color = gradientColor // half stars
                                  }
                                  return (
                                    <div
                                      key={i}
                                      style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '10%',
                                        backgroundColor: color,
                                        marginRight: '5px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <span style={{ color: '#ffffff' }}>&#9733;</span>
                                    </div>
                                  )
                                })}
                                ({user.review_count} reviews)
                              </h4>
                              <h4 style = {{color: 'black', margin: '0px 20px 10px 10px'}}>
                                Elite Years: {user.elite}
                              </h4>
                          </Box>
                        </NavLink>
                      ))}
              </Container>
              <Pagination
                  count={63000}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  style={{marginLeft: "25%"}}
              />
            </div>
        </div>
      );
}