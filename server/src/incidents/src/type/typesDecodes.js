import dbUtils from "../db/utils";
import typesDao from "./typesDao";

const createTypeObject = (name) => ({
  name,
  getCreateQuery: function () {
    return typesDao.createNewType(this.name);
  },
});

const TYPES = [
  createTypeObject("הכנת מילקשייק"),
  createTypeObject("הכנת פרוזן יוגורט"),
  createTypeObject("הכנת סלט פירות"),
];

const typesDecodesQuery = () =>
  TYPES.map((type) => type.getCreateQuery()).join(" ");

dbUtils.runQueryInDb(typesDecodesQuery());
