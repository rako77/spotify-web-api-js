/// <reference path="./typings/spotify-api.d.ts" />
/// <reference path="./typings/spotify-web-api.d.ts" />
/* global module */
'use strict';

import 'whatwg-fetch';

/**
 * Class representing the API
 */
export class SpotifyWebApi implements SpotifyWebApiJs.SpotifyWebApiJs {
  private static readonly BASE_URI : string = 'https://api.spotify.com/v1';
  private ACCESS_TOKEN?: string = undefined;

  /**
   * Fetches a resource through a generic GET request.
   *
   * @param {string} url The URL to be fetched
   * @return {Promise<Object>}
   */
  public getGeneric = function<T>(this: SpotifyWebApi, url : string) : Promise<T> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: url
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Fetches information about the current user.
   * See [Get Current User's Profile](https://developer.spotify.com/web-api/get-current-users-profile/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<SpotifyApi.CurrentUsersProfileResponse>} Null if a callback is provided, a `Promise` object otherwise
   */
  public getMe = function(this: SpotifyWebApi) : Promise<SpotifyApi.CurrentUsersProfileResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me`
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Fetches current user's saved tracks.
   * See [Get Current User's Saved Tracks](https://developer.spotify.com/web-api/get-users-saved-tracks/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<SpotifyApi.UsersSavedTracksResponse>}
   */
  public getMySavedTracks = function(this: SpotifyWebApi, options?: SpotifyApi.BasicQueryParameters) : Promise<SpotifyApi.UsersSavedTracksResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/tracks`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Adds a list of tracks to the current user's saved tracks.
   * See [Save Tracks for Current User](https://developer.spotify.com/web-api/save-tracks-user/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
   * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public addToMySavedTracks = function(this: SpotifyWebApi, trackIds: string[]) : Promise<SpotifyApi.SaveTracksForUserResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/tracks`,
      type: 'PUT',
      postData: {ids: trackIds}
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Remove a list of tracks from the current user's saved tracks.
   * See [Remove Tracks for Current User](https://developer.spotify.com/web-api/remove-tracks-user/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
   * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public removeFromMySavedTracks = function(this: SpotifyWebApi, trackIds: string[]) : Promise<SpotifyApi.RemoveUsersSavedTracksResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/tracks`,
      type: 'DELETE',
      postData: {ids: trackIds}
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Checks if the current user's saved tracks contains a certain list of tracks.
   * See [Check Current User's Saved Tracks](https://developer.spotify.com/web-api/check-users-saved-tracks/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
   * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public containsMySavedTracks = function(this: SpotifyWebApi, trackIds: string[]) : Promise<SpotifyApi.CheckUsersSavedTracksResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/tracks/contains`,
      params: { ids: trackIds.join(',') }
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Get a list of the albums saved in the current Spotify user's "Your Music" library.
   * See [Get Current User's Saved Albums](https://developer.spotify.com/web-api/get-users-saved-albums/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getMySavedAlbums = function(this: SpotifyWebApi, options?: SpotifyApi.BasicQueryParameters) : Promise<SpotifyApi.UsersSavedAlbumsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/albums`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Save one or more albums to the current user's "Your Music" library.
   * See [Save Albums for Current User](https://developer.spotify.com/web-api/save-albums-user/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI, it is easy
   * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public addToMySavedAlbums = function(this: SpotifyWebApi, albumIds: string[]) : Promise<SpotifyApi.SaveAlbumsForUserResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/albums`,
      type: 'PUT',
      postData: {ids: albumIds}
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Remove one or more albums from the current user's "Your Music" library.
   * See [Remove Albums for Current User](https://developer.spotify.com/web-api/remove-albums-user/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI, it is easy
   * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public removeFromMySavedAlbums = function(this: SpotifyWebApi, albumIds: string[]) : Promise<SpotifyApi.RemoveAlbumsForUserResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/albums`,
      type: 'DELETE',
      postData: {ids: albumIds}
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Check if one or more albums is already saved in the current Spotify user's "Your Music" library.
   * See [Check User's Saved Albums](https://developer.spotify.com/web-api/check-users-saved-albums/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI, it is easy
   * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public containsMySavedAlbums = function(this: SpotifyWebApi, albumIds: string[]) : Promise<SpotifyApi.CheckUserSavedAlbumsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/albums/contains`,
      params: { ids: albumIds.join(',') }
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Get the current user’s top artists based on calculated affinity.
   * See [Get a User’s Top Artists](https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getMyTopArtists = function(this: SpotifyWebApi, options?: SpotifyApi.BasicQueryParameters) : Promise<SpotifyApi.UsersTopArtistsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/top/artists`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Get the current user’s top tracks based on calculated affinity.
   * See [Get a User’s Top Tracks](https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getMyTopTracks = function(this: SpotifyWebApi, options?: SpotifyApi.BasicQueryParameters) : Promise<SpotifyApi.UsersTopTracksResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/top/tracks`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Get tracks from the current user’s recently played tracks.
   * See [Get Current User’s Recently Played Tracks](https://developer.spotify.com/web-api/web-api-personalization-endpoints/get-recently-played/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getMyRecentlyPlayedTracks = function(this: SpotifyWebApi, options?: SpotifyApi.BasicQueryParameters) : Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/player/recently-played`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Adds the current user as a follower of one or more other Spotify users.
   * See [Follow Artists or Users](https://developer.spotify.com/web-api/follow-artists-users/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
   * to find their user id (e.g. spotify:user:<here_is_the_user_id>)
   * @return {Promise<Object>}
   */
  public followUsers = function(this: SpotifyWebApi, userIds: string[]) : Promise<SpotifyApi.FollowArtistsOrUsersResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/following/`,
      type: 'PUT',
      params: {
        ids: userIds.join(','),
        type: 'user'
      }
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Adds the current user as a follower of one or more artists.
   * See [Follow Artists or Users](https://developer.spotify.com/web-api/follow-artists-users/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
   * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)
   * @return {Promise<Object>}
   */
  public followArtists = function(this: SpotifyWebApi, artistIds: string[]) : Promise<SpotifyApi.FollowArtistsOrUsersResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/following/`,
      type: 'PUT',
      params: {
        ids: artistIds.join(','),
        type: 'artist'
      }
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Add the current user as a follower of one playlist.
   * See [Follow a Playlist](https://developer.spotify.com/web-api/follow-playlist/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} ownerId The id of the playlist owner. If you know the Spotify URI of
   * the playlist, it is easy to find the owner's user id
   * (e.g. spotify:user:<here_is_the_owner_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {Object} options A JSON object with options that can be passed. For instance,
   * whether you want the playlist to be followed privately ({public: false})
   * @return {Promise<Object>}
   */
  public followPlaylist = function(this: SpotifyWebApi, ownerId: string, playlistId: string, options?: Object) : Promise<SpotifyApi.FollowPlaylistReponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(ownerId) + '/playlists/' + playlistId + '/followers`,
      type: 'PUT',
      postData: {}
    };

    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Removes the current user as a follower of one or more other Spotify users.
   * See [Unfollow Artists or Users](https://developer.spotify.com/web-api/unfollow-artists-users/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
   * to find their user id (e.g. spotify:user:<here_is_the_user_id>)
   * @return {Promise<Object>}
   */
  public unfollowUsers = function(this: SpotifyWebApi, userIds: string[]) : Promise<SpotifyApi.UnfollowArtistsOrUsersResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/following/`,
      type: 'DELETE',
      params: {
        ids: userIds.join(','),
        type: 'user'
      }
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Removes the current user as a follower of one or more artists.
   * See [Unfollow Artists or Users](https://developer.spotify.com/web-api/unfollow-artists-users/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
   * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)
   * @return {Promise<Object>}
   */
  public unfollowArtists = function(this: SpotifyWebApi, artistIds: string[]) : Promise<SpotifyApi.UnfollowArtistsOrUsersResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/following/`,
      type: 'DELETE',
      params: {
        ids: artistIds.join(','),
        type: 'artist'
      }
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Remove the current user as a follower of one playlist.
   * See [Unfollow a Playlist](https://developer.spotify.com/web-api/unfollow-playlist/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} ownerId The id of the playlist owner. If you know the Spotify URI of
   * the playlist, it is easy to find the owner's user id
   * (e.g. spotify:user:<here_is_the_owner_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @return {Promise<Object>}
   */
  public unfollowPlaylist = function(this: SpotifyWebApi, ownerId: string, playlistId: string) : Promise<SpotifyApi.UnfollowPlaylistReponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(ownerId) + '/playlists/' + playlistId + '/followers`,
      type: 'DELETE'
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Checks to see if the current user is following one or more other Spotify users.
   * See [Check if Current User Follows Users or Artists](https://developer.spotify.com/web-api/check-current-user-follows/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
   * to find their user id (e.g. spotify:user:<here_is_the_user_id>)   * one is the error object (null if no error), and the second is an array of boolean values that indicate
   * whether the user is following the users sent in the request.
   * @return {Promise<Object>}
   */
  public isFollowingUsers = function(this: SpotifyWebApi, userIds: string[]) : Promise<SpotifyApi.UserFollowsUsersOrArtistsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/following/contains`,
      type: 'GET',
      params: {
        ids: userIds.join(','),
        type: 'user'
      }
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Checks to see if the current user is following one or more artists.
   * See [Check if Current User Follows](https://developer.spotify.com/web-api/check-current-user-follows/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
   * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)   * one is the error object (null if no error), and the second is an array of boolean values that indicate
   * whether the user is following the artists sent in the request.
   * @return {Promise<Object>}
   */
  public isFollowingArtists = function(this: SpotifyWebApi, artistIds: string[]) : Promise<SpotifyApi.UserFollowsUsersOrArtistsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/following/contains`,
      type: 'GET',
      params: {
        ids: artistIds.join(','),
        type: 'artist'
      }
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Check to see if one or more Spotify users are following a specified playlist.
   * See [Check if Users Follow a Playlist](https://developer.spotify.com/web-api/check-user-following-playlist/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} ownerId The id of the playlist owner. If you know the Spotify URI of
   * the playlist, it is easy to find the owner's user id
   * (e.g. spotify:user:<here_is_the_owner_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
   * to find their user id (e.g. spotify:user:<here_is_the_user_id>)   * one is the error object (null if no error), and the second is an array of boolean values that indicate
   * whether the users are following the playlist sent in the request.
   * @return {Promise<Object>}
   */
  public areFollowingPlaylist = function(this: SpotifyWebApi, ownerId: string, playlistId: string, userIds: string[]) : Promise<SpotifyApi.UsersFollowPlaylistReponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(ownerId) + '/playlists/' + playlistId + '/followers/contains`,
      type: 'GET',
      params: {
        ids: userIds.join(',')
      }
    };
    return this.checkParamsAndPerformRequest(requestData);
  };

  /**
   * Get the current user's followed artists.
   * See [Get User's Followed Artists](https://developer.spotify.com/web-api/get-followed-artists/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} [options] Options, being after and limit.   * one is the error object (null if no error), and the second is an object with a paged object containing
   * artists.
   * @returns {Promise} A promise that if successful, resolves to an object containing a paging object which contains
   * artists objects.
   */
  public getFollowedArtists = function(this: SpotifyWebApi, options?: Object) : Promise<SpotifyApi.UsersFollowedArtistsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/me/following`,
      type: 'GET',
      params: {
        type: 'artist'
      }
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  //TODO missing getFollowedUsers

  /**
   * Fetches information about a specific user.
   * See [Get a User's Profile](https://developer.spotify.com/web-api/get-users-profile/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. If you know the Spotify URI it is easy
   * to find the id (e.g. spotify:user:<here_is_the_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getUser = function(this: SpotifyWebApi, userId: string, options?: Object) : Promise<SpotifyApi.UserProfileResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/${encodeURIComponent(userId)}`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches a list of the current user's playlists.
   * See [Get a List of a User's Playlists](https://developer.spotify.com/web-api/get-list-users-playlists/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId An optional id of the user. If you know the Spotify URI it is easy
   * to find the id (e.g. spotify:user:<here_is_the_id>). If not provided, the id of the user that granted
   * the permissions will be used.
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getUserPlaylists = function(this: SpotifyWebApi, userId?: string, options?: Object) : Promise<SpotifyApi.ListOfUsersPlaylistsResponse> {
    let requestData : SpotifyWebApiJs.RequestData;
    if (typeof userId === 'string') {
      requestData = {
        url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists`
      };
    } else {
      requestData = {
        url: `${SpotifyWebApi.BASE_URI}/me/playlists`
      };
    }
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches a specific playlist.
   * See [Get a Playlist](https://developer.spotify.com/web-api/get-playlist/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. If you know the Spotify URI it is easy
   * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getPlaylist = function(this: SpotifyWebApi, userId: string, playlistId: string, options?: Object) : Promise<SpotifyApi.SinglePlaylistResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists/${playlistId}`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches the tracks from a specific playlist.
   * See [Get a Playlist's Tracks](https://developer.spotify.com/web-api/get-playlists-tracks/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. If you know the Spotify URI it is easy
   * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getPlaylistTracks = function(this: SpotifyWebApi, userId: string, playlistId: string, options?: Object) : Promise<SpotifyApi.PlaylistTrackResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId + '/tracks`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Creates a playlist and stores it in the current user's library.
   * See [Create a Playlist](https://developer.spotify.com/web-api/create-playlist/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. You may want to user the "getMe" function to
   * find out the id of the current logged in user
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public createPlaylist = function(this: SpotifyWebApi, userId: string, options?: Object) : Promise<SpotifyApi.CreatePlaylistResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists`,
      type: 'POST',
      postData: options
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Change a playlist's name and public/private state
   * See [Change a Playlist's Details](https://developer.spotify.com/web-api/change-playlist-details/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. You may want to user the "getMe" function to
   * find out the id of the current logged in user
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {Object} data A JSON object with the data to update. E.g. {name: 'A new name', public: true}
   * @return {Promise<Object>}
   */
  public changePlaylistDetails = function(this: SpotifyWebApi, userId: string, playlistId: string, data: Object) : Promise<SpotifyApi.ChangePlaylistDetailsReponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists/${playlistId}`,
      type: 'PUT',
      postData: data
    };
    return this.checkParamsAndPerformRequest(requestData, data);
  };

  /**
   * Add tracks to a playlist.
   * See [Add Tracks to a Playlist](https://developer.spotify.com/web-api/add-tracks-to-playlist/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. If you know the Spotify URI it is easy
   * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {Array<string>} uris An array of Spotify URIs for the tracks
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public addTracksToPlaylist = function(this: SpotifyWebApi, userId: string, playlistId: string, uris: string[], options?: Object) : Promise<SpotifyApi.AddTracksToPlaylistResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId + '/tracks`,
      type: 'POST',
      postData: {
        uris: uris
      }
    };
    return this.checkParamsAndPerformRequest(requestData, options, true);
  };

  /**
   * Replace the tracks of a playlist
   * See [Replace a Playlist's Tracks](https://developer.spotify.com/web-api/replace-playlists-tracks/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. If you know the Spotify URI it is easy
   * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {Array<string>} uris An array of Spotify URIs for the tracks
   * @return {Promise<Object>}
   */
  public replaceTracksInPlaylist = function(this: SpotifyWebApi, userId: string, playlistId: string, uris: string[]) : Promise<SpotifyApi.ReplacePlaylistTracksResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId + '/tracks`,
      type: 'PUT',
      postData: { uris: uris }
    };
    return this.checkParamsAndPerformRequest(requestData, {});
  };

  /**
   * Reorder tracks in a playlist
   * See [Reorder a Playlist’s Tracks](https://developer.spotify.com/web-api/reorder-playlists-tracks/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. If you know the Spotify URI it is easy
   * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {number} rangeStart The position of the first track to be reordered.
   * @param {number} insertBefore The position where the tracks should be inserted. To reorder the tracks to
   * the end of the playlist, simply set insert_before to the position after the last track.
   * @param {Object} options An object with optional parameters (range_length, snapshot_id)
   * @return {Promise<Object>}
   */
  public reorderTracksInPlaylist = function(this: SpotifyWebApi, userId: string, playlistId: string, rangeStart: number, insertBefore: number, options?: Object) : Promise<SpotifyApi.ReorderPlaylistTracksResponse> {
    /* eslint-disable camelcase */
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId + '/tracks`,
      type: 'PUT',
      postData: {
        range_start: rangeStart,
        insert_before: insertBefore
      }
    };
    /* eslint-enable camelcase */
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Remove tracks from a playlist
   * See [Remove Tracks from a Playlist](https://developer.spotify.com/web-api/remove-tracks-playlist/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. If you know the Spotify URI it is easy
   * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {Array<Object>} uris An array of tracks to be removed. Each element of the array can be either a
   * string, in which case it is treated as a URI, or an object containing the properties `uri` (which is a
   * string) and `positions` (which is an array of integers).
   * @return {Promise<Object>}
   */
  public removeTracksFromPlaylist = function(this: SpotifyWebApi, userId: string, playlistId: string, uris: Object[]) : Promise<SpotifyApi.RemoveTracksFromPlaylistResponse> {
    const dataToBeSent : object = uris.map((uri : object) => {
      if (typeof uri === 'string') {
        return { uri: uri };
      } else {
        return uri;
      }
    });

    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId + '/tracks`,
      type: 'DELETE',
      postData: { tracks: dataToBeSent }
    };
    return this.checkParamsAndPerformRequest(requestData, {});
  };

  /**
   * Remove tracks from a playlist, specifying a snapshot id.
   * See [Remove Tracks from a Playlist](https://developer.spotify.com/web-api/remove-tracks-playlist/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. If you know the Spotify URI it is easy
   * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {Array<Object>} uris An array of tracks to be removed. Each element of the array can be either a
   * string, in which case it is treated as a URI, or an object containing the properties `uri` (which is a
   * string) and `positions` (which is an array of integers).
   * @param {string} snapshotId The playlist's snapshot ID against which you want to make the changes
   * @return {Promise<Object>}
   */
  public removeTracksFromPlaylistWithSnapshotId = function(this: SpotifyWebApi, userId: string, playlistId: string, uris: Object[], snapshotId: string) : Promise<SpotifyApi.PlaylistSnapshotResponse> {
    const dataToBeSent : object = uris.map((uri : object) => {
      if (typeof uri === 'string') {
        return { uri: uri };
      } else {
        return uri;
      }
    });
    /* eslint-disable camelcase */
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId + '/tracks`,
      type: 'DELETE',
      postData: {
        tracks: dataToBeSent,
        snapshot_id: snapshotId
      }
    };
    /* eslint-enable camelcase */
    return this.checkParamsAndPerformRequest(requestData, {});
  };

  /**
   * Remove tracks from a playlist, specifying the positions of the tracks to be removed.
   * See [Remove Tracks from a Playlist](https://developer.spotify.com/web-api/remove-tracks-playlist/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} userId The id of the user. If you know the Spotify URI it is easy
   * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
   * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
   * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
   * @param {Array<number>} positions array of integers containing the positions of the tracks to remove
   * from the playlist.
   * @param {string} snapshotId The playlist's snapshot ID against which you want to make the changes
   * @return {Promise<Object>}
   */
  public removeTracksFromPlaylistInPositions = function(this: SpotifyWebApi, userId: string, playlistId: string, positions: number[], snapshotId: string) : Promise<SpotifyApi.PlaylistSnapshotResponse> {
    /* eslint-disable camelcase */
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId + '/tracks`,
      type: 'DELETE',
      postData: {
        positions: positions,
        snapshot_id: snapshotId
      }
    };
    /* eslint-enable camelcase */
    return this.checkParamsAndPerformRequest(requestData, {});
  };

  /**
   * Fetches an album from the Spotify catalog.
   * See [Get an Album](https://developer.spotify.com/web-api/get-album/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} albumId The id of the album. If you know the Spotify URI it is easy
   * to find the album id (e.g. spotify:album:<here_is_the_album_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getAlbum = function(this: SpotifyWebApi, albumId: string, options?: Object) : Promise<SpotifyApi.SingleAlbumResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/albums/${albumId}`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches the tracks of an album from the Spotify catalog.
   * See [Get an Album's Tracks](https://developer.spotify.com/web-api/get-albums-tracks/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} albumId The id of the album. If you know the Spotify URI it is easy
   * to find the album id (e.g. spotify:album:<here_is_the_album_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getAlbumTracks = function(this: SpotifyWebApi, albumId: string, options?: Object) : Promise<SpotifyApi.AlbumTracksResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/albums/' + albumId + '/tracks`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches multiple albums from the Spotify catalog.
   * See [Get Several Albums](https://developer.spotify.com/web-api/get-several-albums/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI it is easy
   * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getAlbums = function(this: SpotifyWebApi, albumIds: string[], options?: Object) : Promise<SpotifyApi.MultipleAlbumsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/albums/`,
      params: { ids: albumIds.join(',') }
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches a track from the Spotify catalog.
   * See [Get a Track](https://developer.spotify.com/web-api/get-track/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} trackId The id of the track. If you know the Spotify URI it is easy
   * to find the track id (e.g. spotify:track:<here_is_the_track_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getTrack = function(this: SpotifyWebApi, trackId: string, options?: Object) : Promise<SpotifyApi.SingleTrackResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/tracks/${trackId}`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches multiple tracks from the Spotify catalog.
   * See [Get Several Tracks](https://developer.spotify.com/web-api/get-several-tracks/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
   * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getTracks = function(this: SpotifyWebApi, trackIds: string[], options?: Object) : Promise<SpotifyApi.MultipleTracksResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/tracks/`,
      params: { ids: trackIds.join(',') }
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches an artist from the Spotify catalog.
   * See [Get an Artist](https://developer.spotify.com/web-api/get-artist/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
   * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getArtist = function(this: SpotifyWebApi, artistId: string, options?: Object) : Promise<SpotifyApi.SingleArtistResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/artists/${artistId}`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches multiple artists from the Spotify catalog.
   * See [Get Several Artists](https://developer.spotify.com/web-api/get-several-artists/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
   * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getArtists = function(this: SpotifyWebApi, artistIds: string[], options?: Object) : Promise<SpotifyApi.MultipleArtistsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/artists/`,
      params: { ids: artistIds.join(',') }
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches the albums of an artist from the Spotify catalog.
   * See [Get an Artist's Albums](https://developer.spotify.com/web-api/get-artists-albums/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
   * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getArtistAlbums = function(this: SpotifyWebApi, artistId: string, options?: Object) : Promise<SpotifyApi.ArtistsAlbumsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/artists/' + artistId + '/albums`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches a list of top tracks of an artist from the Spotify catalog, for a specific country.
   * See [Get an Artist's Top Tracks](https://developer.spotify.com/web-api/get-artists-top-tracks/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
   * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
   * @param {string} countryId The id of the country (e.g. ES for Spain or US for United States)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getArtistTopTracks = function(this: SpotifyWebApi, artistId: string, countryId: string, options?: Object) : Promise<SpotifyApi.ArtistsTopTracksResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/artists/' + artistId + '/top-tracks`,
      params: { country: countryId }
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches a list of artists related with a given one from the Spotify catalog.
   * See [Get an Artist's Related Artists](https://developer.spotify.com/web-api/get-related-artists/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
   * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getArtistRelatedArtists = function(this: SpotifyWebApi, artistId: string, options?: Object) : Promise<SpotifyApi.ArtistsRelatedArtistsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/artists/' + artistId + '/related-artists`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches a list of Spotify featured playlists (shown, for example, on a Spotify player's "Browse" tab).
   * See [Get a List of Featured Playlists](https://developer.spotify.com/web-api/get-list-featured-playlists/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getFeaturedPlaylists = function(this: SpotifyWebApi, options?: Object) : Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/browse/featured-playlists`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches a list of new album releases featured in Spotify (shown, for example, on a Spotify player's "Browse" tab).
   * See [Get a List of New Releases](https://developer.spotify.com/web-api/get-list-new-releases/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getNewReleases = function(this: SpotifyWebApi, options?: Object) : Promise<SpotifyApi.ListOfNewReleasesResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/browse/new-releases`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player's "Browse" tab).
   * See [Get a List of Categories](https://developer.spotify.com/web-api/get-list-categories/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getCategories = function(this: SpotifyWebApi, options?: Object) : Promise<SpotifyApi.MultipleCategoriesResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/browse/categories`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Get a single category used to tag items in Spotify (on, for example, the Spotify player's "Browse" tab).
   * See [Get a Category](https://developer.spotify.com/web-api/get-category/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} categoryId The id of the category. These can be found with the getCategories function
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getCategory = function(this: SpotifyWebApi, categoryId: string, options?: Object) : Promise<SpotifyApi.SingleCategoryResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/browse/categories/${categoryId}`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Get a list of Spotify playlists tagged with a particular category.
   * See [Get a Category's Playlists](https://developer.spotify.com/web-api/get-categorys-playlists/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} categoryId The id of the category. These can be found with the getCategories function
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getCategoryPlaylists = function(this: SpotifyWebApi, categoryId: string, options?: Object) : Promise<SpotifyApi.CategoryPlaylistsReponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/browse/categories/' + categoryId + '/playlists`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Get Spotify catalog information about artists, albums, tracks or playlists that match a keyword string.
   * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} query The search query
   * @param {Array<string>} types An array of item types to search across.
   * Valid types are: 'album', 'artist', 'playlist', and 'track'.
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public search = function<T>(this: SpotifyWebApi, query: string, types: string[], options?: SpotifyApi.SearchForItemParameterObject) : Promise<T> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/search/`,
      params: {
        q: query,
        type: types.join(',')
      }
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Fetches albums from the Spotify catalog according to a query.
   * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} query The search query
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public searchAlbums = function(this: SpotifyWebApi, query: string, options?: SpotifyApi.SearchForItemParameterObject) : Promise<SpotifyApi.AlbumSearchResponse> {
    return this.search(query, ['album'], options);
  };

  /**
   * Fetches artists from the Spotify catalog according to a query.
   * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} query The search query
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public searchArtists = function(this: SpotifyWebApi, query: string, options?: SpotifyApi.SearchForItemParameterObject) : Promise<SpotifyApi.ArtistSearchResponse> {
    return this.search(query, ['artist'], options);
  };

  /**
   * Fetches tracks from the Spotify catalog according to a query.
   * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} query The search query
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public searchTracks = function(this: SpotifyWebApi, query: string, options?: SpotifyApi.SearchForItemParameterObject) : Promise<SpotifyApi.TrackSearchResponse> {
    return this.search(query, ['track'], options);
  };

  /**
   * Fetches playlists from the Spotify catalog according to a query.
   * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} query The search query
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public searchPlaylists = function(this: SpotifyWebApi, query: string, options?: SpotifyApi.SearchForItemParameterObject) : Promise<SpotifyApi.PlaylistSearchResponse> {
    return this.search(query, ['playlist'], options);
  };

  /**
   * Get audio features for a single track identified by its unique Spotify ID.
   * See [Get Audio Features for a Track](https://developer.spotify.com/web-api/get-audio-features/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} trackId The id of the track. If you know the Spotify URI it is easy
   * to find the track id (e.g. spotify:track:<here_is_the_track_id>)
   * @return {Promise<Object>}
   */
  public getAudioFeaturesForTrack = function(this: SpotifyWebApi, trackId: string) : Promise<SpotifyApi.AudioFeaturesResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/audio-features/${trackId}`
    };
    return this.checkParamsAndPerformRequest(requestData, {});
  };

  /**
   * Get audio features for multiple tracks based on their Spotify IDs.
   * See [Get Audio Features for Several Tracks](https://developer.spotify.com/web-api/get-several-audio-features/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
   * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
   * @return {Promise<Object>}
   */
  public getAudioFeaturesForTracks = function(this: SpotifyWebApi, trackIds: string[]) : Promise<SpotifyApi.MultipleAudioFeaturesResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/audio-features`,
      params: { ids: trackIds }
    };
    return this.checkParamsAndPerformRequest(requestData, {});
  };

  /**
   * Get audio analysis for a single track identified by its unique Spotify ID.
   * See [Get Audio Analysis for a Track](https://developer.spotify.com/web-api/get-audio-analysis/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {string} trackId The id of the track. If you know the Spotify URI it is easy
   * to find the track id (e.g. spotify:track:<here_is_the_track_id>)
   * @return {Promise<Object>}
   */
  // public getAudioAnalysisForTrack = function(this: SpotifyWebApi, trackId) {
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     url: `${SpotifyWebApi.BASE_URI}/audio-analysis/` + trackId
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, {});
  // };

  /**
   * Create a playlist-style listening experience based on seed artists, tracks and genres.
   * See [Get Recommendations Based on Seeds](https://developer.spotify.com/web-api/get-recommendations/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @param {Object} options A JSON object with options that can be passed
   * @return {Promise<Object>}
   */
  public getRecommendations = function(this: SpotifyWebApi, options?: SpotifyApi.RecommendationsOptionsObject) : Promise<SpotifyApi.RecommendationsFromSeedsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/recommendations`
    };
    return this.checkParamsAndPerformRequest(requestData, options);
  };

  /**
   * Retrieve a list of available genres seed parameter values for recommendations.
   * See [Available Genre Seeds](https://developer.spotify.com/web-api/get-recommendations/#available-genre-seeds) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @return {Promise<Object>}
   */
  public getAvailableGenreSeeds = function(this: SpotifyWebApi) : Promise<SpotifyApi.AvailableGenreSeedsResponse> {
    const requestData : SpotifyWebApiJs.RequestData = {
      url: `${SpotifyWebApi.BASE_URI}/recommendations/available-genre-seeds`
    };
    return this.checkParamsAndPerformRequest(requestData, {});
  };

  /**
   * Get information about a user’s available devices.
   * See [Get a User’s Available Devices](https://developer.spotify.com/web-api/get-a-users-available-devices/) on
   * the Spotify Developer site for more information about the endpoint.
   *
   * @return {Promise<Object>}
   */
  // public getMyDevices = function(this: SpotifyWebApi) {
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     url: `${SpotifyWebApi.BASE_URI}/me/player/devices`
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, {});
  // };

  // /**
  //  * Get information about the user’s current playback state, including track, track progress, and active device.
  //  * See [Get Information About The User’s Current Playback](https://developer.spotify.com/web-api/get-information-about-the-users-current-playback/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public getMyCurrentPlaybackState = function(this: SpotifyWebApi, options?: SpotifyApi.MarketParameter) : Promise<SpotifyApi.CurrentlyPlayingContext> {
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     url: `${SpotifyWebApi.BASE_URI}/me/player`
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, options);
  // };

  // /**
  //  * Get the object currently being played on the user’s Spotify account.
  //  * See [Get the User’s Currently Playing Track](https://developer.spotify.com/web-api/get-the-users-currently-playing-track/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public getMyCurrentPlayingTrack = function(this: SpotifyWebApi, options?: SpotifyApi.MarketParameter) : Promise<SpotifyApi.CurrentlyPlayingObject> {
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     url: `${SpotifyWebApi.BASE_URI}/me/player/currently-playing`
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, options);
  // };

  // /**
  //  * Transfer playback to a new device and determine if it should start playing.
  //  * See [Transfer a User’s Playback](https://developer.spotify.com/web-api/transfer-a-users-playback/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {Array<string>} deviceIds A JSON array containing the ID of the device on which playback should be started/transferred.
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public transferMyPlayback = function(this: SpotifyWebApi, deviceIds, options) {
  //   let postData = options || {};
  //   postData.device_ids = deviceIds;
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     type: 'PUT',
  //     url: `${SpotifyWebApi.BASE_URI}/me/player`,
  //     postData: postData
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, options);
  // };

  // /**
  //  * Start a new context or resume current playback on the user’s active device.
  //  * See [Start/Resume a User’s Playback](https://developer.spotify.com/web-api/start-a-users-playback/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public play = function(this: SpotifyWebApi, options) {
  //   let params = 'device_id' in options ? {device_id: options.device_id} : null;
  //   let postData = {};
  //   ['context_uri', 'uris', 'offset'].forEach(function(this: SpotifyWebApi, field) {
  //     if (field in options) {
  //       postData[field] = options[field];
  //     }
  //   });
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     type: 'PUT',
  //     url: `${SpotifyWebApi.BASE_URI}/me/player/play`,
  //     params: params,
  //     postData: postData
  //   };

  //   // need to clear options so it doesn't add all of them to the query params
  //   let newOptions = typeof options === 'function' ? options : {};
  //   return this.checkParamsAndPerformRequest(requestData, newOptions);
  // };

  // /**
  //  * Pause playback on the user’s account.
  //  * See [Pause a User’s Playback](https://developer.spotify.com/web-api/pause-a-users-playback/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public pause = function(this: SpotifyWebApi, options) {
  //   let params = 'device_id' in options ? {device_id: options.device_id} : null;
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     type: 'PUT',
  //     url: `${SpotifyWebApi.BASE_URI}/me/player/pause`,
  //     params: params
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, options);
  // };

  // /**
  //  * Skips to next track in the user’s queue.
  //  * See [Skip User’s Playback To Next Track](https://developer.spotify.com/web-api/skip-users-playback-to-next-track/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public skipToNext = function(this: SpotifyWebApi, options) {
  //   let params = 'device_id' in options ? {device_id: options.device_id} : null;
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     type: 'POST',
  //     url: `${SpotifyWebApi.BASE_URI}/me/player/next`,
  //     params: params
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, options);
  // };

  // /**
  //  * Skips to previous track in the user’s queue.
  //  * Note that this will ALWAYS skip to the previous track, regardless of the current track’s progress.
  //  * Returning to the start of the current track should be performed using `.seek()`
  //  * See [Skip User’s Playback To Previous Track](https://developer.spotify.com/web-api/skip-users-playback-to-next-track/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public skipToPrevious = function(this: SpotifyWebApi, options) {
  //   let params = 'device_id' in options ? {device_id: options.device_id} : null;
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     type: 'POST',
  //     url: `${SpotifyWebApi.BASE_URI}/me/player/previous`,
  //     params: params
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, options);
  // };

  // /**
  //  * Seeks to the given position in the user’s currently playing track.
  //  * See [Seek To Position In Currently Playing Track](https://developer.spotify.com/web-api/seek-to-position-in-currently-playing-track/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {number} position_ms The position in milliseconds to seek to. Must be a positive number.
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public seek = function(this: SpotifyWebApi, position_ms, options) {
  //   let params = {
  //     position_ms: position_ms,
  //     device_id: options.device_id ? options.device_id : undefined
  //   };
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     type: 'PUT',
  //     url: `${SpotifyWebApi.BASE_URI}/me/player/seek`,
  //     params: params
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, options);
  // };

  // /**
  //  * Set the repeat mode for the user’s playback. Options are repeat-track, repeat-context, and off.
  //  * See [Set Repeat Mode On User’s Playback](https://developer.spotify.com/web-api/set-repeat-mode-on-users-playback/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {String} state A string set to 'track', 'context' or 'off'.
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public setRepeat = function(this: SpotifyWebApi, state, options) {
  //   let params = {
  //     state: state,
  //     device_id: options.device_id ? options.device_id : undefined
  //   };
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     type: 'PUT',
  //     url: `${SpotifyWebApi.BASE_URI}/me/player/repeat`,
  //     params: params
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, options);
  // };

  // /**
  //  * Set the volume for the user’s current playback device.
  //  * See [Set Volume For User’s Playback](https://developer.spotify.com/web-api/set-volume-for-users-playback/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {number} volume_percent The volume to set. Must be a value from 0 to 100 inclusive.
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public setVolume = function(this: SpotifyWebApi, volume_percent, options) {
  //   let params = {
  //     volume_percent: volume_percent,
  //     device_id: options.device_id ? options.device_id : undefined
  //   };
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     type: 'PUT',
  //     url: `${SpotifyWebApi.BASE_URI}/me/player/volume`,
  //     params: params
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, options);
  // };

  // /**
  //  * Toggle shuffle on or off for user’s playback.
  //  * See [Toggle Shuffle For User’s Playback](https://developer.spotify.com/web-api/toggle-shuffle-for-users-playback/) on
  //  * the Spotify Developer site for more information about the endpoint.
  //  *
  //  * @param {bool} state Whether or not to shuffle user's playback.
  //  * @param {Object} options A JSON object with options that can be passed.
  //  * @return {Promise<Object>}
  //  */
  // public setShuffle = function(this: SpotifyWebApi, state, options) {
  //   let params = {
  //     state: state,
  //     device_id: options.device_id ? options.device_id : undefined
  //   };
  //   const requestData : SpotifyWebApiJs.RequestData = {
  //     type: 'PUT',
  //     url: `${SpotifyWebApi.BASE_URI}/me/player/shuffle`,
  //     params: params
  //   };
  //   return this.checkParamsAndPerformRequest(requestData, options);
  // };

  /**
   * Gets the access token in use.
   *
   * @return {string} accessToken The access token
   */
  public getAccessToken = function(this: SpotifyWebApi) : string | undefined {
    return this.ACCESS_TOKEN;
  };

  /**
   * Sets the access token to be used.
   * See [the Authorization Guide](https://developer.spotify.com/web-api/authorization-guide/) on
   * the Spotify Developer site for more information about obtaining an access token.
   *
   * @param {string} accessToken The access token
   * @return {void}
   */
  public setAccessToken = function(this: SpotifyWebApi, accessToken: string) : void {
    this.ACCESS_TOKEN = accessToken;
  };

  private extend = function(target: SpotifyWebApiJs.SimpleObject, obj: SpotifyWebApiJs.SimpleObject) : SpotifyWebApiJs.SimpleObject {
    //let args = Array.prototype.slice.call(arguments);
    target = target || {};
    for (const j in obj) {
      if (obj.hasOwnProperty(j)) {
        target[j] = obj[j];
      }
    }
    return target;
  };

  private buildUrl = function(url : string, parameters?: SpotifyWebApiJs.SimpleObject) : string {
    let qs : string = '';
    if (parameters !== undefined) {
      for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          const value : string = parameters[key];
          qs += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
        }
      }
    }
    if (qs.length > 0) {
      // chop off last '&'
      qs = qs.substring(0, qs.length - 1);
      url = `${url}?${qs}`;
    }
    return url;
  };

  private performRequest = function<T>(this: SpotifyWebApi, requestData: SpotifyWebApiJs.RequestData) : Promise<T> {

    const init : RequestInit = {};
    let URL : string;
    let jsonBody : boolean = false;

    const type : string = requestData.type || 'GET';
    init.method = type;
    //req.open(type, this._buildUrl(requestData.url, requestData.params));
    URL = this.buildUrl(requestData.url, requestData.params);

    if (type !== 'GET' && requestData.postData) {
      init.body = JSON.stringify(requestData.postData);
      jsonBody = true;
    }

    const headers : Headers = new Headers();
    if (this.ACCESS_TOKEN) {
      headers.append('Authorization', `Bearer ${this.ACCESS_TOKEN}`);
    }
    if (jsonBody) {
      headers.append('Content-Type', 'application/json');
    }
    init.headers = headers;

    const request : Request = new Request(URL, init);
    // tslint:disable-next-line:typedef
    const execute = async function(resolve: (value?: T) => void, reject: (reason?: {}) => void) : Promise<void> {
      try {
       const result : Response = await fetch(request);
       const json : T = await result.json();
       if (result.status === 200) {
        resolve(json);
       } else {
        reject(json);
       }
      } catch (exception) {
        reject(exception);
      }
    };

    return new Promise(execute);
  };

  private checkParamsAndPerformRequest = function<T>(this: SpotifyWebApi, requestData:
    SpotifyWebApiJs.RequestData,                     options? : SpotifyWebApiJs.SimpleObject,
                                                     optionsAlwaysExtendParams?: Boolean) : Promise<T> {
    const opt: SpotifyWebApiJs.SimpleObject = options || {};

    // options extend postData, if any. Otherwise they extend parameters sent in the url
    const type : string = requestData.type || 'GET';
    if (type !== 'GET' && requestData.postData && !optionsAlwaysExtendParams) {
      requestData.postData = this.extend(requestData.postData, opt);
    } else if (requestData.params) {
      requestData.params = this.extend(requestData.params, opt);
    }
    return this.performRequest(requestData);
  };
}
