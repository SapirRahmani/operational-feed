import dbUtils from "../db/utils";
import outlinesDao from "./outlinesDao";

const createOutlineObject = (name) => ({
  name,
  getCreateQuery: function () {
    return outlinesDao.createNewOutline(this.name);
  },
});

const OUTLINES = [
  createOutlineObject("קיצוץ"),
  createOutlineObject("ריסוק"),
  createOutlineObject("ערבול"),
];

const outlinesDecodesQuery = () =>
  OUTLINES.map((outline) => outline.getCreateQuery()).join(" ");

dbUtils.runQueryInDb(outlinesDecodesQuery());
