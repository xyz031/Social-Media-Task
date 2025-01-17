import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";

const Home = () => {
  const [userdata, setUserData] = useState([]);

  // Function to fetch user data
  const handlegetUserdata = async () => {
    try {
      const response = await axios.get("https://social-media-task.onrender.com/user/api/getUser");
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    handlegetUserdata();
  }, []);

  return (
    <Container>
      <h1 className="text-center">Users</h1>
      <div className="d-flex justify-content-between flex-wrap">
        {userdata.length > 0 &&
          userdata.map((user) => (
            <Card key={user._id} style={{ width: "20rem", marginBottom: "5px" }}>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>{user.username}</Card.Title>
                <Card.Title style={{ fontWeight: "bold" }}>{user.socialhandle}</Card.Title>
              </Card.Body>
              <div className="d-flex justify-content-start p-3">
                {user.userprofile.length > 0 &&
                  user.userprofile.map((imageUrl, index) => (
                    <Card.Img
                      key={index}
                      style={{
                        width: "100px",
                        height: "100px",
                        padding: "3px",
                        marginTop: "3px",
                      }}
                      src={imageUrl} // Directly use the Cloudinary URL
                      alt={`User profile ${index + 1}`}
                    />
                  ))}
              </div>
            </Card>
          ))}
      </div>
    </Container>
  );
};

export default Home;
