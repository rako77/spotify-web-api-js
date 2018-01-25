// Type definitions for spotify-web-api-js v0.21.2
// Project: https://github.com/JMPerez/spotify-web-api-js
// Definitions by: Niels Kristian Hansen Skovmand <https://github.com/skovmand>

/// <reference path="./spotify-api.d.ts" />

//export as namespace SpotifyWebApi;

//export = SpotifyWebApi;

/**
 * Declare SpotifyWebApi variable, since that is the name of the function in spotify-web-api-js.
 */
// declare var SpotifyWebApi: SpotifyWebApiJs.SpotifyWebApiJsStatic;

declare namespace SpotifyWebApiJs {
    type SimpleObject = {[string:string]:any};
    
    
    /**
     * Describes the regular error object: https://developer.spotify.com/web-api/user-guide/#error-details
     */
    interface ErrorObject {
        status: number,
        error: string,
        error_description: string
    }

    interface RequestData {
        url: string,
        type?: 'GET' | 'POST' | 'PUT' | 'DELETE',
        params?: SimpleObject,
        postData?: any
    }

    // /**
    //  * Describes the static side of SpotifyApi.
    //  * Only possibility is to get a new instance of the SpotifyApi.
    //  */
    // interface SpotifyWebApiJsStatic {
    //     new(): SpotifyWebApiJs;
    // }

    /**
     * Describes an instance of SpotifyApi
     * Methods are in the order of appearance in spotify-web-api.js
     */
    interface SpotifyWebApiJs {
        /**
         * Fetches a resource through a generic GET request.
         *
         * @param {string} url The URL to be fetched
         * @return {Promise<T>}
         */
        getGeneric: {<T>(url: string) : Promise<T>};

        /**
         * Fetches information about the current user.
         * See [Get Current User's Profile](https://developer.spotify.com/web-api/get-current-users-profile/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @return {Promise<SpotifyApi.CurrentUsersProfileResponse>}
         */
        getMe: {() : Promise<SpotifyApi.CurrentUsersProfileResponse>};

        /**
         * Fetches current user's saved tracks.
         * See [Get Current User's Saved Tracks](https://developer.spotify.com/web-api/get-users-saved-tracks/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Object} options A JSON object with options that can be passed
         * @return {Promise<SpotifyApi.UsersSavedTracksResponse>}
         */
        getMySavedTracks: {(options?: SpotifyApi.BasicQueryParameters) : Promise<SpotifyApi.UsersSavedTracksResponse>};

        /**
         * Adds a list of tracks to the current user's saved tracks.
         * See [Save Tracks for Current User](https://developer.spotify.com/web-api/save-tracks-user/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
         * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
         * @param {Object} options A JSON object with options that can be passed
         * @return {Promise<potifyApi.SaveTracksForUserResponse>}
         */
        addToMySavedTracks: {(trackIds: string[]) : Promise<SpotifyApi.SaveTracksForUserResponse>};

        /**
         * Remove a list of tracks from the current user's saved tracks.
         * See [Remove Tracks for Current User](https://developer.spotify.com/web-api/remove-tracks-user/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
         * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        removeFromMySavedTracks: {(trackIds: string[]) : Promise<SpotifyApi.RemoveUsersSavedTracksResponse>};

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
        containsMySavedTracks: {(trackIds: string[]) : Promise<SpotifyApi.CheckUsersSavedTracksResponse>};

        /**
         * Get a list of the albums saved in the current Spotify user's "Your Music" library.
         * See [Get Current User's Saved Albums](https://developer.spotify.com/web-api/get-users-saved-albums/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Object} options A JSON object with options that can be passed
         * @return {Promise<Object>}
         */
        getMySavedAlbums: {(options?: SpotifyApi.BasicQueryParameters) : Promise<SpotifyApi.UsersSavedAlbumsResponse>};

