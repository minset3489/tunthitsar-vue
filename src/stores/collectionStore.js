// collectionStore.js
import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';
import { db } from '../firebase/config';
import { doc, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    documents: null,
    document: null,
    error: null,
  }),

  actions: {
    async getCollection(c, { field, direction, conditions }) {
      return new Promise((resolve, reject) => {
        let colRef = collection(db, c);

        // Add where clause based on conditions
        if (conditions) {
          conditions.forEach(condition => {
            const { field, operator, value } = condition;
            colRef = query(colRef, where(field, operator, value));
          });
        }
  
        // Add sorting options based on the selected field and direction
        if (field && direction) {
          colRef = query(colRef, orderBy(field, direction));
        }
  
        const unsub = onSnapshot(colRef, (snapshot) => {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
  
          // update values
          this.documents = results;
          resolve(results);
        },
        (err) => {
          console.error('Error fetching documents:', err.message);
          this.error = err.message;
          reject(err.message);
        }
        );
  
        // Watch for component unmount to unsubscribe from the snapshot
        watchEffect((onInvalidate) => {
          onInvalidate(() => unsub());
        });

      });

    },

    async getDocument(collectionName, documentId) {
        const documentRef = doc(db, collectionName, documentId); // Use 'doc' function
  
        const unsub = onSnapshot(
          documentRef,
          (snapshot) => {
            if (snapshot.exists()) {
              this.document = { ...snapshot.data(), id: snapshot.id };
              this.error = null; // Reset error on successful snapshot
            } else {
              console.error('Document does not exist');
              this.error = 'Document not found';
            }
          },
          (err) => {
            console.error('Error fetching document:', err.message);
            this.error = err.message;
          }
        );
  
        watchEffect((onInvalidate) => {
          onInvalidate(() => unsub());
        });
      },
  },
});
