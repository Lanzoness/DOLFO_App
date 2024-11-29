export const filterByDateRange = (data, startDate, endDate) => {
    return data.filter(item => {
      const itemDate = new Date(item['Date Submitted']);
      if (startDate && itemDate < startDate) return false;
      if (endDate && itemDate > endDate) return false;
      return true;
    });
  };
  
  export const filterByCategory = (data, selectedCategory) => {
    return data.filter(item => item.Category === selectedCategory);
  };
  
  export const sortByDate = (data, dateSortOrder) => {
    return data.sort((a, b) => {
      const dateA = new Date(a['Date Submitted']);
      const dateB = new Date(b['Date Submitted']);
      return dateSortOrder === 'asc' 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
};