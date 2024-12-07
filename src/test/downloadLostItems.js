import RNFS from 'react-native-fs';
import { db } from '../services/firebaseConfig';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export async function downloadLostItems() {
    console.log('Document Directory Path:', RNFS.DocumentDirectoryPath);
    try {
        const itemsRef = collection(db, 'Items');
        // Create a query with where clause and orderBy
        const q = query(
            itemsRef, 
            where('Is Retrieved', '==', 0),
            orderBy('Date Submitted', 'desc')
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        const items = [];
        snapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() });
        });

        // Convert items to JSON
        const jsonContent = JSON.stringify(items, null, 2);

        // Define the file path to save in the 'database' directory
        const directoryPath = `${RNFS.DocumentDirectoryPath}/database`;
        const filePath = `${directoryPath}/lostItems.json`;

        // Ensure the directory exists
        await RNFS.mkdir(directoryPath);

        // Write the JSON content to a file
        await RNFS.writeFile(filePath, jsonContent, 'utf8');
        console.log(`File has been saved to ${filePath}`);
    } catch (error) {
        console.error('Error downloading lost items:', error);
    }
}
