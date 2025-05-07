// App.js
import React from 'react';
import './App.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Landing from './Pages/Landing';
import Form from './DataEntry/Form';
import Customers from './Pages/Customers';
import Profile from './Pages/Profile';
import Edit from './Pages/Edit';
import Banking from './Pages/Bank/Banking';
import ItemForm from './Pages/ItemForm ';
import SignupForm from './Pages/SignupForm ';
import LoginForm from './Pages/LoginForm';
import ProtectedRoute from './Pages/ProtectedRoute';
import EmployeeSalary from './Pages/Employee/EmployeeSalary';
import EmpRegistration from './Pages/Employee/EmpRegistration';
import Photo from './Pages/Employee/Photo';
import VacationRegister from './Pages/Employee/VacationRegister';
import PenaltyRegister from './Pages/Employee/PenaltyRegister';
import EmployeeTable from './Pages/Employee/EmployeeTable';
import TestLayout from './Pages/TestLayout';
import EmployeeActions from './Pages/Employee/EmployeeActions';
import EmpSalTable from './Pages/Employee/EmpSalTable';
import BankEdit from './Pages/Bank/BankEdit';
import AssetManagement from './Pages/Assets/AssetManagement';
import AssetRegister from './Pages/Assets/AssetRegister';
import AssetActions from './Pages/Assets/AssetActions';
import EmpSalaryEdit from './Pages/Employee/EmpSalaryEdit';
import SalaryCertificate from './Pages/Employee/SalaryCertificate';
import OfferLetter from './Pages/Employee/OfferLetter';
import CreateInvoice from './Pages/Invoice/CreateInvoice';
import Invoicelist from './Pages/Invoice/Invoicelist';
import ViewInvoice from './Pages/Invoice/ViewInvoice';
import EditInvoice from './Pages/Invoice/EditInvoice';
import ExpenseForm from './Pages/Expenses/ExpenseForm';
import ExpenseTable from './Pages/Expenses/ExpenseTable';
import ExpenseEditor from './Pages/Expenses/ExpenseEditor';


const App = () => {
  return (
    <>
       <Routes>
       <Route path="/" element={<ProtectedRoute element={<LoginForm />} />} />
{/* Main Routes */}
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/signup" element={<SignupForm/>} />
            <Route path="/Landing" element={<ProtectedRoute element={<Landing />} />} />
            <Route path="/partner/Customers" element={<ProtectedRoute element={<Customers />} />} />
            <Route path="/accounts/item" element={<ProtectedRoute element={<ItemForm />} />} />
            <Route path="/Banking" element={<ProtectedRoute element={<Banking />} />} />
            <Route path="/assetmanagement" element={<ProtectedRoute element={<AssetManagement />} />} />
            <Route path="/AssetRegister" element={<ProtectedRoute element={<AssetRegister />} />} />

{/* Sub Routes */}
            <Route path="/Dataentry" element={<ProtectedRoute element={<Form />} />} />
            <Route path="/partner/consumeredit/:ID" element={<ProtectedRoute element={<Edit />} />} />
{/* Top Nav Routes */}
            <Route path="/Profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/employee/employeesal" element={<ProtectedRoute element={<EmployeeSalary />} />} />
            <Route path="/emp/empregistration" element={<ProtectedRoute element={<EmpRegistration />} />} />
            <Route path="/vacation" element={<ProtectedRoute element={<VacationRegister />} />} />
            <Route path="/penalty" element={<ProtectedRoute element={<PenaltyRegister />} />} />
            <Route path="/employee/employeetable" element={<ProtectedRoute element={<EmployeeTable />} />} />
            <Route path="/employee/employeesaltable" element={<ProtectedRoute element={<EmpSalTable />} />} />
            <Route path="/employee/empsaledit/:id/:month/:year" element={<ProtectedRoute element={<EmpSalaryEdit />} />} />
            <Route path="/photo" element={<ProtectedRoute element={<Photo />} />} />
            <Route path="/test" element={<ProtectedRoute element={<TestLayout />} />} />
            <Route path="/bankedit/:id" element={<ProtectedRoute element={<BankEdit />} />} />
            <Route path="/employeeactions/:id" element={<ProtectedRoute element={<EmployeeActions />} />} />
            <Route path="/assetactions/:id" element={<ProtectedRoute element={<AssetActions />} />} />
            <Route path="/employee/salarycertificate" element={<ProtectedRoute element={<SalaryCertificate />} />} />
            <Route path="/employee/empofferletter" element={<ProtectedRoute element={<OfferLetter />} />} />
{/* Invoice  */}
            <Route path="/Newinvoice" element={<ProtectedRoute element={<CreateInvoice />} />} />
            <Route path="/accounts/Newinvoicelist" element={<ProtectedRoute element={<Invoicelist />} />} />
            <Route path="/invoices/:id" element={<ProtectedRoute element={<ViewInvoice />} />} />
            <Route path="/invoice/edit/:id" element={<ProtectedRoute element={<EditInvoice />} />} />

 {/*Expense Modules final;  */}
            <Route path="/newexpense" element={<ProtectedRoute element={<ExpenseForm />} />} />
            <Route path="/purchase/expensetable" element={<ProtectedRoute element={<ExpenseTable />} />} />
            <Route path="/expenses/edit/:id" element={<ProtectedRoute element={<ExpenseEditor />} />} />

        </Routes>
        </>
  );
};

export default App;
