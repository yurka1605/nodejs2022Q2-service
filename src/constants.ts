export enum DataBaseEntity {
  USERS = 'users',
  ARTISTS = 'artists',
  ALBUMS = 'albums',
  TRACKS = 'tracks',
  FAVOURITES = 'favorites',
};

export const initialDataBase = {
  [DataBaseEntity.ARTISTS]: {},
  [DataBaseEntity.ALBUMS]: {},
  [DataBaseEntity.TRACKS]: {},
  [DataBaseEntity.USERS]: {},
  [DataBaseEntity.FAVOURITES]: {
    [DataBaseEntity.ARTISTS]: {},
    [DataBaseEntity.ALBUMS]: {},
    [DataBaseEntity.TRACKS]: {},
  },
}