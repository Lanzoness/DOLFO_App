export function algoSearch(array, searchString) {
    const searchTerms = searchString.toLowerCase().split(' ');

    // Base case for recursion
    if (array.length <= 1) {
        if (array.length === 0) return [];
        return calculateScore(array[0], searchTerms, searchString) > 0 ? [array[0]] : [];
    }

    // Divide
    const mid = Math.floor(array.length / 2);
    const leftHalf = array.slice(0, mid);
    const rightHalf = array.slice(mid);

    // Conquer (recursive calls)
    const leftResults = algoSearch(leftHalf, searchString);
    const rightResults = algoSearch(rightHalf, searchString);

    // Combine results
    return mergeResults(leftResults, rightResults, searchTerms, searchString);
}

// Helper function to calculate match score for a single item
function calculateScore(item, searchTerms, originalQuery) {
    if (!item || !item['Item Name']) return 0;

    const itemName = item['Item Name'].toLowerCase();
    const itemDescription = (typeof item.Description === 'string') ? item.Description.toLowerCase() : '';
    let score = 0;

    // Exact match in name (highest priority)
    if (itemName.includes(originalQuery.toLowerCase())) {
        score += 100;
    }

    // Individual word matches
    for (let term of searchTerms) {
        if (itemName.includes(term)) {
            score += 50;
        }
        if (itemDescription && itemDescription.includes(term)) {
            score += 25;
        }
    }

    return score;
}

// Helper function to merge and sort results
function mergeResults(left, right, searchTerms, originalQuery) {
    const merged = [...left, ...right];
    
    // Calculate scores for sorting
    const scoredResults = merged.map(item => ({
        item,
        score: calculateScore(item, searchTerms, originalQuery)
    }));

    // Sort by score
    scoredResults.sort((a, b) => b.score - a.score);

    // Filter out zero scores and return items
    return scoredResults
        .filter(result => result.score > 0)
        .map(result => result.item);
}
