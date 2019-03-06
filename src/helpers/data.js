import roles from "../assets/data/roles.json";
import employees from "../assets/data/employees.json";
import shop from "../assets/data/config.json";
import shifts from "../assets/data/shifts.json";

const initialShifts = shifts.map(shift => {
  const role = roles.find(role => role.id === shift.role_id);
  const employee = employees.find(employee => employee.id === shift.employee_id);

  const newShiftObj = Object.assign({}, shift, {role, employee});
  delete newShiftObj.role_id;
  delete newShiftObj.employee_id;

  return newShiftObj;
});

export {
  roles,
  employees,
  shop,
  initialShifts as shifts
};
