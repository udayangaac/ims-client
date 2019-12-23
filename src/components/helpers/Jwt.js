export const getJwt = () => {
    return localStorage.getItem("auth-token")
};

export const clearStorage = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("profile-name")
};