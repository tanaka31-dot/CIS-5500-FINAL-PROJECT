import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import userImg from './Sample_User_Icon.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
// import { NavLink } from 'react-router-dom'
// import {
//   faLightbulb,
//   faFaceGrinSquint,
//   faFaceSurprise,
//   faThumbsUp,
// } from '@fortawesome/free-regular-svg-icons'

const config = require('../config.json');

export default function UserInfoPage() {
    const { user_id } = useParams();

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/user/${user_id}`)
          .then(res => res.json())
          .then(resJson => setUserData(resJson));
    }, [user_id]);

    return(
        <Container>
            <Stack direction='row' justify='center'>
                <img
                    key={userData.user_id}
                    src={userImg}
                    alt={"User Card"}
                    style={{
                        marginTop: '40px',
                        marginRight: '40px',
                        marginBottom: '40px'
                    }}
                />
                <Stack>
                    <h1 style={{ fontSize: 64 }}>{userData.name}</h1>
                </Stack>
            </Stack>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell key='Name'>Name</TableCell>
                        <TableCell key='Friends'>Friends</TableCell>
                        <TableCell key='Fans'>Fans</TableCell>
                        <TableCell key='Average Stars'>Average Stars</TableCell>
                        <TableCell key='Elite'>Elite</TableCell>
                        <TableCell key='Useful'>Useful</TableCell>
                        <TableCell key='Funny'>Funny</TableCell>
                        <TableCell key='Cool'>Cool</TableCell>
                        <TableCell key='Yelping Since'>Yelping Since</TableCell>
                        <TableCell key='Plays'>Plays</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            userData.map((row, user_id) =>
                            
                            <TableRow key={userData[0].album_id}>
                                <TableCell key='Name'>{row.name}</TableCell>
                                <TableCell key='Friends'>{row.friends}</TableCell>
                                <TableCell key='Fans'>{row.fans}</TableCell>
                                <TableCell key='Average Stars'>{row.avg_stars}</TableCell>
                                <TableCell key='Elite'>{row.elite}</TableCell>
                                <TableCell key='Useful'>{row.useful}</TableCell>
                                <TableCell key='Funny'>{row.funnt}</TableCell>
                                <TableCell key='Cool'>{row.cool}</TableCell>
                                <TableCell key='Yelping Since'>{row.yelping_since}</TableCell>
                                <TableCell key='Plays'>{row.plays}</TableCell>
                            </TableRow>

                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );

}