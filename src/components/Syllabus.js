import React, { useEffect, useState } from "react";
import { Button, Col, Container, Navbar, Row, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Syllabus() {
    const navigate = useNavigate();
    const [subjects, setSubject] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // State lưu thông tin user đăng nhập
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Lấy thông tin user đã lưu ở localStorage khi đăng nhập thành công
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        // Lấy danh sách môn học
        fetch("http://localhost:9000/subjects")
            .then(response => response.json())
            .then(result => setSubject(result))
            .catch(err => console.error(err));
    }, []);

    // Xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    // Tìm kiếm môn học theo Tên hoặc Mã môn
    const filterSubjects = subjects.filter(s => {
        const matchesName = s.name.toLowerCase().startsWith(searchTerm.toLowerCase());
        const matchesCode = s.code.toLowerCase().startsWith(searchTerm.toLowerCase());
        return matchesName || matchesCode;
    });

    return (
        <div>
            {/* Header / Navbar */}
            <Navbar style={{ backgroundColor: "orange" }} variant="dark" className="px-4 mb-4">
                <Navbar.Brand>
                    <strong>FPT Education Learning Material Portal</strong>
                </Navbar.Brand>

                {/* Hiển thị "Hello, ABCD" ở góc tận cùng bên phải nhờ class "ms-auto" */}
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
                            onChange={(e) => setSearchTerm(e.target.value)}
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
