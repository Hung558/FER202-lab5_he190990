import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Syllabus from './components/Syllabus';
import SubjectDetail from './components/SubjectDetail';
import Login from './components/Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/syllabus" element={<Syllabus />}></Route>
                <Route path="/subject/:id" element={<SubjectDetail />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
