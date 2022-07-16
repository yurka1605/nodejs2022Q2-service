import { v4 as uuidv4 } from 'uuid';

export class TrackEntity {
  id: string;
  name: string;
  artistId?: string | null;
  albumId?: string | null;
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, {
      id: uuidv4(),
      ...partial,
    });
  }
}
