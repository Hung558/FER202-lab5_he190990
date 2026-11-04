import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        fetch("http://localhost:9000/accounts")
            .then((res) => res.json())
            .then((accounts) => {
                const user = accounts.find(
                    (acc) => acc.email === email && acc.password === password
                );

                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate("/syllabus");
                } else {
                    alert("Email hoặc mật khẩu không chính xác!");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Lỗi kết nối server! Hãy chắc chắn json-server đang chạy ở port 9000.");
            });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Row className="w-100 justify-content-center">
                <Col md={5}>
                    <Card className="shadow-sm">

                        <Card.Body>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label><strong>Email</strong></Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Nhập email..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label><strong>Password</strong></Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập password..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mt-2">
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
