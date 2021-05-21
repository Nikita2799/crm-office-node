import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const postUserToGroup = async (req: Request, res: Response) => {
  try {
    const { userList, groupId } = req.body;
    const params = ["groups", "groupId", groupId];

    const result = await db.group.findGroup(params);

    if (result) await addUserToGroup(userList, groupId);
    else return res.status(422).json({ message: "group not found" });

    res.status(200).json({ message: "user added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};

async function addUserToGroup(userList: Array<number>, groupId: number) {
  userList.forEach(async (id) => {
    const params = ["users_group", { groupId: groupId, userId: id }];
    const findParams = ["users_group", "userId", id];
    const updateParams = ["users_group", { groupId: groupId }, "userId", id];

    const user = await db.group.findUser(findParams);

    if (!user) await db.group.addUser(params);
    else await db.group.updateUser(updateParams);
  });
}
