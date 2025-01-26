import React, { useState } from 'react';
import { Button, Form, Container, Card, Spinner, Row, Col } from 'react-bootstrap';
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        socialhandle: '',
    });
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        setFiles(Array.from(event.target.files));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };

        const formdata = new FormData();
        formdata.append("username", formData.username);
        formdata.append("socialhandle", formData.socialhandle);
        files.forEach(file => formdata.append("userimg", file));

        try {
            const response = await axios.post(
                "https://social-media-task.onrender.com/user/api/register",
                formdata,
                config
            );

            if (response.status === 200) {
                setFormData({ username: '', socialhandle: '' });
                setFiles([]);
                toast.success("Submission successful!");
            }
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("Submission failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Row className="justify-content-center">
                <Col xl={5} lg={6} md={8} sm={10}>
                    <Card className="shadow-lg border-0 rounded-lg overflow-hidden">
                        <Card.Header className="bg-primary text-white text-center py-4">
                            <h2 className="mb-0">Create Profile</h2>
                            <p className="text-white-50 mb-0 mt-1">Share your social media presence</p>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-secondary small mb-2">Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="py-2 border-light"
                                        style={{ borderRadius: '8px' }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="text-secondary small mb-2">Social Handle</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="socialhandle"
                                        value={formData.socialhandle}
                                        onChange={handleChange}
                                        placeholder="@username"
                                        className="py-2 border-light"
                                        style={{ borderRadius: '8px' }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="text-secondary small mb-2">Upload Photos</Form.Label>
                                    <div className="border-2 border-dashed border-light rounded-3 p-3 text-center">
                                        <Form.Control
                                            type="file"
                                            onChange={handleFileChange}
                                            multiple
                                            className="d-none"
                                            id="fileInput"
                                            required
                                        />
                                        <label 
                                            htmlFor="fileInput" 
                                            className="btn btn-outline-primary btn-sm mb-2"
                                        >
                                            Choose Files
                                        </label>
                                        <p className="text-muted small mb-0">
                                            {files.length > 0 
                                                ? `${files.length} files selected` 
                                                : 'PNG, JPG up to 5MB'}
                                        </p>
                                    </div>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 py-2 fw-bold"
                                    style={{ borderRadius: '8px' }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Spinner animation="border" size="sm" className="me-2" />
                                    ) : (
                                        'Submit Profile'
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {files.length > 0 && (
                        <div className="mt-5">
                            <h5 className="text-center text-muted mb-4">Preview Images</h5>
                            <Row className="g-3">
                                {files.map((file, index) => (
                                    <Col key={index} xs={6} sm={4} md={3}>
                                        <div className="position-relative ratio ratio-1x1">
                                            <Card className="shadow-sm h-100 overflow-hidden">
                                                <Card.Img
                                                    variant="top"
                                                    src={URL.createObjectURL(file)}
                                                    className="object-fit-cover"
                                                    style={{ transition: 'transform 0.2s' }}
                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                />
                                            </Card>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Register;