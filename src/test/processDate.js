export const processDate = (dateString, isLongForm) => {
    // Creates a new Date object from the ISO string (e.g., "2024-11-26T19:11:00.000Z")
    const date = new Date(dateString);
    
    // Array of 3-letter month abbreviations, indexed 0-11 January is index 0, December is index 11
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Gets the month number (0-11) from the date and uses it to look up the corresponding 3-letter abbreviation from our months array
    const month = months[date.getMonth()];
    
    // Gets the day of the month (1-31)
    const day = date.getDate();
    
    // Gets the 4-digit year
    const year = date.getFullYear();
  
    // If isLongForm is true, could return a different format
    // Currently returns the same format either way
    if (!isLongForm) {
      return `${month} ${day}, ${year}`;
    }
    else{
        return `${month} ${day}, ${year} - ${date.getHours()}:${date.getMinutes()}`;
    }
  };