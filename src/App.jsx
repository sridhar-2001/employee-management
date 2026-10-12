import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEmployees } from "./redux/employeeSlice";
import useFetchData from "./hooks/useFetchData";
import { useTheme } from "./context/ThemeContext";

import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import Departments from "./pages/Departments";
import DepartmentDetails from "./pages/DepartmentDetails";
import About from "./pages/About";
import Notification from "./components/Notification";

import "./App.css";

function App() {
    const dispatch = useDispatch();
    const { theme } = useTheme();

const { data, loading, error } = useFetchData(
  "https://dummyjson.com/users?limit=30"
);

useEffect(() => {
  if (!loading && !error) {
    const employees = data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      department: user.company?.department || "General",
      status: "Active",
      joinDate: "",
      age: user.age,
    }));

    dispatch(setEmployees(employees));
  }
}, [data, loading, error, dispatch]);
  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <Notification />

      <div className="main-layout">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/add" element={<AddEmployee />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />

            <Route path="/departments" element={<Departments />}>
              <Route
                path=":department"
                element={<DepartmentDetails />}
              />
            </Route>

            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
