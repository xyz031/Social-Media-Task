import React, { useState } from 'react';
import { Button, Form, Container, Card, Spinner } from 'react-bootstrap';
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
                toast.success("Image successfully uploaded");
            }
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("Invalid Details or Upload Failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container style={{ marginTop: "10px" }}>
            <h1 className="text-center">User Submission form</h1>
            <div className="d-flex flex-column align-items-center">
                <Form className="w-50" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your Name"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Social media handle</Form.Label>
                        <Form.Control
                            type="text"
                            name="socialhandle"
                            value={formData.socialhandle}
                            onChange={handleChange}
                            placeholder="Enter your Social media handle"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Image</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleFileChange}
                            multiple
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                    </Button>
                </Form>
            </div>

            {files.length > 0 && (
                <Container className="mt-2 d-flex justify-content-center">
                    {files.map((file, index) => (
                        <Card key={index} style={{ width: '70px', height: '70px', margin: '5px' }}>
                            <Card.Img variant="top" src={URL.createObjectURL(file)} />
                        </Card>
                    ))}
                </Container>
            )}
        </Container>
    );
};

export default Register;
