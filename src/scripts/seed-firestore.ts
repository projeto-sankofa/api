
import { db } from '../lib/firebase';
import { AIResult, AIResultClassificationEnum } from '../types';

const seedFirestore = async () => {
  console.log('Starting to seed Firestore...');

  const aiResults: AIResult[] = [];
  const classifications = Object.values(AIResultClassificationEnum);

  for (let i = 0; i < 2000; i++) {
    const classification = classifications[Math.floor(Math.random() * classifications.length)];
    const confidence = Math.random();
    const text = `This is a mock text for seeding purposes. Entry number ${i + 1}.`;
    const source = `mock-source-${i + 1}`;
    const collectedAt = new Date();

    aiResults.push({
      classification,
      confidence,
      text,
      source,
      collectedAt,
    });
  }

  const collectionRef = db.collection('ai_results');
  const batch = db.batch();

  aiResults.forEach(result => {
    const docRef = collectionRef.doc();
    batch.set(docRef, result);
  });

  await batch.commit();

  console.log('Firestore seeding completed successfully!');
};

seedFirestore().catch(error => {
  console.error('Error seeding Firestore:', error);
});
