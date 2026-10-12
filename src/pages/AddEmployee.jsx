
import EmployeeForm from "../components/EmployeeForm";

function AddEmployee() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Add Employee</h1>
          <p>Enter the details to register a new employee.</p>
        </div>
      </div>

      <EmployeeForm />
    </div>
  );
}

export default AddEmployee;
