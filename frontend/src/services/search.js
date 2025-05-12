import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const searchUsers = async (searchTerm) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('firstName', '>=', searchTerm),
      where('firstName', '<=', searchTerm + '\uf8ff')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};

export const searchClubs = async (searchTerm) => {
  try {
    const clubsRef = collection(db, 'clubs');
    const q = query(
      clubsRef,
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error searching clubs:', error);
    return [];
  }
};

export const searchOpportunities = async (searchTerm) => {
  try {
    const opportunitiesRef = collection(db, 'opportunities');
    const q = query(
      opportunitiesRef,
      where('title', '>=', searchTerm),
      where('title', '<=', searchTerm + '\uf8ff')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error searching opportunities:', error);
    return [];
  }
}; 