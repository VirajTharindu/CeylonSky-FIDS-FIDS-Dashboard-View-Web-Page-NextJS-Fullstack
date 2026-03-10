import getDB from '@/db/pouchdb';
import { Flight } from '@/types/flight';

export class FlightService {
  static async getAllFlights(): Promise<Flight[]> {
    const db = await getDB();
    if (!db) return [];
    try {
      const result = await db.allDocs({ include_docs: true });
      return (result.rows as any[])
        .map((row: any) => row.doc as unknown as Flight)
        .filter((doc: any) => doc !== null);
    } catch (err) {
      console.error('Failed to fetch from PouchDB:', err);
      return [];
    }
  }

  static async updateFlight(flight: Flight): Promise<void> {
    const db = await getDB();
    if (!db) return;
    try {
      const existing = await db.get(flight._id).catch(() => null);
      if (existing) {
        flight._rev = existing._rev;
      }
      await db.put(flight);
    } catch (err) {
      console.error('Failed to update flight in PouchDB:', err);
      throw err;
    }
  }
}
