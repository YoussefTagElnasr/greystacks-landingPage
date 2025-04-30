const diagnosisClasses = { // need to change it to json file
    "extraoral_frontal_rest": {
        mainClass: "extraoral_frontal_rest",
        message:"we already have an instance of this image, if you want it to take its place remove the other one.",
    },
    "extraoral_lateral": {
        mainClass: "extraoral_lateral",
        message:"we already have an instance of this image, if you want it to take its place remove the other one.",
    },
    "occlusal_upper": {
        mainClass: "occlusal_upper",
        message:"we already have an instance of this image, if you want it to take its place remove the other one.",
    },
    "opg": {
        mainClass: "opg",
        message:"we already have an instance of this image, if you want it to take its place remove the other one.",
    },
    "lateral_ceph": {
        mainClass: "lateral_ceph",
        message:"we already have an instance of this image, if you want it to take its place remove the other one.",
    },
    "extraoral_frontal_smiling": {
        mainClass: "extraoral_frontal_smiling",
        message:"we already have an instance of this image, if you want it to take its place remove the other one.",
    },
    "intraoral_frontal": {
        mainClass: "intraoral_frontal",
        message:"we already have an instance of this image, if you want it to take its place remove the other one.",
    },
    "occlusal_lower": {
        mainClass: "occlusal_lower",
        message:"we already have an instance of this image, if you want it to take its place remove the other one.",
    },
    "intraoral_lateral_lt": {
        mainClass: "intraoral_lateral_lt",
        message:"we already have an instance of this image, if you want it to take its place remove the other one.",
    },
    "intraoral_lateral_rt": {
        mainClass: "intraoral_lateral_rt",
        message:"we already have an instance of this image, if you want it to take its place remove the other one.",
    },
    "lateral_oblique": {
        mainClass: "extraoral_lateral",
        message:"The perspective in this picture is angled so the output may be inaccurate",
    },
    "not_biting": {
        mainClass: "intraoral_frontal",
        message:"The patient in this image may not be in occlusion.",
    },
    "occlusal_anteriors_obscured": { //need fix
        mainClass: "occlusal_upper",
        message:"The patient's anteriors in this image are obscured.",
    },
    "overjet_view": {
        mainClass: "intraoral_frontal",
        message:"The perspective in this picture is angled so the output may be inaccurate",
    },
    "partial_extra_oral_lateral": {
        mainClass: "extraoral_lateral",
        message:"This image does not capture the patient's entire face.",
    },
    "partialfrontal_resting": {
        mainClass: "extraoral_frontal_rest",
        message:"This image does not capture the patient's entire face.",
    },
    "partialfrontal_smiling": {
        mainClass: "extraoral_frontal_smiling",
        message:"This image does not capture the patient's entire face.",
    },
    "posed_smile": {
        mainClass: "extraoral_frontal_smiling", // need change
        message:"The patient in this image has a posed smile.",
    },
    "retracted_no_crop": {
        mainClass: "intraoral_frontal",
        message:"This image includes the patient's whole face while we only need the intraoral field only, this may negatively impact image quality.",
    },
    "intraoral_lt_angled": {
        mainClass: "intraoral_lateral_lt",
        message:"The perspective in this picture is angled so the output may be inaccurate",
    },
    "intraoral_rt_angled": {
        mainClass: "intraoral_lateral_rt",
        message:"The perspective in this picture is angled so the output may be inaccurate",
    },
}

export default diagnosisClasses;
