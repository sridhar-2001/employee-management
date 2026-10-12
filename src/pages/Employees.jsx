
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { deleteEmployee } from "../redux/employeeSlice";

function Employees() {
    const employees = useSelector(
        (state) => state.employees.list
    );

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") || "";

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const departments = [
        ...new Set(employees.map((emp) => emp.department)),
    ];

    const filteredEmployees = employees.filter((emp) => {
        const name = `${emp.firstName || ""} ${emp.lastName || ""}`;
        const matchesSearch =
            name.toLowerCase().includes(search.toLowerCase()) ||
            emp.email.toLowerCase().includes(search.toLowerCase());

        const matchesDepartment =
            !department || emp.department === department;

        return matchesSearch && matchesDepartment;
    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredEmployees.length / pageSize)
    );

    const safePage = Math.min(currentPage, totalPages);

    const startIndex = (safePage - 1) * pageSize;
    const visibleEmployees = filteredEmployees.slice(
        startIndex,
        startIndex + pageSize
    );

    function updateSearch(value) {
        setSearchParams((previous) => {
            if (value) {
                previous.set("search", value);
            } else {
                previous.delete("search");
            }

            return previous;
        });

        setCurrentPage(1);
    }

    function updateDepartment(value) {
        setSearchParams((previous) => {
            if (value) {
                previous.set("department", value);
            } else {
                previous.delete("department");
            }

            return previous;
        });

        setCurrentPage(1);
    }

    function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (confirmDelete) {
            dispatch(deleteEmployee(id));
        }
    }

    return (
        <div>
            <div className="page-heading">
                <div>
                    <h1>Employees</h1>
                    <p>Manage your employee records.</p>
                </div>

                <Link to="/employees/add" className="primary-button">
                    + Add Employee
                </Link>
            </div>

            <div className="employee-toolbar">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => updateSearch(e.target.value)}
                />

                <select
                    value={department}
                    onChange={(e) => updateDepartment(e.target.value)}
                >
                    <option value="">All Departments</option>

                    {departments.map((dept) => (
                        <option key={dept} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>
            </div>

            <div className="section-card">
                <p>
                    Showing {filteredEmployees.length} employee(s)
                </p>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleEmployees.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.firstName} {emp.lastName}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.status}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link to={`/employees/${emp.id}`}>
                                                View
                                            </Link>

                                            <Link to={`/employees/${emp.id}?edit=true`}>
                                                Edit
                                            </Link>

                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(emp.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {visibleEmployees.length === 0 && (
                                <tr>
                                    <td colSpan="6">No employees found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <button
                        disabled={safePage === 1}
                        onClick={() => setCurrentPage(safePage - 1)}
                    >
                        Previous
                    </button>

                    <span>
                        Page {safePage} of {totalPages}
                    </span>

                    <button
                        disabled={safePage === totalPages}
                        onClick={() => setCurrentPage(safePage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Employees;
