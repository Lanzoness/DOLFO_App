export const algoFilter = {

  filterItems(data, filters) {
    let filteredData = [...data];
    
    // Filter by category first
    if (filters.selectedCategory) {
      console.log('Filtering by category:', filters.selectedCategory);
      filteredData = this.filterByCategory(filteredData, filters.selectedCategory);
    }

    // Then filter by status if it exists
    if (filters.selectedStatus) {
      console.log('Filtering by status:', filters.selectedStatus);
      filteredData = this.filterByStatus(filteredData, Number(filters.selectedStatus));
    }

    // Finally filter by date range
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
  },

  filterByStatus(data, status) {
    // If status is undefined or NaN, return the original data
    if (status === undefined || isNaN(status)) {
      return data;
    }
    
    console.log('Filtering by status:', status);
    console.log('Data before filter:', data.map(item => ({
      name: item['Item Name'],
      isRetrieved: item['Is Retrieved']
    })));
    
    const filtered = data.filter(item => {
      // Ensure both values are numbers for comparison
      const itemStatus = parseInt(item['Is Retrieved']);
      const filterStatus = parseInt(status);
      
      console.log(`Comparing item "${item['Item Name']}":`, 
        `itemStatus (${typeof itemStatus}): ${itemStatus}`, 
        `filterStatus (${typeof filterStatus}): ${filterStatus}`
      );
      
      return itemStatus === filterStatus;
    });

    console.log('Data after filter:', filtered.map(item => ({
      name: item['Item Name'],
      isRetrieved: item['Is Retrieved']
    })));
    
    return filtered;
  }
};

export default algoFilter;
