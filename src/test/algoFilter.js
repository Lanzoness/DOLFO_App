export const algoFilter = {

  filterItems(data, filters) {
    let filteredData = [...data];
    
    if (filters.selectedCategory) {
      filteredData = this.filterByCategory(filteredData, filters.selectedCategory);
    }

    if (filters.startDate || filters.endDate) {
      filteredData = this.filterByDateRange(filteredData, filters.startDate, filters.endDate, filters.dateSortOrder);
    }
    
    return filteredData;
  },

  filterByDateRange(data, startDate, endDate, dateSortOrder = 'desc') {
    // First filter by date range
    const filteredData = data.filter(item => {
      const itemDate = new Date(item['Date Submitted']);
      return (!startDate || itemDate >= startDate) &&
             (!endDate || itemDate <= endDate);
    });

    // Then sort the filtered data
    return this.quickSort(filteredData, dateSortOrder);
  },

  quickSort(data, dateSortOrder) {
    if (data.length <= 1) {
      return data;
    }

    const pivotIndex = Math.floor(data.length / 2);
    const pivot = new Date(data[pivotIndex]['Date Submitted']);
    const left = [];
    const right = [];

    for (let i = 0; i < data.length; i++) {
      if (i === pivotIndex) continue;
      
      const currentDate = new Date(data[i]['Date Submitted']);
      
      // Fix the comparison logic for proper sorting
      if (dateSortOrder === 'asc') {
        if (currentDate < pivot) {
          left.push(data[i]);
        } else {
          right.push(data[i]);
        }
      } else { // 'desc'
        if (currentDate > pivot) {
          left.push(data[i]);
        } else {
          right.push(data[i]);
        }
      }
    }

    if (dateSortOrder === 'asc') {
      return [...this.quickSort(left, dateSortOrder), data[pivotIndex], ...this.quickSort(right, dateSortOrder)];
    } else {
      return [...this.quickSort(left, dateSortOrder), data[pivotIndex], ...this.quickSort(right, dateSortOrder)];
    }
  },

  filterByCategory(data, category) {
    return data.filter(item => item.Category === category);
  }
};

export default algoFilter;
