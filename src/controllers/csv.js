import { stringify } from "csv-stringify";
import User from "../models/User";
import fs from "fs";
import path from "path";

const processCsvMostActiveUsers = async (req, res) => {
  const users = await User.scope(
    "photoCount",
    "age",
    "orderByMostActiveUsers"
  ).findAll();

  const usersPlainObjects = users.map((u) => {
    const userJson = u.toJSON();

    const {
      photos,
      password,
      id,
      selectedAvatarId,
      isAdmin,
      birthdate,
      createdAt,
      updatedAt,
      ...user
    } = userJson;

    return user;
  });

  stringify(usersPlainObjects, { header: true }, (err, data) => {
    fs.writeFile(
      path.resolve(__dirname, "..", "reports", "mostActiveUsers.csv"),
      data,
      (err) => {
        res.setHeader(
          "Content-disposition",
          "attachment; filename=mostActiveUsers.csv"
        );
        res.set("Content-Type", "text/csv");
        res.status(200).send(data);
      }
    );
  });
};

const downloadCsvMostActiveUsers = async (req, res) => {
  res.download(path.resolve(__dirname, "..", "reports", "mostActiveUsers.csv"));
};

export default { processCsvMostActiveUsers, downloadCsvMostActiveUsers };
