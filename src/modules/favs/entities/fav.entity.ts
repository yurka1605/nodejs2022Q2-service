import { AlbumEntity } from "src/modules/album/entities/album.entity";
import { ArtistEntity } from "src/modules/artist/entities/artist.entity";
import { TrackEntity } from "src/modules/track/entities/track.entity";

export interface FavsEntity {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