        /**
         * Save one or more albums to the current user's "Your Music" library.
         * See [Save Albums for Current User](https://developer.spotify.com/web-api/save-albums-user/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI, it is easy
         * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        addToMySavedAlbums: {(albumIds: string[]) : Promise<SpotifyApi.SaveAlbumsForUserResponse>};

        /**
         * Remove one or more albums from the current user's "Your Music" library.
         * See [Remove Albums for Current User](https://developer.spotify.com/web-api/remove-albums-user/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI, it is easy
         * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        removeFromMySavedAlbums: {(albumIds: string[]) : Promise<SpotifyApi.RemoveAlbumsForUserResponse>};

        /**
         * Check if one or more albums is already saved in the current Spotify user's "Your Music" library.
         * See [Check User's Saved Albums](https://developer.spotify.com/web-api/check-users-saved-albums/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI, it is easy
         * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        containsMySavedAlbums: {(albumIds: string[]) : Promise<SpotifyApi.CheckUserSavedAlbumsResponse>};

        /**
         * Get the current user’s top artists based on calculated affinity.
         * See [Get a User’s Top Artists](https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getMyTopArtists: {(options?: SpotifyApi.BasicQueryParameters) : Promise<SpotifyApi.UsersTopArtistsResponse>};

        /**
         * Get the current user’s top tracks based on calculated affinity.
         * See [Get a User’s Top Tracks](https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getMyTopTracks: {(options?: SpotifyApi.BasicQueryParameters) : Promise<SpotifyApi.UsersTopTracksResponse>};

        /**
         * Get tracks from the current user’s recently played tracks.
         * See [Get Current User’s Recently Played Tracks](https://developer.spotify.com/web-api/web-api-personalization-endpoints/get-recently-played/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getMyRecentlyPlayedTracks: {(options?: SpotifyApi.BasicQueryParameters) : Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse>};

        /**
         * Adds the current user as a follower of one or more other Spotify users.
         * See [Follow Artists or Users](https://developer.spotify.com/web-api/follow-artists-users/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
         * to find their user id (e.g. spotify:user:<here_is_the_user_id>)* one is the error object (null if no error), and the second is an empty value if the request succeeded.
         * @return {Promise<Object>}
         */
        followUsers: {(userIds: string[]) : Promise<SpotifyApi.FollowArtistsOrUsersResponse>};

        /**
         * Adds the current user as a follower of one or more artists.
         * See [Follow Artists or Users](https://developer.spotify.com/web-api/follow-artists-users/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
         * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)* one is the error object (null if no error), and the second is an empty value if the request succeeded.
         * @return {Promise<Object>}
         */
        followArtists: {(artistIds: string[]) : Promise<SpotifyApi.FollowArtistsOrUsersResponse>};


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
         * whether you want the playlist to be followed privately ({public: false})* one is the error object (null if no error), and the second is an empty value if the request succeeded.
         * @return {Promise<Object>}
         */
        followPlaylist: {(ownerId: string, playlistId: string, options?: Object) : Promise<SpotifyApi.FollowPlaylistReponse>};

        /**
         * Removes the current user as a follower of one or more other Spotify users.
         * See [Unfollow Artists or Users](https://developer.spotify.com/web-api/unfollow-artists-users/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
         * to find their user id (e.g. spotify:user:<here_is_the_user_id>)* one is the error object (null if no error), and the second is an empty value if the request succeeded.
         * @return {Promise<Object>}
         */
        unfollowUsers: {(userIds: string[]) : Promise<SpotifyApi.UnfollowArtistsOrUsersResponse>};

        /**
         * Removes the current user as a follower of one or more artists.
         * See [Unfollow Artists or Users](https://developer.spotify.com/web-api/unfollow-artists-users/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
         * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)* one is the error object (null if no error), and the second is an empty value if the request succeeded.
         * @return {Promise<Object>}
         */
        unfollowArtists: {(artistIds: string[]) : Promise<SpotifyApi.UnfollowArtistsOrUsersResponse>};


