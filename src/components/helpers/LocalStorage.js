export const getJwt = () => {
    return localStorage.getItem("auth-token");
};

export const clearStorage = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("profile-ims");
};


export const getProfile = () => {
    return JSON.parse(localStorage.getItem("profile-ims"));
};
