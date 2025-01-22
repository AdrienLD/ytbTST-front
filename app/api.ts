import axios from "axios";

export function research(searchValue: string) {
    try {
        return axios
            .get("https://ytst.flgr.fr/ytbtst/research", {
                params: { searchValue },
                withCredentials: true,
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}

export function areChannelInBDD(channelIDs: string[]) {
    try {
        return axios
            .get("https://ytst.flgr.fr/ytbtst/areChannelsInBDD", {
                params: { channelIDs },
                withCredentials: true,
            })
            .then((response) => {return response.data})
            .catch((error) => console.error("Erreur :", error));
    } catch (error) {
        console.error("Erreur :", error);
    }
}