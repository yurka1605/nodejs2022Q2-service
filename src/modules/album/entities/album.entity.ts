import { Exclude } from 'class-transformer';

export class Album {
  id: string;
  name: string;
  year?: number;
  artistId?: string | null;

  @Exclude()
  favsId?: string;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
