const momentMJ = require("moment-jalaali");
const { randomInt } = require("crypto");
const path = require("path");
const createHttpError = require("http-errors");
const { PublicFunctionMessage } = require("./utills_message");
const { unlink } = require("fs/promises")

const getPersianDate = (date) => {
    persianMonths = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
    ];
    let newDate = momentMJ(date);
    let year = newDate.jYear();
    let month = persianMonths[newDate.jMonth()];
    let day = newDate.jDate();
    return `${day} ${month} ${year}`;
};
const UniqueCode = async (Name, model) => {
    const count = await model.find({}).count();
    const code = Name + "-" + 1000 + randomInt(10000, 99999) + count;
    return code;
};
// Start Date and Time --------------------------------------------------------- 
const getDateNow = () =>{
    const date = new Date();
    return date.getTime();
}
const convertGregorianDateToPersionDateToToday = () => {
    const date = new Date();
    return momentMJ(date).format("jYYYY-jMM-jDD HH:mm:ss");
};
const convertGetTimeToPersionDate = (date) => {
    const time = new Date(date)
    return momentMJ(time).format("jYYYY-jMM-jDD HH:mm:ss");
};
const convertOfPersionDateToGetTime = (jalaliDate) => {
    const perDate =  momentMJ(jalaliDate, 'jYYYY-jMM-jDD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
    const time = new Date(perDate);
    console.log(time);
    return time.getTime();
};
const convertDate = (date) => {
    const [year, month, day] = date.split('/'); 
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate

};

// End Date and Time ---------------------------------------------------------------


const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Start Image and File ---------------------------------------------------------------
const listOfImageFromRequest = (files, fileUploadPath) => {
    if (files?.length > 0) {
        return files
            .map((file) => path.join(fileUploadPath, file.filename))
            .map((item) => item.replace(/\\/g, "/"));
    } else {
        return [];
    }
};
const getFileOrginalname = (files) => {
    return files.map((file) => {
        return file.originalname;
    });
};
const getFileEncoding = (files) => {
    return files.map((file) => {
        return file.encoding;
    });
};
const getFileMimetype = (files) => {
    return files.map((file) => {
        return file.mimetype;
    });
};
const getFileFilename = (files) => {
    return files.map((file) => {
        return file.filename;
    });
};
const getFileSize = (files) => {
    let sum = 0;
    const fileSize = files.map((file) => {
        return file.size;
    });
    for (const i in fileSize) {
        sum += fileSize[i];
    }
    sum = sum / 1024;
    const total = Math.ceil(sum);
    return total;
};
const deleteFileInPathArray = async (fileAddress) => {
    if (fileAddress) {
        const pathFile = fileAddress.map((item) =>
            path.join(__dirname, "..", "..", "..", "public", item)
        );
        const deleteFiles = async (paths) => {
            try {
                const promises = paths.map((file) => unlink(file));
                await Promise.all(promises);
                console.log("All files deleted successfully");
            } catch (error) {
                console.error(error);
            }
        };
        deleteFiles(pathFile);
    }
};

// End Image and File ---------------------------------------------------------------

const extractTwoLinesDescription = (text) => {
    let lines, firstTwoLines, firsOneLines;
    lines = text.split("<p>");

    if (lines.length >= 2) {
        firstTwoLines = lines.slice(0, 2).join("\n").split("<p>");
        return firstTwoLines;
    } else {
        firsOneLines = lines.slice(0, 1).join("\n").split("<p>");
        return firsOneLines;
    }
};


const deleteInvalidPropertyObject = (data = {}, blackList = [] || []) => {
    const nullishData = ["", " ", 0, NaN, null, undefined];
    Object.keys(data).forEach((key) => {
        if (blackList.includes(key)) delete data[key];
        if (nullishData.includes(data[key])) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0)
            data[key] = data[key].map((item) => item.trim());
        if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    });
    return data;
};
const checkExistById = async (id, model) => {
    const checkExist = await model.findById(id);
    if (!checkExist)
        throw new createHttpError.NotFound(PublicFunctionMessage.notfound);
    return checkExist;
};
const alreadyExistBySlug = async (slug, model) => {
    const alreadyExist = await model.findOne({ slug });
    if (alreadyExist)
        throw new createHttpError.Conflict(PublicFunctionMessage.alreadySlug);
    return null;
};
module.exports = {
    getPersianDate,
    deleteInvalidPropertyObject,
    UniqueCode,
    convertGregorianDateToPersionDateToToday,
    listOfImageFromRequest,
    getFileEncoding,
    getFileOrginalname,
    getFileMimetype,
    getFileFilename,
    getFileSize,
    extractTwoLinesDescription,
    deleteFileInPathArray,
    checkExistById,
    alreadyExistBySlug,
    copyObject,
    convertDate,
    convertGetTimeToPersionDate,
    convertOfPersionDateToGetTime,
    getDateNow
};
