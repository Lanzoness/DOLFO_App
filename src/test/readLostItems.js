import RNFS from 'react-native-fs';

export async function readLostItems() {
    try {
        // Define the file path to read from the 'database' directory
        const filePath = `${RNFS.DocumentDirectoryPath}/database/lostItems.json`;

        // Check if the file exists
        const fileExists = await RNFS.exists(filePath);
        if (!fileExists) {
            console.log('The file lostItems.json does not exist.');
            return;
        }

        // Read the JSON content from the file
        const fileContents = await RNFS.readFile(filePath, 'utf8');

        // Parse the JSON content
        const items = JSON.parse(fileContents);

        // Output the contents to the terminal
        //console.log('Contents of lostItems.json:', items);
        return items;
    } catch (error) {
        console.error('Error reading lost items:', error);
    }
}
