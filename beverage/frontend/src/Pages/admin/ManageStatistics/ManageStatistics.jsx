import React from 'react'
import './ManageStatistics.css'
const ManageStatistics = () => {
  return (
    <div class="statistics-container">
      <aside>
        <div class="logo">Revenue</div>
        <div class="filters">
          <h3>Filters</h3>
          <label for="date-range">Date Range</label>
          <input type="text" id="date-range" />
          <label for="category">Category</label>
          <input type="text" id="category" />
          <button>Apply Filters</button>
        </div>
      </aside>
      <main>
        <div class="card">
          <h3>Monthly Revenue</h3>
          <div class="chart" id="monthly-revenue"></div>
        </div>
        <div class="card">
          <h3>Revenue by Product</h3>
          <div class="chart" id="revenue-by-product"></div>
        </div>
        <div class="card">
          <h3>Quarterly Growth</h3>
          <div class="chart" id="quarterly-growth"></div>
        </div>
        <div class="card">
          <h3>Revenue Sources</h3>
          <div class="chart" id="revenue-sources"></div>
        </div>
      </main>
    </div>
  )
}

export default ManageStatistics