export function algoSearchDP(array, searchString) {
    const maxDistance = 3; // Maximum edit distance we'll consider as a "match"
    const results = [];

    // Convert search string to lowercase
    const searchTerm = searchString.toLowerCase();

    for (let i = 0; i < array.length; i++) {
        const itemName = array[i]['Item Name'].toLowerCase();
        const distance = editDistance(searchTerm, itemName);
        
        // If the edit distance is within our threshold, consider it a match
        if (distance <= maxDistance) {
            results.push({
                item: array[i],
                distance: distance
            });
        }
    }

    // Sort results by edit distance (closest matches first)
    results.sort((a, b) => a.distance - b.distance);
    
    // Debug log for results
    console.log('Matching items:', results.map(result => result.item));

    // Return array of matching items
    return results.map(result => result.item);
}

function editDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    // Initialize first row and column
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    // Fill the dp table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // deletion
                    dp[i][j - 1],     // insertion
                    dp[i - 1][j - 1]  // substitution
                );
            }
        }
    }

    return dp[m][n];
}
