export const algoFilter = {

  filterItems(data, filters) {
    let filteredData = [...data];
    
    if (filters.selectedCategory) {
      filteredData = this.filterByCategory(filteredData, filters.selectedCategory);
    }

    if (filters.startDate || filters.endDate) {
      filteredData = this.filterByDateRange(filteredData, filters.startDate, filters.endDate);
    }
    
    return filteredData;
  },

  filterByDateRange(data, startDate, endDate) {
    if (data.length <= 1) {
      return data.filter(item => {
        const itemDate = new Date(item['Date Submitted']);
        return (!startDate || itemDate >= startDate) &&
               (!endDate || itemDate <= endDate);
      });
    }

    const mid = Math.floor(data.length / 2);
    const left = this.filterByDateRange(data.slice(0, mid), startDate, endDate);
    const right = this.filterByDateRange(data.slice(mid), startDate, endDate);

    return this.merge(left, right);
  },

  merge(left, right) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
      const dateLeft = new Date(left[indexLeft]['Date Submitted']);
      const dateRight = new Date(right[indexRight]['Date Submitted']);

      if (dateLeft <= dateRight) {
        result.push(left[indexLeft]);
        indexLeft++;
      } else {
        result.push(right[indexRight]);
        indexRight++;
      }
    }

    // Concatenate remaining elements
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
  },

  filterByCategory(data, category) {
    return data.filter(item => item.Category === category);
  }
};

export default algoFilter;
