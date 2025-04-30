import { getCookie } from "@Api/utils/cookieUtils";
import { handleRequest } from "./HandleRequests/HandleRequests.utilities";

export function processSelectedFiles(selectedFiles, setCaseImages) {
    return new Promise((resolve, reject) => {
        const imageArray = {};
        let filesProcessed = 0;

        const fileReadPromises = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            fileReadPromises.push(readFileAsync(file));
        }

        Promise.all(fileReadPromises)
            .then((results) => {
                results.forEach((result, index) => {
                    const file = selectedFiles[index];
                    imageArray[file.name] = {
                        src: result,
                        name: file.name,
                        refreshCounter: 0,
                        imageSrc: file,
                    };
                });
                setCaseImages((prev) => ({ ...prev, ...imageArray }));
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (error) => {
            reader.abort();
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}


export function absolutePosition(el) {
    let
        found,
        left = 0,
        top = 0,
        width = 0,
        height = 0,
        offsetBase = absolutePosition.offsetBase;
    if (!offsetBase && document.body) {
        offsetBase = absolutePosition.offsetBase = document.createElement('div');
        offsetBase.style.cssText = 'position:absolute;left:0;top:0';
        document.body.appendChild(offsetBase);
    }
    if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
        var boundingRect = el.getBoundingClientRect();
        var baseRect = offsetBase.getBoundingClientRect();
        found = true;
        left = boundingRect.left - baseRect.left;
        top = boundingRect.top - baseRect.top;
        width = boundingRect.right - boundingRect.left;
        height = boundingRect.bottom - boundingRect.top;
    }
    return {
        found: found,
        left: left,
        top: top,
        width: width,
        height: height,
        right: left + width,
        bottom: top + height
    };
}

export function changeImagePosition(imgContainer, dimension, diagnose, uniqueCaseImages, setUniqueCaseImages, setCaseImages, refreshCounter) { //need more work
    const img = imgContainer.querySelector("img");
    if(diagnose in uniqueCaseImages || dimension.found == undefined) {
        return;
    }
    imgContainer.querySelector("div").style.visibility = "hidden";
    imgContainer.style.position = 'absolute';
    imgContainer.style.border = 'none';
    const currentDimension = absolutePosition(imgContainer);
    imgContainer.style.width = `${currentDimension.width}px`;
    imgContainer.style.height = `${currentDimension.height}px`;
    imgContainer.style.top = `${currentDimension.top}px`;
    imgContainer.style.left = `${currentDimension.left}px`;
    imgContainer.style.right = `${window.outerWidth - currentDimension.right}px`;
    imgContainer.offsetHeight;
    imgContainer.style.transition = 'width 1s ease-in-out, height 1s ease-in-out, top 1s ease-in-out, left 1s ease-in-out, right 1s ease-in-out, visibility 300ms ease-in-out';
    imgContainer.style.width = `${dimension.width - 4}px`;
    imgContainer.style.height = `${dimension.height - 4}px`;
    imgContainer.style.top = `${dimension.top - currentDimension.width + 2}px`;
    imgContainer.style.left = `${dimension.left + 2}px`;
    imgContainer.style.right = `${window.outerWidth - dimension.right}px`;
    imgContainer.style.zIndex = 2;
    setTimeout(() => {
        setCaseImages((prev) => {
            const newCaseImages = {...prev};
            newCaseImages[img.alt] ? newCaseImages[img.alt].width = dimension?.width : null;
            newCaseImages[img.alt] ? newCaseImages[img.alt].refreshCounter = refreshCounter : null;
            newCaseImages[img.alt] ? newCaseImages[img.alt].height = dimension?.height : null;
            return newCaseImages;
        })
        setUniqueCaseImages((prev) => {
            const newUniqueCaseImages = {...prev};
            newUniqueCaseImages[diagnose] = img.alt;
            return newUniqueCaseImages;
        });
        imgContainer.style.visibility = "hidden"; //need performance enhancment
        // setCaseImages((prev) => {
        //     const newCaseImages = {...prev};
        //     delete newCaseImages[img.alt];
        //     return newCaseImages;
        // })
    }, 1100);
}






export default async function handleFileInput(e, setCaseImages, fileInputImagesRef, imagesPlaceHolderRef, uniqueCaseImages, setUniqueCaseImages, setError, setIsLoading, caseId, patientInfo, setCaseId, setCaseImagesResponse, setReportInfo) {
    let selectedFiles = e.target.files;
    setIsLoading(true);
    let filesArray = Object.values(selectedFiles);
    if (filesArray.length > 10) {
        setError({error:true, message:"hey we're only dealing with 10 images"});
        filesArray = filesArray.slice(0, 10);
        selectedFiles = {};
        for (let i = 0; i < filesArray.length; i++) {
            selectedFiles[i] = filesArray[i];
        }
    }
    await processSelectedFiles(selectedFiles, setCaseImages);
    const selectedCaseImages = {};
    for (let i = 0; i < selectedFiles.length; i++) {
        let file = selectedFiles[i];
        selectedCaseImages[file.name] = file;
    }

    handleRequest(selectedCaseImages, setCaseImages, setIsLoading, caseId, setCaseImagesResponse, setReportInfo);

}
