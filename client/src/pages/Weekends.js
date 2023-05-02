import { useEffect, useState } from 'react'
import { Box, Container} from '@mui/material'
import { NavLink } from 'react-router-dom'
import '../components/styles.css'

const config = require('../config.json')

export default function Weekends() {
  const [businesses, setbusinesses] = useState([])

  useEffect(() => {
    fetch(
      `http://${config.server_host}:${config.server_port}/weekends`,
    )
      .then((res) => res.json())
      .then((resJson) => setbusinesses(resJson))
  }, [])

  const businessCard = {
    width: '45%',
    height: '180px',
    border: '1px solid lightgrey',
    borderRadius: '10px',
    margin: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // align items to the top
    transition: 'all .2s ease-in-out',
  }

  const businessCardHover = {
    transform: 'scale(1.05)',
    boxShadow: '2px 2px 10px lightgrey',
  }

  const flexFormat = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
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

  return (
    <div>
      <Container style={flexFormat}>
        {businesses && Array.isArray(businesses) && businesses.map((business, index) => (
          <Box
            key={business.business_id}
            style={
              index % 2 === 0
                ? { ...businessCard, background: 'white' }
                : { ...businessCard, background: 'white' }
            }
            sx={{ ':hover': businessCardHover }}
          >
            <NavLink
              to={`/business/${business.business_id}`}
              style={{ textDecoration: 'underline' }}
            >
              <h3
                style={{
                  margin: '0',
                  alignSelf: 'flex-start',
                  color: '#000000',
                }}
              >
                {business.name}
              </h3>
            </NavLink>
            <p style={{ margin: '0', alignSelf: 'flex-start' }}>
              {business.address}
            </p>

            <div style={{ marginTop: '10px', display: 'flex' }}>
              {Array.from({ length: 5 }, (_, i) => {
                let color = 'lightgrey'
                if (i < Math.floor(business.rating)) {
                  color = '#fe643d' // full stars
                } else if (
                  i === Math.floor(business.rating) &&
                  business.rating.toFixed(1) % 1 !== 0
                ) {
                  // add code for a gradient color
                  const starFraction = (business.rating % 1) * 100 // get the decimal part of the star rating
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
        ))}


      </Container>
    </div>
  )
}