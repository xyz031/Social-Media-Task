import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [userdata, setUserData] = useState([]);
    const [socialhandle, setsocialhandle] = useState("")

    const handlegetUserdata = async () => {
        const response = await axios.get("https://social-media-task.onrender.com/user/api/getUser").then((res) => res).catch((error) => error);
     

        if (response.status == 200) {
            setUserData(response.data)
            // console.log(response.data)
        }
    }

    useEffect(() => {
        handlegetUserdata()
    }, [])
    return (
        <>
            <Container>
                <h1 className='text-center' >Users</h1>
                <div className='d-flex justify-content-between flex-wrap'>
                    {
                        userdata.length > 0 && userdata.map((element) => {
                            return (
                                <>
                                    <Card style={{ width: "20rem", marginBottom: "5px" }}>
                                        <Card.Body>
                                            <Card.Title style={{ fontWeight: "bold" }}>{element.username}</Card.Title>
                                            <Card.Title style={{ fontWeight: "bold" }}>{element.socialhandle}</Card.Title>
                                        </Card.Body>
                                        <div className='d-flex justify-content-start p-3'   >
                                            {
                                                element.userprofile.length > 0 && element.userprofile.map((ele) => {
                                                    return (
                                                        <>
                                                           <Link to={`/uploads/${ele}`}> <Card.Img style={{ width: "full", height: "100px",padding:"3px", marginTop: "3px" }} src={`https://social-media-task.onrender.com/uploads/${ele}`} /></Link>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Card>
                                </>
                            )
                        })
                    }

                </div>
            </Container>
        </>
    )
}

export default Home