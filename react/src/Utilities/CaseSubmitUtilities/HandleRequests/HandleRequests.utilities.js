import { requestModelResults } from "@Api/getDiagnosis";

export function handleCollageImageRequestResult(data, setCaseImage, setCaseImagesResponse, setReportInfo, caseImages) {
    const treatmentOptions = {};
    const newCaseImage = {...caseImages};

    Object.keys(data.special_images).map((key) => {
        delete newCaseImage[key];
    })

    Object.keys(data.croppedImagesBlob).map((key) => {
        newCaseImage[key] =  { src: data.croppedImagesBlob[key], name: key, refreshCounter: 0 }
    })


    Object.keys(data).map((key) => {
        let diagnosisIndex = 0;
        if(key == "caseID" || key == "croppedImagesBlob" || key == "special_images") {
            return;
        }

        if(data[key]['image_results']&& data[key]['image_results'][diagnosisIndex]["type"] == "rotation") {
            diagnosisIndex = 1;
        }

        let diagnosis = data[key]['image_results'] && data[key]['image_results'][diagnosisIndex]['output'];
        const rotated = {
            isRotated:false,
            degree: 0,
        };

        if(diagnosisIndex != 0) {
            rotated.isRotated = true;
            rotated.degree =  data[key]['image_results'][0]['output'][0];
        }

        newCaseImage[key].diagnosis = diagnosis;
        newCaseImage[key].rotated = rotated;
        newCaseImage[key].id = data[key]["image_id"];
        newCaseImage[key].refreshCounter = 0;

        setReportInfo((prev) => {
            const newReportInfo = {...prev};
            switch(diagnosis[0]) {
                case "occlusal_upper" :
                    data[key]['image_results'].forEach((type) => {
                        if(type.type == "occlusal_crowding_spacing") {
                            newReportInfo["occlusal_upper"] = {class: type.output[0]};
                        }
                    })
                    break;
                case "occlusal_lower":
                    data[key]['image_results'].forEach((type) => {
                        if(type.type == "occlusal_crowding_spacing") {
                            newReportInfo["occlusal_lower"] = {class: type.output[0]};
                        }
                    })
                    break;
                case "intraoral_lateral_rt":
                    data[key]['image_results'].forEach((type) => {
                        if(type.type == "intraoral_lateral_molar_classification") {
                            newReportInfo["intraoral_lateral_rt_molar_classification"] = {class: type.output[0]};
                        }
                        if(type.type == "intraoral_lateral_canine_classification") {
                            newReportInfo["intraoral_lateral_rt_canine_classification"] = {class: type.output[0]};
                        }
                    })
                    break;
                case "intraoral_lateral_lt":
                    data[key]['image_results'].forEach((type) => {
                        if(type.type == "intraoral_lateral_molar_classification") {
                            newReportInfo["intraoral_lateral_lt_molar_classification"] = {class: type.output[0]};
                        }
                        if(type.type == "intraoral_lateral_canine_classification") {
                            newReportInfo["intraoral_lateral_lt_canine_classification"] = {class: type.output[0]};
                        }
                    })
                    break;
                case "intraoral_frontal":
                    data[key]['image_results'].forEach((type) => {
                        if(type.type == "intraoral_frontal_midline") {
                            newReportInfo["intraoral_frontal"] = {class: type.output[0]};
                        }
                    })
                    break;
                default:
                    break;
            }
            return newReportInfo;
        })
        return newCaseImage;
    });

    setCaseImage(newCaseImage);
    setCaseImagesResponse((prev) => {
        const newCaseImageResponse = {...prev, ...treatmentOptions};
        return newCaseImageResponse;
    })
}

function handleNormalImageRequestResult(data, setCaseImage, setCaseImagesResponse, setReportInfo, caseImages) {
    const treatmentOptions = {};
    const newCaseImage = {...caseImages};
    Object.keys(data).map((key) => {
        let diagnosisIndex = 0;

        if(data[key]['image_results']&& data[key]['image_results'][diagnosisIndex]["type"] == "rotation") {
            diagnosisIndex = 1;
        }
        
        let diagnosis = data[key]['image_results']&& data[key]['image_results'][diagnosisIndex]['output'];
        const rotated = {
            isRotated:false,
            degree: 0,
        };
        if(key == "caseID" || key == "croppedImagesBlob" || key == "special_images") {
            return;
        }

        if(diagnosisIndex != 0) {
            rotated.isRotated = true;
            rotated.degree =  data[key]['image_results'][0]['output'][0];
        }

        newCaseImage[key].diagnosis = diagnosis;
        newCaseImage[key].rotated = rotated;
        newCaseImage[key]["refreshCounter"] = 0;
        newCaseImage[key].id = data[key]["image_id"];

        setReportInfo((prev) => {
            const newReportInfo = {...prev};
            switch(diagnosis[0]) {
                case "occlusal_upper" :
                    data[key]['image_results'].forEach((type) => {
                        if(type.type == "occlusal_crowding_spacing") {
                            newReportInfo["occlusal_upper"] = {class: type.output[0]};
                        }
                    })
                    break;
                case "occlusal_lower":
                    data[key]['image_results'].forEach((type) => {
                        if(type.type == "occlusal_crowding_spacing") {
                            newReportInfo["occlusal_lower"] = {class: type.output[0]};
                        }
                    })
                    break;
                case "intraoral_lateral_rt":
                    data[key]['image_results'].forEach((type) => {
                        if(type.type == "intraoral_lateral_molar_classification") {
                            newReportInfo["intraoral_lateral_rt_molar_classification"] = {class: type.output[0], type: "Right"};
                        }
                        if(type.type == "intraoral_lateral_canine_classification") {
                            newReportInfo["intraoral_lateral_rt_canine_classification"] = {class: type.output[0], type: "Right"};
                        }
                    })
                    break;
                case "intraoral_lateral_lt":
                    data[key]['image_results'].forEach((type) => {
                        if(type.type == "intraoral_lateral_molar_classification") {
                            newReportInfo["intraoral_lateral_lt_molar_classification"] = {class: type.output[0], type: "Left"};
                        }
                        if(type.type == "intraoral_lateral_canine_classification") {
                            newReportInfo["intraoral_lateral_lt_canine_classification"] = {class: type.output[0], type: "Left"};
                        }
                    })
                    break;
                case "intraoral_frontal":
                    data[key]['image_results'].forEach((type) => {
                        if(type.type == "intraoral_frontal_midline") {
                            newReportInfo["intraoral_frontal"] = {class: type.output[0]};
                        }
                    })
                    break;
                default:
                    break;
            }
            return newReportInfo;
        })

        treatmentOptions[key] = data[key];
    })
    setCaseImage(newCaseImage)
    setCaseImagesResponse((prev) => {
        const newCaseImageResponse = {...prev, ...treatmentOptions};
        return newCaseImageResponse;
    })
}



export function handleRequest(selectedCaseImages, setCaseImages, setIsLoading, caseId, setCaseImagesResponse, setReportInfo) {
    let caseImages = {};

    setCaseImages((prev) => {
        caseImages = {...prev};
        return prev;
    })

    requestModelResults({
        "caseImages": selectedCaseImages,
    }, caseId).then((data) => {
        if(Object.keys(data.special_images).length !== 0) {
            handleCollageImageRequestResult(data, setCaseImages, setCaseImagesResponse, setReportInfo, caseImages);
        } else {
            handleNormalImageRequestResult(data, setCaseImages, setCaseImagesResponse, setReportInfo, caseImages);
        }

        setIsLoading(false);
    })
} 