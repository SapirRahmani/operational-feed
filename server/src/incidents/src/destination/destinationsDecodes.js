import dbUtils from "../db/utils";
import destinationsDao from "./destinationsDao";

const createDestinationObject = (name) => ({
  name,
  getCreateQuery: function () {
    return destinationsDao.createNewDestination(this.name);
  },
});

const DESTINATIONS = [
  createDestinationObject("מיקסר"),
  createDestinationObject("בלנדר"),
  createDestinationObject("מקרר"),
];

const destinationsDecodesQuery = () =>
  DESTINATIONS.map((destination) => destination.getCreateQuery()).join(" ");

dbUtils.runQueryInDb(destinationsDecodesQuery());