        /**
         * Remove the current user as a follower of one playlist.
         * See [Unfollow a Playlist](https://developer.spotify.com/web-api/unfollow-playlist/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} ownerId The id of the playlist owner. If you know the Spotify URI of
         * the playlist, it is easy to find the owner's user id
         * (e.g. spotify:user:<here_is_the_owner_id>:playlist:xxxx)
         * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
         * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)* one is the error object (null if no error), and the second is an empty value if the request succeeded.
         * @return {Promise<Object>}
         */
        unfollowPlaylist: {(ownerId: string, playlistId: string) : Promise<SpotifyApi.UnfollowPlaylistReponse>};


        /**
         * Checks to see if the current user is following one or more other Spotify users.
         * See [Check if Current User Follows Users or Artists](https://developer.spotify.com/web-api/check-current-user-follows/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} userIds The ids of the users. If you know their Spotify URI it is easy
         * to find their user id (e.g. spotify:user:<here_is_the_user_id>)* one is the error object (null if no error), and the second is an array of boolean values that indicate
         * whether the user is following the users sent in the request.
         * @return {Promise<Object>}
         */
        isFollowingUsers: {(userIds: string[]) : Promise<SpotifyApi.UserFollowsUsersOrArtistsResponse>};

        /**
         * Checks to see if the current user is following one or more artists.
         * See [Check if Current User Follows](https://developer.spotify.com/web-api/check-current-user-follows/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
         * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)* one is the error object (null if no error), and the second is an array of boolean values that indicate
         * whether the user is following the artists sent in the request.
         * @return {Promise<Object>}
         */
        isFollowingArtists: {(artistIds: string[]) : Promise<SpotifyApi.UserFollowsUsersOrArtistsResponse>};

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
         * to find their user id (e.g. spotify:user:<here_is_the_user_id>)* one is the error object (null if no error), and the second is an array of boolean values that indicate
         * whether the users are following the playlist sent in the request.
         * @return {Promise<Object>}
         */
        areFollowingPlaylist: {(ownerId: string, playlistId: string, userIds: string[]) : Promise<SpotifyApi.UsersFollowPlaylistReponse>};

        /**
         * Get the current user's followed artists.
         * See [Get User's Followed Artists](https://developer.spotify.com/web-api/get-followed-artists/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Object} [options] Options, being after and limit.* one is the error object (null if no error), and the second is an object with a paged object containing
         * artists.
         * @returns {Promise} A promise that if successful, resolves to an object containing a paging object which contains
         * artists objects.
         */
        getFollowedArtists: {(options?: Object) : Promise<SpotifyApi.UsersFollowedArtistsResponse>};

        //TODO missing getFollowedUsers

