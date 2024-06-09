import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/navBar";
import Registrar from "@/pages/registrar";
import Listar from "@/pages/listar";
import Update from "@/pages/update";
import ProtectedRoute from "@/components/protectRoute";
import Login from "@/pages/login";


export default function Home() {
    return (
        <Router>
            <header>
                <NavBar />
            </header>
            <main className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                {<h1>Home</h1>}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/registrar"
                        element={
                            <ProtectedRoute>
                                <Registrar />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/listar"
                        element={
                            <ProtectedRoute>
                                <Listar />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/atualizar/:itemId"
                        element={
                            <ProtectedRoute>
                                <Update />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </Router>
    );
}
