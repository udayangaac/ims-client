
export const getCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth();
    let yy = today.getFullYear();
    return yy + "-" + (mm + 1) + "-" + dd;
};

