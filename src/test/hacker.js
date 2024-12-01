function algoHashing(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return ({['Password Hash']: hash });
}

// Character set for brute force (you can customize this)
const charSet = 'abcdefghijklmnopqrstuvwxyz0123456789';

// Brute force function
function bruteForce(targetHash, maxLen) {
    function generateStrings(prefix, maxLen) {
        if (prefix.length > maxLen) return null;

        // Check if current string's hash matches the target
        let result = algoHashing(prefix);
        console.log(result);
        if (result['Password Hash'] === targetHash) {
            console.log('Match found:', prefix);
            return prefix;
        }

        for (let char of charSet) {
            if (generateStrings(prefix + char, maxLen)) {
                return prefix + char;
            }
        }
        return null;
    }

    for (let len = 1; len <= maxLen; len++) {
        const found = generateStrings('', len);
        if (found) return found;
    }

    console.log('No match found.');
    return null;
}

// Example usage
const targetHash = algoHashing('test')['Password Hash'];
bruteForce(targetHash, 4);


