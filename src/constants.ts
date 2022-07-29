export enum DataBaseEntity {
  USERS = 'users',
  ARTIST = 'artist',
  ALBUMS = 'albums',
  TRACKS = 'tracks',
  FAVOURITES = 'favorites',
}

export const initialDataBase = {
  [DataBaseEntity.ARTIST]: {},
  [DataBaseEntity.ALBUMS]: {},
  [DataBaseEntity.TRACKS]: {},
  [DataBaseEntity.USERS]: {},
  [DataBaseEntity.FAVOURITES]: {
    [DataBaseEntity.ARTIST]: {},
    [DataBaseEntity.ALBUMS]: {},
    [DataBaseEntity.TRACKS]: {},
  },
};
