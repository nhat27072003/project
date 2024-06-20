import React, { useContext, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './ManageStatisticsStore.css';
import { StoreGetrevenueCategory, storeGetRevenue } from '../../../services/revenue';
import { UserContext } from '../../../Context/UserContext';

Chart.register(ChartDataLabels);

const ManageStatisticsStore = () => {
  const { user, authenicateUser } = useContext(UserContext);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
  const [yearRevenueData, setYearRevenueData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [startDate, setStartDate] = useState({ year: '', month: '', day: '' });
  const [endDate, setEndDate] = useState({ year: '', month: '', day: '' });
  const [monthlyChartInstance, setMonthlyChartInstance] = useState(null);
  const [yearChartInstance, setYearChartInstance] = useState(null);
  const [categoryInstance, setCategoryInstance] = useState(null);

  const fetchRevenueData = async (start, end) => {
    try {
      const monthResult = await storeGetRevenue(user.userId, 'month', start, end);
      const yearResult = await storeGetRevenue(user.userId, 'year', start, end);
      const categoryResult = await StoreGetrevenueCategory(user.userId, start, end);
      if (monthResult.EC === 0 || yearResult.EC === 0 || categoryResult.EC === 0) {
        setMonthlyRevenueData(monthResult.DT);
        setYearRevenueData(yearResult.DT);
        setCategoryData(categoryResult.DT);

      } else {
        console.error('Failed to fetch revenue data:', monthResult.EM);
      }
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };
  useEffect(() => {
    const checkUserAndFetchData = async () => {
      if (!user) {
        await authenicateUser();
      }
      fetchRevenueData();
    }

    checkUserAndFetchData();
  }, [user.userId]);

  const createChart = (ctx, type, data, options) => {
    return new Chart(ctx, { type, data, options });
  };

  const chartOptions = (type) => {
    return {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Revenue'
          }
        },
        x: {
          title: {
            display: true,
            text: type
          }
        }
      },
      plugins: {
        datalabels: {
          display: false
        }
      }
    }
  };

  useEffect(() => {
    const ctx = document.getElementById('monthly-revenue').getContext('2d');

    if (monthlyChartInstance) {
      monthlyChartInstance.destroy();
    }

    const data = {
      labels: monthlyRevenueData && monthlyRevenueData.map(item => item.Month),
      datasets: [{
        label: 'Monthly Revenue',
        data: monthlyRevenueData && monthlyRevenueData.map(item => (+item.TotalRevenue * 1000)),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }]
    };

    setMonthlyChartInstance(createChart(ctx, 'bar', data, chartOptions('month')));
  }, [monthlyRevenueData]);

  useEffect(() => {
    const ctx = document.getElementById('year-revenue').getContext('2d');

    if (yearChartInstance) {
      yearChartInstance.destroy();
    }

    const data = {
      labels: yearRevenueData && yearRevenueData.map(item => item.Year),
      datasets: [{
        label: 'Yearly Revenue',
        data: yearRevenueData && yearRevenueData.map(item => (+item.TotalRevenue * 1000)),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }]
    };

    setYearChartInstance(createChart(ctx, 'line', data, chartOptions('year')));

  }, [yearRevenueData]);

  useEffect(() => {
    const ctx = document.getElementById('revenue-by-product').getContext('2d');

    if (categoryInstance) {
      categoryInstance.destroy();
    }

    const colors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ];

    const data = {
      labels: ['Cà phê', 'Nước giải khát', 'Trà sữa'],
      datasets: [{
        label: 'Revenue by Product',
        data: categoryData && categoryData.map(item => (+item.TotalRevenue * 1000)),
        backgroundColor: colors.slice(0, categoryData.length),
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }]
    };

    const options = {
      layout: {
        padding: 20
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        datalabels: {
          formatter: (value, context) => {
            const total = context.chart.data.datasets[0].data.reduce((sum, current) => sum + current, 0);
            const percentage = (value / total * 100).toFixed(2) + '%';
            return percentage;
          },
          color: '#000',
          anchor: 'end',
          align: 'start',
          offset: -20,
          borderWidth: 2,
          borderColor: '#fff',
          borderRadius: 25,
          backgroundColor: (context) => context.dataset.backgroundColor,
          padding: 6
        }
      }
    };

    setCategoryInstance(createChart(ctx, 'pie', data, options));

  }, [categoryData]);

  const handleDateChange = (setter) => (e) => {
    const [year, month, day] = e.target.value.split('-');
    setter({ year, month, day });
  };

  const handleApplyFilters = () => {
    const start = new Date(`${startDate.year}-${startDate.month}-${startDate.day}`);
    const end = new Date(`${endDate.year}-${endDate.month}-${endDate.day}`);

    if (end > start) {
      const formattedStartDate = `${startDate.year}-${startDate.month}-${startDate.day}`;
      const formattedEndDate = `${endDate.year}-${endDate.month}-${endDate.day}`;
      fetchRevenueData(formattedStartDate, formattedEndDate);
    } else {
      alert('End date must be after start date.');
    }
  };

  const resetData = () => {
    fetchRevenueData();
  };

  return (
    <div className="statistics-container">
      <header>
        <h2>Manage revenue</h2>
      </header>
      <aside>
        <div className="filters">
          <h3>Filters</h3>
          <button onClick={resetData}>Từ trước đến nay</button>
          <label htmlFor="start-date">Start Date</label>
          <input type="date" id="start-date" onChange={handleDateChange(setStartDate)} />
          <label htmlFor="end-date">End Date</label>
          <input type="date" id="end-date" onChange={handleDateChange(setEndDate)} />
          <button onClick={handleApplyFilters}>Apply Filters</button>
        </div>
      </aside>
      <main>
        <div className="card">
          <h3>Monthly Revenue</h3>
          <div className="chart">
            <canvas id="monthly-revenue"></canvas>
          </div>
        </div>
        <div className="card">
          <h3>Revenue by Product</h3>
          <div className="chart">
            <canvas id="revenue-by-product"></canvas>
          </div>
        </div>
        <div className="card">
          <h3>Yearly Revenue</h3>
          <div className="chart">
            <canvas id="year-revenue"></canvas>
          </div>
        </div>
        <div className="card">
          <h3>Revenue Sources</h3>
          <div className="chart" id="revenue-sources"></div>
        </div>
      </main>
    </div>
  );
};

export default ManageStatisticsStore;
