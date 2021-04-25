import dbUtils from "../db/utils";
import resultsDao from "./resultsDao";

const createResultObject = (name) => ({
  name,
  getCreateQuery: function () {
    return resultsDao.createNewResult(this.name);
  },
});

const RESULTS = [
  createResultObject("מילקשייק"),
  createResultObject("פרוזן יוגורט"),
  createResultObject("סלט פירות"),
];

const resultsDecodesQuery = () =>
  RESULTS.map((result) => result.getCreateQuery()).join(" ");

dbUtils.runQueryInDb(resultsDecodesQuery());
