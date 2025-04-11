import React from "react";

const EmployeeCard = ({ employee }) => {
  return (
    <div className="border rounded-md shadow p-4 bg-white flex gap-4">
      <img
        src={employee.photoUrl ? employee.photoUrl : "/logo2.jpeg"}
        alt="Employee"
        className="w-20 h-20 object-fill rounded-full border"
      />

      <div>
        <h3 className="text-lg font-bold">{employee.name}</h3>
        <p>
          <strong>ID:</strong> {employee.empId}
        </p>
        <p>
          <strong>Govt ID:</strong> {employee.govtId || "N/A"}
        </p>
        <p>
          <strong>Salary:</strong> ₹ {employee.salary}
        </p>
        <p>
          <strong>Joining Date:</strong> {employee.joiningDate}
        </p>
        <p>
          <strong>Balance:</strong> ₹ {employee.balanceAmt || 0}
        </p>
        <p>
          <strong>Address:</strong> {employee.address || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;
