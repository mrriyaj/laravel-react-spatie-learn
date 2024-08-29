export const can = (auth, permission) => {
    if (!auth) return false;
    return (auth?.permissions || []).find((p) => p === permission)
        ? true
        : false;
};
