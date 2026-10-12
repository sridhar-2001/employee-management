
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>MAIN MENU</h3>

      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/employees">Employees</NavLink>
      <NavLink to="/employees/add">Add Employee</NavLink>
      <NavLink to="/departments">Departments</NavLink>
      <NavLink to="/about">About</NavLink>
    </aside>
  );
}

export default Sidebar;
