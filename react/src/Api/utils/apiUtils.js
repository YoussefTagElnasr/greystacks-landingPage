import resizeImage from "./resizeImage.js";
import b64toBlob from "./base64toblob.js";
import {getCookie} from "./cookieUtils.js";

export const getModelOutput = async (caseImagesReport, requestUrl) => {
    let fullRequestUrl = "https://orthovisor.com/api/machine_learning/" + requestUrl;
    let requestData;

    const submitcase_response = await fetch(fullRequestUrl, {
        method: "POST",
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: caseImagesReport

    }).then(response => response.json())
        .then((data) => {
            requestData = data;
        });
    return requestData;
}

export const parseSubmitCaseData = async (caseImagesReport, caseId) => {
    let modelResults = {};

    let data = await getModelOutput(caseImagesReport, 'submit_photos', caseId);
    for (let key in data) {
        modelResults[key] = data[key];
    }
    return modelResults;
}

export const getRegeneratedModelOutput = async (caseImagesReport) => {
    const modelResults = {}
    let data = await getModelOutput(caseImagesReport, "regenerate_model_results");
    for (let key in data) {
        modelResults[key] = data[key];
    }
    return modelResults;
}

export const getCollageImageReport = (image_name, special_images, case_id) => {
    const collageImageReport = new FormData();
    const originalImage = special_images[image_name];
    collageImageReport.append(image_name,
        originalImage);
    collageImageReport.append("case_id", case_id);
    return collageImageReport;
}

export const parseCollageData = async (special_images, case_id) => {
    let collage_image_data = {'cropped_image_outputs': {}, 'cropped_images': {}};

    for (const [key, value] of Object.entries(special_images)) {
        const collageImageReport = getCollageImageReport(key, special_images, case_id);
        let data = await getModelOutput(collageImageReport, 'submit_collage');
        for (let key in data['cropped_image_outputs']) {
            collage_image_data['cropped_image_outputs'][key] = data['cropped_image_outputs'][key];
        }
        const tempblobUrls = convertToBlobUrls(data['cropped_images']);

        for (const key in tempblobUrls)
            collage_image_data['cropped_images'][key] = tempblobUrls[key];
    }

    return collage_image_data;
}

export const createResizedImageReport = async (caseImagesReportRaw) => {
    const caseImagesReport = new FormData();
    caseImagesReport.append("caseName", caseImagesReportRaw.caseName);
    for (let id in caseImagesReportRaw.caseImages) {
        const resizedImage = await resizeImage(caseImagesReportRaw.caseImages[id]);
        caseImagesReport.append(id,
            resizedImage);
    }
    return caseImagesReport;
}

export const createRegennedImageReport = async (caseImagesReportRaw, caseID, predictionChooser) => {
    const caseImagesReport = new FormData();
    caseImagesReport.append("caseID", caseID);
    caseImagesReport.append("predictionChooser", predictionChooser);
    for (let id in caseImagesReportRaw.caseImages) {
        const resizedImage = await resizeImage(caseImagesReportRaw.caseImages[id].image);
        caseImagesReport.append(id,
            resizedImage);
    }
    return caseImagesReport;
}

export const getSpecialImages = (modelResults, caseImagesReportRaw) => {
    const special_images = {};

    for (const [key, value] of Object.entries(modelResults)) {
        if (key === "caseID")
            continue;
        if (value["image_results"][0]["output"][0] === 'photo_collage')
        {
            special_images[key] = caseImagesReportRaw['caseImages'][key];
            delete modelResults[key];
        }
    }
    return special_images;
}

export const convertToBlobUrls = (b64ImagesDict) => {
    const collage_image_urls_dict = {};
    for (const [key, value] of Object.entries(b64ImagesDict)) {
        let blobUrl = convertToBlobUrl(value)
        collage_image_urls_dict[key] = blobUrl;
    }
    return collage_image_urls_dict;
}

export const convertToBlobUrl = (b64Image) => {
    const blob = b64toBlob(b64Image, 'image/jpg');
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
}

export async function rotateImageBlobUrl(blobUrl, degrees) {
    // Create an Image object
    const img = new Image();

    // Promisify the image load operation
    const imgLoaded = new Promise((resolve) => {
        img.onload = resolve;
    });

    // Load the image blob URL into the Image object
    img.src = blobUrl;

    // Wait for the image to load
    await imgLoaded;

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set the canvas dimensions to match the image
    canvas.width = img.width;
    canvas.height = img.height;

    // Rotate the image on the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2); // Set the origin to the center of the image
    ctx.rotate((degrees * Math.PI) / 180); // Rotate the image
    ctx.drawImage(img, -img.width / 2, -img.height / 2); // Draw the rotated image

    // Convert the canvas content to a blob
    const rotatedBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve);
    });

    // Return the rotated blob as a blob URL
    return URL.createObjectURL(rotatedBlob);
}

export const rotateRotatedImages = async (modelResults, caseImagesReportRaw) => {
    for (let caseImage in modelResults) {
        if (Number.isInteger((modelResults[caseImage][0]))) {
            caseImagesReportRaw['caseImages'][caseImage].blob = await rotateImageBlobUrl(caseImagesReportRaw['caseImages'][caseImage].blob,360 - modelResults[caseImage][0]);
            modelResults[caseImage].shift()
        }
    }
}

// TODO make this take an infinite number of parameters and deal with all of them the same way.
export const reformatModelResultsForTreatmentOptions = (modelResults) => {
    let newdict = {};
    for (const [key, value] of Object.entries(modelResults)) {
        if (Number.isInteger(value))
            continue;
        newdict[key] = modelResults[key];
    }
    return newdict;
}

export const restuctureModelResults = (modelResults) => {
    if (!modelResults['collage_images'])
        return;
    for (const [key, value] of Object.entries(modelResults['collage_images']['cropped_image_outputs'])) {
        modelResults[key] = value;
    }
    for (const [key, value] of Object.entries(modelResults['collage_images']['cropped_images'])) {
        modelResults['croppedImagesBlob'][key] = value;
    }
    delete modelResults['collage_images'];
}
