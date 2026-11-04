import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function SubjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [curriculum, setCurriculum] = useState("");
    const [semester, setSemester] = useState(0);
    const [credits, setCredits] = useState(0);
    const [preRequisites, setPreRequisites] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        fetch("http://localhost:9000/subjects")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Không thể kết nối đến server");
                }
                return response.json();
            })
            .then((data) => {
                const found = data.find((item) =>
                    String(item.id).toLowerCase() === String(id).toLowerCase() ||
                    item.id === `sub_0${id}` ||
                    item.id === `sub_${id}` ||
                    String(item.id).endsWith(String(id))
                );

                if (found) {
                    setCode(found.code || "");
                    setName(found.name || "");
                    setCurriculum(found.curriculum || "");
                    setSemester(found.semester || 0);
                    setCredits(found.credits || 0);

                    if (Array.isArray(found.preRequisites)) {
                        setPreRequisites(found.preRequisites.join(", "));
                    } else {
                        setPreRequisites(found.preRequisites || "");
                    }

                    setDescription(found.description || "");
                    setError("");
                } else {
                    setError(`Không tìm thấy môn học nào với ID: "${id}"`);
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Lỗi kết nối API! Hãy chắc chắn rằng json-server đang chạy ở port 9000.");
            });
    }, [id]);

    return (
        <div>
            <Navbar style={{ backgroundColor: "orange" }} variant="dark" className="px-4 mb-4">
                <Navbar.Brand>
                    <strong>Subject Detail Management</strong>
                </Navbar.Brand>
                {user && (
                    <div className="ms-auto text-white fw-bold">
                        Hello, {user.fullName}
                    </div>
                )}
            </Navbar>

            <Container className="pb-5">
                <Button
                    variant="primary"
                    onClick={() => navigate("/syllabus")}
                    className="mb-3"
                >
                    Back to List
                </Button>

                {error && <Alert variant="danger">{error}</Alert>}

                <Card>
                    <Card.Header>
                        <h3>Subject Information</h3>
                    </Card.Header>

                    <Card.Body>
                        <Form>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Code</strong></Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={code}
                                            readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Name</strong></Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label><strong>Curriculum</strong></Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={curriculum}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Semester</strong></Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={semester}
                                            readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Credits</strong></Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={credits}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label><strong>Pre-requisites</strong></Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={preRequisites}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col>
                                    <Form.Group>
                                        <Form.Label><strong>Description</strong></Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            value={description}
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Button variant="primary">Edit</Button>
                                </Col>

                                <Col>
                                    <Button variant="warning">Delete</Button>
                                </Col>

                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}


//giờ 