import React, { useEffect, useState } from "react";
import { Button, Col, Container, Navbar, Row, Table, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Syllabus() {
    const navigate = useNavigate();
    const [subjects, setSubject] = useState([]);
    // const [searchTerm, setSearchTerm] = useState("");

    const [user, setUser] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("name") || "";



    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        fetch("http://localhost:9000/subjects")
            .then(response => response.json())
            .then(result => setSubject(result))
            .catch(err => console.error(err));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const filterSubjects = subjects.filter(s => {
        const matchesName = s.name.toLowerCase().startsWith(searchTerm.toLowerCase());
        const matchesCode = s.code.toLowerCase().startsWith(searchTerm.toLowerCase());
        return matchesName || matchesCode;
    });

    return (
        <div>
            <Navbar style={{ backgroundColor: "orange" }} variant="dark" className="px-4 mb-4">
                <Navbar.Brand>
                    <strong>FPT Education Learning Material Portal</strong>
                </Navbar.Brand>

                <div className="ms-auto text-white d-flex align-items-center">
                    {user ? (
                        <>
                            <span className="fw-bold me-3">Hello, {user.fullName}</span>
                            <Button variant="outline-light" size="sm" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline-light" size="sm" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    )}
                </div>
            </Navbar>

            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Syllabus Management</h2>
                </div>

                <Row className="justify-content-center">
                    <Col md={2}>
                        <Form.Select>
                            <option value="All">Code</option>
                            <option value="All">Name</option>
                        </Form.Select>
                    </Col>
                    <Col md={5} className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter keyword..."
                            value={searchTerm}
                            onChange={(e) => {
                                if (e.target.value) {
                                    searchParams.set("name", e.target.value); 
                                } else {
                                    searchParams.delete("name"); 
                                }
                                setSearchParams(searchParams);
                            }}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table bordered hover striped responsive>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Curriculum</th>
                                    <th>Semester</th>
                                    <th>Credits</th>
                                    <th>Pre-requisites</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterSubjects.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.code}</td>
                                        <td>{p.name}</td>
                                        <td>{p.curriculum}</td>
                                        <td>{p.semester}</td>
                                        <td>{p.credits}</td>
                                        <td>{Array.isArray(p.preRequisites) ? p.preRequisites.join(", ") : p.preRequisites}</td>
                                        <td>{p.description}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => navigate(`/subject/${p.id}`)}
                                            >
                                                Detail
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
