import { AlbumEntity } from "src/album/entities/album.entity";
import { ArtistEntity } from "src/modules/artist/entities/artist.entity";
import { TrackEntity } from "src/track/entities/track.entity";

export interface FavsEntity {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
