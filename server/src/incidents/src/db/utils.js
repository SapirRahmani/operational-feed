import "dotenv/config";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { getNewSession, closeDriverConnection } from "./database";

const runQueryInDb = async (query) => {
  const session = getNewSession();
  try {
    const result = await session.run(query);
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    session.close();
    closeDriverConnection();
  }
};

const parseRecordObject = (responseObject) => {
  let parsedObject = {};
  responseObject.keys.forEach((key, keyIndex) => { parsedObject[key] = responseObject._fields[keyIndex] });
  return parsedObject;
}

const parseResponse = (response) => response.records.map((responseObject) => parseRecordObject(responseObject));

export default { parseResponse, runQueryInDb };
