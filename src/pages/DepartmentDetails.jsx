import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function DepartmentDetails() {
  const { department } = useParams();
const employees = useSelector((state) => state.employees.list);
  const departments = [
    "Engineering",
    "Human Resources",
    "Finance",
    "Marketing",
    "Support",
    "IT",
  ];

  const selectedDepartment = department?.toLowerCase();

  const departmentEmployees = employees.filter((employee) => {
    const empDepartment = employee.department?.toLowerCase();

    // Match existing department names
    if (selectedDepartment === "hr") {
      return empDepartment === "hr" ||
        empDepartment === "human resources";
    }

    return empDepartment === selectedDepartment;
  });

  return (
    <div className="department-details">
      <h2>{department} Department</h2>
      <p>Total employees: {departmentEmployees.length}</p>

      {departmentEmployees.length > 0 ? (
        departmentEmployees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <h3>{employee.firstName} {employee.lastName}</h3>
            <p>Email: {employee.email}</p>
            <p>Department: {employee.department}</p>
          </div>
        ))
      ) : (
        <p>No employees found in this department.</p>
      )}
    </div>
  );
}

export default DepartmentDetails;
