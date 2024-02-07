const randomIDGenerator = (length) => {
    let randomID = "";
    for (let i = 0; i < length; i++) {
        randomID += String(Math.floor(Math.random() * 10));
    }
    return randomID;
};

export {randomIDGenerator};
