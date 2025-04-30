import pica from 'pica';
const canvas = document.createElement('canvas');
async function dataURLtoFile(dataURL, fileName) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
}

export default async function resizeImage(file) {
    const reader = new FileReader();
    let resizedFile = new Promise((resolve) => {
        reader.onload = function(e) {
            const img = new Image();
        img.onload = async function() {
        await pica().resize(img, canvas, { width: 300, height: 200 })
            .then(async result => {
                const resizedImg = new Image();
                resizedImg.src = canvas.toDataURL();
                const tempresizedFile = await dataURLtoFile(resizedImg.src, file.name);
                resolve(tempresizedFile);
            })
            .catch(error => {
                console.error(error);
            });
        };
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
});
    return resizedFile
}