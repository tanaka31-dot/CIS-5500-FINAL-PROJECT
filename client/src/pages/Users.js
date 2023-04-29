import { useEffect, useState } from 'react'
import { Box, Container, Pagination } from '@mui/material'
import '../components/styles.css'

const config = require('../config.json')

export default function UserPage() {
    const pageSize = 40
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(
          `http://${config.server_host}:${config.server_port}/users?page=${page}&page_size=${pageSize}`,
        )
          .then((res) => res.json())
          .then((resJson) => setUsers(resJson))
      }, [page, pageSize])



    const bodyStyle = {
        backgroundImage: `url('./glass.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100vh',
        color: 'white',
        margin: 0,
        paddingTop: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }

      const userCard = {
        width: '45%',
        height: '180px',
        border: '1px solid lightgrey',
        borderRadius: '10px',
        margin: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        transition: 'all .2s ease-in-out',
      }
    
      const userCardHover = {
        transform: 'scale(1.05)',
        boxShadow: '2px 2px 10px lightgrey',
      }
    
      const flexFormat = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }

      return (
        <Container style={{flexFormat}}>
            
        </Container>
      );
}