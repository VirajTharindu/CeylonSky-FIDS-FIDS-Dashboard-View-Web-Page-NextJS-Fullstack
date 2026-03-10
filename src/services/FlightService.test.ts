import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FlightService } from './FlightService';
import getDB from '@/db/pouchdb';

vi.mock('@/db/pouchdb', () => ({
  default: vi.fn(),
}));

describe('FlightService', () => {
  let mockDB: any;

  beforeEach(() => {
    mockDB = {
      allDocs: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
    };
    (getDB as any).mockResolvedValue(mockDB);
  });

  it('should fetch all flights', async () => {
    const mockFlights = [
      { doc: { _id: 'CX101', airline: 'Cathay Pacific' } },
      { doc: { _id: 'CX102', airline: 'Cathay Pacific' } },
    ];
    mockDB.allDocs.mockResolvedValue({ rows: mockFlights });

    const flights = await FlightService.getAllFlights();
    expect(flights).toHaveLength(2);
    expect(flights[0]._id).toBe('CX101');
  });

  it('should update a flight', async () => {
    const mockFlight: any = { _id: 'CX101', airline: 'Cathay Pacific' };
    mockDB.get.mockResolvedValue({ _id: 'CX101', _rev: 'rev1' });
    mockDB.put.mockResolvedValue({ ok: true });

    await FlightService.updateFlight(mockFlight);
    expect(mockDB.put).toHaveBeenCalledWith(expect.objectContaining({
      _id: 'CX101',
      _rev: 'rev1',
    }));
  });
});
