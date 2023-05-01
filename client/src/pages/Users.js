import { useEffect, useState } from 'react'
import { Box, Container, Pagination } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Navbar from '../components/NavBar'
import '../components/styles.css'
// import profile_icon from './profile_icon.png'

const config = require('../config.json')

export default function UsersPage() {
    const pageSize = 20
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(users.length / pageSize)


    useEffect(() => {
        fetch(
          `http://${config.server_host}:${config.server_port}/users?page=${page}&page_size=${pageSize}`,
        )
          .then((res) => res.json())
          .then((resJson) => setUsers(resJson))
      }, [page, pageSize])



    const bodyStyle = {
        backgroundImage: `url(${require('./skyline.jpg')})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'center center',
      }

      const userCard = {
        width: '100%',
        height: '50%',
        border: '1px solid lightgrey',
        borderRadius: '60px',
        margin: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        transition: 'all .2s ease-in-out',
        backgroundColor : '#cceeff'
      }

      const handlePageChange = (e, newPage) => {
        // Can always go to previous page (TablePagination prevents negative pages)
        // but only fetch next page if we haven't reached the end (currently have full page of data)
        if (newPage < page && users.length === pageSize) {
          // Note that we set newPage + 1 since we store as 1 indexed but the default pagination gives newPage as 0 indexed
          setPage(newPage + 1)
        }
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
        boxShadow: '2px 2px 10px lightgrey',
      }
    
      const flexFormat = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }

      return (
        <div>
          <Navbar/>
            <div style = {bodyStyle}>
              <Container style={flexFormat}>
                  {users
                      .slice((page - 1) * pageSize, page * pageSize)
                      .map((user) => (
                        <NavLink to = {`/users/${user.user_id}`} style={{ textDecoration: 'none' }}>
                          <Box key={user.user_id} style={userCard} sx = {{ ':hover': userCardHover }}>                          
                              <img src={require('./profile_icon.png')} width= '50px' height = '50px' style={{verticalAlign: 'middle'}} alt=''/>
                              <h2 style={{ color: 'blue', margin: '20px 20px 10px', borderRight: '6px light blue'}}>
                                {user.name}
                              </h2>
                              <h2 style = {{color: 'black', margin: '20px 20px 10px'}}>
                                Joined: {user.yelping_since}
                              </h2>
                              <h2 style = {{color: 'black', margin: '20px 20px 10px'}}>
                                Reviews: {user.review_count}
                              </h2>
                              <h2 style = {{color: 'black', margin: '20px 20px 10px'}}>
                                Elite: {user.elite}
                              </h2>
                              <h2 style = {{color: 'black', margin: '20px 20px 10px'}}>
                                Fans: {user.fans}
                              </h2>
                              <div style={{color: "black",  marginTop: '10px', display: 'flex' }}>
                                Average Stars: {user.average_stars}
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
                              </div>
                          </Box>
                        </NavLink>
                      ))}
              </Container>
              <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
              />
            </div>
        </div>
      );
}