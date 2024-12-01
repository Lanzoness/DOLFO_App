export function algoSearch(array, searchString) {
    if (!array.length || !searchString) return [];

    const searchTerms = searchString.toLowerCase().split(' ');
    const n = array.length;
    const m = searchTerms.length;

    // Initialize DP matrix to store match scores for each item and search term
    const dp = Array(n).fill().map(() => Array(m).fill(-1));

    // Fill DP matrix with match scores
    for (let i = 0; i < n; i++) {
        const item = array[i];
        if (!item || !item['Item Name']) continue;

        const itemName = item['Item Name'].toLowerCase();
        const itemDescription = (typeof item.Description === 'string') ? item.Description.toLowerCase() : '';

        // Calculate and memoize scores for each search term
        for (let j = 0; j < m; j++) {
            const term = searchTerms[j];
            let termScore = 0;

            // Exact match with full search string
            if (itemName.includes(searchString.toLowerCase())) {
                termScore += 100;
            }

            // Individual term matches
            if (itemName.includes(term)) {
                termScore += 50;
            }
            if (itemDescription && itemDescription.includes(term)) {
                termScore += 25;
            }

            dp[i][j] = termScore;
        }
    }

    // Calculate final scores using DP matrix
    const results = array.map((item, i) => {
        if (!item || !item['Item Name']) return { item, score: 0 };

        // Sum up scores from DP matrix for this item
        const totalScore = dp[i].reduce((sum, score) => {
            return sum + (score > 0 ? score : 0);
        }, 0);

        return { item, score: totalScore };
    });

    // Sort and filter results
    return results
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(result => result.item);
}
