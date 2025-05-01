import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/SideBar';

import Overview from '../pages/Overview';
import Savings from '../pages/Savings';
import TransactionsPage from '../pages/TransactionsPage';
import Investments from '../pages/Investments';
import BudgetPlan from '../pages/BudgetPlan';

import NotFound from '../pages/NotFound';

const sidebarItems = [
  { name: 'Overview', path: '/Overview' },
  { name: 'Savings', path: '/Savings' },
  { name: 'Transactions', path: '/Transactions' },
  { name: 'Investments', path: '/Investments' },
  { name: 'Budget Plan', path: '/Budget-Plan' },

];

const MainLayout: React.FC = () => {
  return (
    <div className="flex bg-base-200 ">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/Overview" element={<Overview />} /> 
          <Route path="/Savings" element={<Savings />} />
          <Route path="/Transactions" element={<TransactionsPage />} /> 
          <Route path="/Investments" element={<Investments />} />
          <Route path="/Budget-Plan" element={<BudgetPlan />} /> 
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout;