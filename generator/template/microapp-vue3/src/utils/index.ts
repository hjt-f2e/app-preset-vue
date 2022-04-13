export function getCurrentCity(): currentCity {
    const mainVuex = window.localStorage.getItem('mainVuex');

    try {
        if (mainVuex) {
            const systemJson = JSON.parse(mainVuex).system;

            return {
                id: systemJson.curCity.id,
                name: systemJson.curCity.name,
            };
        }
    } catch (e) {
        return {
            id: '510100',
            name: '成都',
        };
    }

    return {
        id: '510100',
        name: '成都',
    };
}

export default {
    getCurrentCity,
};
