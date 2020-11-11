/**
 * API工具函数
 * @param {Object} api api列表
 * @param {Function} handle 请求句柄
 */
export function extendApi(
    api = {},
    handle = () => {}
) {
    const result = {};

    Object.keys(api).forEach(key => {
        result[key] = (...args) => handle(api[key], ...args);
    });

    return result;
}

function drawPicture(name) {
    const canvas = document.createElement('canvas');

    canvas.width = 150;
    canvas.height = 120;
    canvas.style.background = 'white';

    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = 'rgba(200, 200, 200, .2)';
    ctx.font = '20px Vedana';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(75, 60);
    ctx.rotate((-20 * Math.PI) / 180);
    ctx.fillText(name, 0, 0);
    ctx.closePath();

    return canvas.toDataURL('image/png');
}

/**
 * 创建水印
 * @param {String} name 水印文字
 */
export function createWaterMark(name) {
    const base64Img = drawPicture(name);
    const oDiv = document.createElement('div');

    oDiv.id = Math.random();
    oDiv.style.cssText = `
        position: fixed;
        left: 0;
        top: 64px;
        right: 0;
        bottom: 0;
        z-index: 2000;
        background: url(${base64Img});
        pointer-events: none;
    `;

    document.body.appendChild(oDiv);
}

export default {
    extendApi,
    createWaterMark
};
