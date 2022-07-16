import { v4 as uuidv4 } from 'uuid';

export class AlbumEntity {
  id: string;
  name: string;
  year?: number;
  artistId?: string | null;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, {
      id: uuidv4(),
      ...partial,
    });
  }
}
