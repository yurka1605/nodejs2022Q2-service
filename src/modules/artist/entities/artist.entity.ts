import { v4 as uuidv4 } from 'uuid';

export class ArtistEntity {
  id: string;
  name: string;
  grammy?: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, {
      id: uuidv4(),
      ...partial,
    });
  }
}
