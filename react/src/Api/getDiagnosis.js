 import {
    createResizedImageReport,
    getSpecialImages,
    parseCollageData,
    parseSubmitCaseData,
    restuctureModelResults, rotateRotatedImages
} from "@/Api/utils/apiUtils.js";
const diagnosis = ["intraoralLateralLtLeft",
                    "intraoralLateralLtRight",
                    "intraoralFrontal",
                    "extraoralFrontalRest",
                    "extraoralLateral",
                    "extraoralFrontalSmiling",
                    "occlusalUpper",
                    "occlusalLower",
                    "opg",
                    "lateralCeph"]
export default function getDiagnosis() {
    const numbers = [0,1,2,3,4,5,6,7,8,9];
    const randomDiagnosis = [];
    while(numbers.length) {
        let index = Math.floor(Math.random() * numbers.length);
        randomDiagnosis.push(diagnosis[numbers[index]]);
        numbers.splice(index,1);
    }
    return randomDiagnosis;
}


export const requestModelResults = async (caseImagesReportRaw, caseId) => {
    const caseImagesReport = await createResizedImageReport(caseImagesReportRaw);
    caseImagesReport.append('case_id', caseId);
    const modelResults = await parseSubmitCaseData(caseImagesReport);

    const special_images = getSpecialImages(modelResults, caseImagesReportRaw); // special images is collage
    modelResults["special_images"] = special_images
    modelResults['croppedImagesBlob'] = {};
    if (Object.keys(special_images).length !== 0)
        modelResults['collage_images'] = await parseCollageData(special_images, caseId);

    restuctureModelResults(modelResults);
    // TODO if collage has a rotated image hatez3al gamed
    // TODO if you go back then redo image keeps going 90 degrees
    // await rotateRotatedImages(modelResults, caseImagesReportRaw); don't deal with rotated images for now.
    return modelResults;
}
