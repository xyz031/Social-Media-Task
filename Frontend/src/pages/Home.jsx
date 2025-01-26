import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Spinner, Modal } from "react-bootstrap";
import axios from "axios";
import { PersonFill, Images, Link45deg } from "react-bootstrap-icons";

const Home = () => {
  const [userdata, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlegetUserdata = async () => {
    try {
      const response = await axios.get("https://social-media-task.onrender.com/user/api/getUser");
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlegetUserdata();
  }, []);

  return (
    <Container className="py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h1 className="text-center mb-5 display-5 fw-bold" style={{ color: "#1a73e8" }}>
        <PersonFill className="me-2" />
        User Profiles
      </h1>

      {/* Image Zoom Modal */}
      <Modal show={selectedImage !== null} onHide={() => setSelectedImage(null)} centered size="lg">
        <Modal.Body className="p-0 bg-dark">
          <img 
            src={selectedImage} 
            alt="Zoomed" 
            className="img-fluid w-100 h-auto"
            style={{ cursor: 'zoom-out' }}
            onClick={() => setSelectedImage(null)}
          />
        </Modal.Body>
      </Modal>

      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="g-4 justify-content-center">
          {userdata.length > 0 ? (
            userdata.map((user) => (
              <Col key={user._id} xl={4} lg={4} md={6} sm={12}>
                <Card className="shadow-lg border-0 rounded-4 overflow-hidden hover-shadow">
                  <Card.Header className="bg-primary text-white py-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-white rounded-circle p-2 me-3">
                        <PersonFill size={24} className="text-primary" />
                      </div>
                      <div>
                        <Card.Title className="mb-0 fs-5 fw-bold">{user.username}</Card.Title>
                        <Card.Subtitle className="mt-1 text-white-50 small d-flex align-items-center">
                          <Link45deg size={16} className="me-1" />
                          {user.socialhandle}
                        </Card.Subtitle>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-3 bg-light">
                    {user.userprofile.length > 0 ? (
                      <Row className="g-2">
                        {user.userprofile.map((imageUrl, index) => (
                          <Col xs={4} key={index}>
                            <div className="ratio ratio-1x1">
                              <img
                                src={imageUrl}
                                alt={`Profile ${index + 1}`}
                                className="img-fluid rounded-3 object-fit-cover cursor-pointer"
                                style={{ transition: "transform 0.2s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                onClick={() => setSelectedImage(imageUrl)}
                              />
                            </div>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <div className="text-center py-4 text-muted">
                        <Images size={32} className="mb-2" />
                        <p className="mb-0">No images uploaded</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <div className="text-muted">
                <PersonFill size={48} className="mb-3" />
                <h4 className="fw-normal">No profiles found</h4>
              </div>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Home;