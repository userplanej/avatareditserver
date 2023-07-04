const s3 = require('../config/s3');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

module.exports.uploadImage = async (data) => {
    try {
        const { body, files } = data;
        const getFileLocation = files.map((file) => {
          return `${file.location}`;
        });
        const images = getFileLocation.toString();
      
        if (body.adminId !== process.env.ADMID_ID) response(res, 401, { message: `Wrong admin id` });
        if (body.adminId === process.env.ADMID_ID)
          return({location: images });
      
    } catch (err) {
        throw new Error(err);
    }
};

module.exports.deleteImage = async (data) => {
  try {
    const { params } = data;
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else response(res, 200, { images: data });
    });
  } catch (err) {
      throw new Error(err);
  }
};

const fetchData = async (key) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key
    };
    const file = await s3
      .getObject(params)
      .promise()
    return file
}

module.exports.sendDataToClientApi = async (data) => {
  try {
    const { body } = data;
    const filesLocation = body.location.split('.com/');
    const fileName = filesLocation[1].split('/')
    const geFile = await axios.get(body.location, { responseType: 'stream' })
    
    const url = process.env.CLIENT_API
    const headers = {
      'AccessKey': 'SerengetiAdministrationAccessKey',
      'SecretKey': 'SerengetiAdministrationSecretKey',
      'LoginId': 'maum-orchestra-com'
    }
    const payloadData = {
      "text":"인공지능(AI) 인간 전문기업 마인즈랩은 7일 한국거래소 코스닥시장본부 예비심사에 합격했다고 8일 밝혔습니다.AI 속기사, AI 간병인, AI 직업 상담사 등이 그 예입니다.마인즈랩 유태준 대표는 국내에서 탄탄한 인공지능 기술을 기반으로 인공인간을 공급할 수 있는 기업은 마인즈랩이 유일합니다.",
      "width":"1280",
      "height":"720",
      "speaker":"0",
      "background":"",
      "action":"1",
    }
    const formData = new FormData();
    formData.append('lifecycleName', 'Studio_Main_Action_Lifecycle')
    formData.append('target', 'SoftwareCatalogInstance')
    formData.append('async', 'false')
    formData.append('catalogInstanceName', 'Studio_Main_Action_Catalog')
    formData.append('payload', `${payloadData}` )
    formData.append('file', geFile.data, fileName[1])
    const sendData = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
        AccessKey: 'SerengetiAdministrationAccessKey',
        SecretKey: 'SerengetiAdministrationSecretKey',
        LoginId: 'maum-orchestra-com'
      }
    })
    const base64data = Buffer.from(sendData.data, 'binary').toString('base64');
    const originalData = Buffer.from(base64data, 'base64')
    console.log('originalData', typeof originalData)
    const getDate = Date.now();
    const outputName = `${getDate}.mp4`
    fs.writeFileSync(process.cwd() + `/download/${outputName}`, originalData);
    // return sendData.data
  } catch (err) {
      throw new Error(err);
  }
};