import { Exclude } from "class-transformer";

export class Artist {
  id: string;
  name: string;
  grammy?: boolean;

  @Exclude()
  favsId?: string;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
