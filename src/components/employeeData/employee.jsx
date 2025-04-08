import React from 'react'
import useEmployeeData from '../../hooks/useEmployeeData';
import AddEmployeeForm from './addEmpData';
import EmployeeCard from './empCard';

const Employee = () => {
  const { employees, loading, refetch } = useEmployeeData();

  return (
    <>
    <div className="flex justify-end -mb-5 md:hidden -mt-4"> 
        <img
          src="/src/assets/logo2.jpeg"
          className="w-20 h-20 md:hidden block"
        />
      </div>
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="md:text-4xl text-2xl font-bold mb-4 text-gray-700">🤵 Employee Management</h2>
      <AddEmployeeForm onAdd={refetch} />
      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No employees added yet.</p>
      ) : (
        <div className="grid gap-4">
          <h2 className="font-bold text-gray-700 text-2xl">Employees List</h2>
          {employees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Employee;