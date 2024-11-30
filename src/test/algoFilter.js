export const algoFilter = {
  cache: new Map(),
  MAX_CACHE_SIZE: 20,

  filterItems(data, filters) {
    const cacheKey = this.generateCacheKey(filters);
    
    if (this.cache.has(cacheKey)) {
      console.log('Using cached filter results');
      return this.cache.get(cacheKey);
    }

    let filteredData = [...data];
    
    if (filters.startDate || filters.endDate) {
      filteredData = this.filterByDateRange(filteredData, filters.startDate, filters.endDate);
    }

    if (filters.selectedCategory) {
      filteredData = this.filterByCategory(filteredData, filters.selectedCategory);
    }

    this.addToCache(cacheKey, filteredData);
    
    return filteredData;
  },

  generateCacheKey(filters) {
    return JSON.stringify({
      startDate: filters.startDate?.toISOString(),
      endDate: filters.endDate?.toISOString(),
      category: filters.selectedCategory
    });
  },

  filterByDateRange(data, startDate, endDate) {
    return data.filter(item => {
      const itemDate = new Date(item['Date Submitted']);
      if (startDate && itemDate < startDate) return false;
      if (endDate && itemDate > endDate) return false;
      return true;
    });
  },

  filterByCategory(data, category) {
    return data.filter(item => item.Category === category);
  },

  addToCache(key, value) {
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
};

export default algoFilter;
