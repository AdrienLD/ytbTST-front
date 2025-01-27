import axios from "axios";

const instance = axios.create({
    baseURL: "https://ytst-back.flgr.fr", // URL de votre backend
    withCredentials: true, // Inclure les cookies si nécessaire
    headers: {
      "Content-Type": "application/json",
    },
})

export function research(searchValue: string) {
    try {
        return instance
            .get("https://ytst-back.flgr.fr/ytbtst/research", {
                params: { searchValue },
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}

export function areChannelInBDD(channelIDs: string[]) {
    try {
        return instance
            .get("https://ytst-back.flgr.fr/ytbtst/areChannelsInBDD", {
                params: { channelIDs },
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}

export function fetchChannelInfo(channelId: string) {
    try {
        return instance
            .get("https://ytst-back.flgr.fr/ytbtst/channelInfo", {
                params: { channelId },
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}

export function fetchChannelStats(channelId: string) {
    try {
        return instance
            .get("https://ytst-back.flgr.fr/ytbtst/channelStats", {
                params: { channelId },
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}

export function fetchChannelVideo(channelId: string) {
    try {
        return instance
            .get("https://ytst-back.flgr.fr/ytbtst/videosFromChannel", {
                params: { channelId },
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}

export function fetchVideoInfo(videoId: string) {
    try {
        return instance
            .get("https://ytst-back.flgr.fr/ytbtst/videoInfo", {
                params: { videoId },
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}

export function fetchVideoStats(videoId: string) {
    try {
        return instance
            .get("https://ytst-back.flgr.fr/ytbtst/videoStats", {
                params: { videoId },
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}

export function addChannel(channelId: string) {
    try {
        return instance
            .post("https://ytst-back.flgr.fr/ytbtst/addChannel", { channelId })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}

export function fetchLastChannels() {
    try {
        return instance
            .get("https://ytst-back.flgr.fr/ytbtst/recuperateLastFollowedChannels", {
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}

export function fetchLastVideos() {
    try {
        return instance
            .get("https://ytst-back.flgr.fr/ytbtst/recuperateLastFollowedVideos", {
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}