        /**
         * Fetches information about a specific user.
         * See [Get a User's Profile](https://developer.spotify.com/web-api/get-users-profile/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} userId The id of the user. If you know the Spotify URI it is easy
         * to find the id (e.g. spotify:user:<here_is_the_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getUser: {(userId: string, options?: Object) : Promise<SpotifyApi.UserProfileResponse>};

        /**
         * Fetches a list of the current user's playlists.
         * See [Get a List of a User's Playlists](https://developer.spotify.com/web-api/get-list-users-playlists/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} userId An optional id of the user. If you know the Spotify URI it is easy
         * to find the id (e.g. spotify:user:<here_is_the_id>). If not provided, the id of the user that granted
         * the permissions will be used.
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getUserPlaylists: {(userId?: string, options?: Object) : Promise<SpotifyApi.ListOfUsersPlaylistsResponse>};

        /**
         * Fetches a specific playlist.
         * See [Get a Playlist](https://developer.spotify.com/web-api/get-playlist/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} userId The id of the user. If you know the Spotify URI it is easy
         * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
         * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
         * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getPlaylist: {(userId: string, playlistId: string, options?: Object) : Promise<SpotifyApi.SinglePlaylistResponse>};

        /**
         * Fetches the tracks from a specific playlist.
         * See [Get a Playlist's Tracks](https://developer.spotify.com/web-api/get-playlists-tracks/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} userId The id of the user. If you know the Spotify URI it is easy
         * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
         * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
         * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getPlaylistTracks: {(userId: string, playlistId: string, options?: Object) : Promise<SpotifyApi.PlaylistTrackResponse>};

        /**
         * Creates a playlist and stores it in the current user's library.
         * See [Create a Playlist](https://developer.spotify.com/web-api/create-playlist/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} userId The id of the user. You may want to user the "getMe" function to
         * find out the id of the current logged in user
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        createPlaylist: {(userId: string, options?: Object) : Promise<SpotifyApi.CreatePlaylistResponse>};

        /**
         * Change a playlist's name and public/private state
         * See [Change a Playlist's Details](https://developer.spotify.com/web-api/change-playlist-details/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} userId The id of the user. You may want to user the "getMe" function to
         * find out the id of the current logged in user
         * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
         * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
         * @param {Object} data A JSON object with the data to update. E.g. {name: 'A new name', public: true}* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        changePlaylistDetails: {(userId: string, playlistId: string, data: Object) : Promise<SpotifyApi.ChangePlaylistDetailsReponse>};

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
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        addTracksToPlaylist: {(userId: string, playlistId: string, uris: string[], options?: Object) : Promise<SpotifyApi.AddTracksToPlaylistResponse>};

        /**
         * Replace the tracks of a playlist
         * See [Replace a Playlist's Tracks](https://developer.spotify.com/web-api/replace-playlists-tracks/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} userId The id of the user. If you know the Spotify URI it is easy
         * to find the user id (e.g. spotify:user:<here_is_the_user_id>:playlist:xxxx)
         * @param {string} playlistId The id of the playlist. If you know the Spotify URI it is easy
         * to find the playlist id (e.g. spotify:user:xxxx:playlist:<here_is_the_playlist_id>)
         * @param {Array<string>} uris An array of Spotify URIs for the tracks* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        replaceTracksInPlaylist: {(userId: string, playlistId: string, uris: string[]) : Promise<SpotifyApi.ReplacePlaylistTracksResponse>};

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
         * @param {Object} options An object with optional parameters (range_length, snapshot_id)* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        reorderTracksInPlaylist: {(userId: string, playlistId: string, rangeStart: number, insertBefore: number, options?: Object) : Promise<SpotifyApi.ReorderPlaylistTracksResponse>};

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
         * string) and `positions` (which is an array of integers).* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        removeTracksFromPlaylist: {(userId: string, playlistId: string, uris: Object[]) : Promise<SpotifyApi.RemoveTracksFromPlaylistResponse>};

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
         * @param {string} snapshotId The playlist's snapshot ID against which you want to make the changes* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        removeTracksFromPlaylistWithSnapshotId: {(userId: string, playlistId: string, uris: Object[], snapshotId: string) : Promise<SpotifyApi.PlaylistSnapshotResponse>};

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
         * @param {string} snapshotId The playlist's snapshot ID against which you want to make the changes* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        removeTracksFromPlaylistInPositions: {(userId: string, playlistId: string, positions: number[], snapshotId: string) : Promise<SpotifyApi.PlaylistSnapshotResponse>};

        /**
         * Fetches an album from the Spotify catalog.
         * See [Get an Album](https://developer.spotify.com/web-api/get-album/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} albumId The id of the album. If you know the Spotify URI it is easy
         * to find the album id (e.g. spotify:album:<here_is_the_album_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getAlbum: {(albumId: string, options?: Object) : Promise<SpotifyApi.SingleAlbumResponse>};

        /**
         * Fetches the tracks of an album from the Spotify catalog.
         * See [Get an Album's Tracks](https://developer.spotify.com/web-api/get-albums-tracks/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} albumId The id of the album. If you know the Spotify URI it is easy
         * to find the album id (e.g. spotify:album:<here_is_the_album_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getAlbumTracks: {(albumId: string, options?: Object) : Promise<SpotifyApi.AlbumTracksResponse>};

        /**
         * Fetches multiple albums from the Spotify catalog.
         * See [Get Several Albums](https://developer.spotify.com/web-api/get-several-albums/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} albumIds The ids of the albums. If you know their Spotify URI it is easy
         * to find their album id (e.g. spotify:album:<here_is_the_album_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getAlbums: {(albumIds: string[], options?: Object) : Promise<SpotifyApi.MultipleAlbumsResponse>};

        /**
         * Fetches a track from the Spotify catalog.
         * See [Get a Track](https://developer.spotify.com/web-api/get-track/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} trackId The id of the track. If you know the Spotify URI it is easy
         * to find the track id (e.g. spotify:track:<here_is_the_track_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getTrack: {(trackId: string, options?: Object) : Promise<SpotifyApi.SingleTrackResponse>};

        /**
         * Fetches multiple tracks from the Spotify catalog.
         * See [Get Several Tracks](https://developer.spotify.com/web-api/get-several-tracks/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
         * to find their track id (e.g. spotify:track:<here_is_the_track_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getTracks: {(trackIds: string[], options?: Object) : Promise<SpotifyApi.MultipleTracksResponse>};

        /**
         * Fetches an artist from the Spotify catalog.
         * See [Get an Artist](https://developer.spotify.com/web-api/get-artist/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
         * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getArtist: {(artistId: string, options?: Object) : Promise<SpotifyApi.SingleArtistResponse>};

        /**
         * Fetches multiple artists from the Spotify catalog.
         * See [Get Several Artists](https://developer.spotify.com/web-api/get-several-artists/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} artistIds The ids of the artists. If you know their Spotify URI it is easy
         * to find their artist id (e.g. spotify:artist:<here_is_the_artist_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getArtists: {(artistIds: string[], options?: Object) : Promise<SpotifyApi.MultipleArtistsResponse>};

        /**
         * Fetches the albums of an artist from the Spotify catalog.
         * See [Get an Artist's Albums](https://developer.spotify.com/web-api/get-artists-albums/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
         * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getArtistAlbums: {(artistId: string, options?: Object) : Promise<SpotifyApi.ArtistsAlbumsResponse>};

        /**
         * Fetches a list of top tracks of an artist from the Spotify catalog, for a specific country.
         * See [Get an Artist's Top Tracks](https://developer.spotify.com/web-api/get-artists-top-tracks/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
         * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
         * @param {string} countryId The id of the country (e.g. ES for Spain or US for United States)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getArtistTopTracks: {(artistId: string, countryId: string, options?: Object) : Promise<SpotifyApi.ArtistsTopTracksResponse>};

        /**
         * Fetches a list of artists related with a given one from the Spotify catalog.
         * See [Get an Artist's Related Artists](https://developer.spotify.com/web-api/get-related-artists/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} artistId The id of the artist. If you know the Spotify URI it is easy
         * to find the artist id (e.g. spotify:artist:<here_is_the_artist_id>)
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getArtistRelatedArtists: {(artistId: string, options?: Object) : Promise<SpotifyApi.ArtistsRelatedArtistsResponse>};

        /**
         * Fetches a list of Spotify featured playlists (shown, for example, on a Spotify player's "Browse" tab).
         * See [Get a List of Featured Playlists](https://developer.spotify.com/web-api/get-list-featured-playlists/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getFeaturedPlaylists: {(options?: Object) : Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse>};

        /**
         * Fetches a list of new album releases featured in Spotify (shown, for example, on a Spotify player's "Browse" tab).
         * See [Get a List of New Releases](https://developer.spotify.com/web-api/get-list-new-releases/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getNewReleases: {(options?: Object) : Promise<SpotifyApi.ListOfNewReleasesResponse>};

        /**
         * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player's "Browse" tab).
         * See [Get a List of Categories](https://developer.spotify.com/web-api/get-list-categories/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getCategories: {(options?: Object) : Promise<SpotifyApi.MultipleCategoriesResponse>};

        /**
         * Get a single category used to tag items in Spotify (on, for example, the Spotify player's "Browse" tab).
         * See [Get a Category](https://developer.spotify.com/web-api/get-category/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} categoryId The id of the category. These can be found with the getCategories function
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getCategory: {(categoryId: string, options?: Object) : Promise<SpotifyApi.SingleCategoryResponse>};

        /**
         * Get a list of Spotify playlists tagged with a particular category.
         * See [Get a Category's Playlists](https://developer.spotify.com/web-api/get-categorys-playlists/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} categoryId The id of the category. These can be found with the getCategories function
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getCategoryPlaylists: {(categoryId: string, options?: Object) : Promise<SpotifyApi.CategoryPlaylistsReponse>};

        // the search method has been omitted, since its functionality is covered below.

        /**
         * Fetches albums from the Spotify catalog according to a query.
         * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} query The search query
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        searchAlbums: {(query: string, options?: SpotifyApi.SearchForItemParameterObject) : Promise<SpotifyApi.AlbumSearchResponse>};

        /**
         * Fetches artists from the Spotify catalog according to a query.
         * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} query The search query
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        searchArtists: {(query: string, options?: SpotifyApi.SearchForItemParameterObject) : Promise<SpotifyApi.ArtistSearchResponse>};

        /**
         * Fetches tracks from the Spotify catalog according to a query.
         * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} query The search query
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        searchTracks: {(query: string, options?: SpotifyApi.SearchForItemParameterObject) : Promise<SpotifyApi.TrackSearchResponse>};

        /**
         * Fetches playlists from the Spotify catalog according to a query.
         * See [Search for an Item](https://developer.spotify.com/web-api/search-item/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} query The search query
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        searchPlaylists: {(query: string, options?: SpotifyApi.SearchForItemParameterObject) : Promise<SpotifyApi.PlaylistSearchResponse>};

        /**
         * Get audio features for a single track identified by its unique Spotify ID.
         * See [Get Audio Features for a Track](https://developer.spotify.com/web-api/get-audio-features/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {string} trackId The id of the track. If you know the Spotify URI it is easy
         * to find the track id (e.g. spotify:track:<here_is_the_track_id>)* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getAudioFeaturesForTrack: {(trackId: string) : Promise<SpotifyApi.AudioFeaturesResponse>};

        /**
         * Get audio features for multiple tracks based on their Spotify IDs.
         * See [Get Audio Features for Several Tracks](https://developer.spotify.com/web-api/get-several-audio-features/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Array<string>} trackIds The ids of the tracks. If you know their Spotify URI it is easy
         * to find their track id (e.g. spotify:track:<here_is_the_track_id>)* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getAudioFeaturesForTracks: {(trackIds: string[]) : Promise<SpotifyApi.MultipleAudioFeaturesResponse>};

        /**
         * Create a playlist-style listening experience based on seed artists, tracks and genres.
         * See [Get Recommendations Based on Seeds](https://developer.spotify.com/web-api/get-recommendations/) on
         * the Spotify Developer site for more information about the endpoint.
         *
         * @param {Object} options A JSON object with options that can be passed* one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getRecommendations: {(options?: SpotifyApi.RecommendationsOptionsObject) : Promise<SpotifyApi.RecommendationsFromSeedsResponse>};

        /**
         * Retrieve a list of available genres seed parameter values for recommendations.
         * See [Available Genre Seeds](https://developer.spotify.com/web-api/get-recommendations/#available-genre-seeds) on
         * the Spotify Developer site for more information about the endpoint.
         ** one is the error object (null if no error), and the second is the value if the request succeeded.
         * @return {Promise<Object>}
         */
        getAvailableGenreSeeds: {() : Promise<SpotifyApi.AvailableGenreSeedsResponse>};

        /**
         * Gets the access token in use.
         *
         * @return {string} accessToken The access token
         */
        getAccessToken: {() : string | undefined};

        /**
         * Sets the access token to be used.
         * See [the Authorization Guide](https://developer.spotify.com/web-api/authorization-guide/) on
         * the Spotify Developer site for more information about obtaining an access token.
         *
         * @param {string} accessToken The access token
         * @return {void}
         */
        setAccessToken: {(accessToken: string) : void};
    }
}
