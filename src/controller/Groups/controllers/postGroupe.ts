import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const postGroupe = async (req: Request, res: Response) => {
  try {
    const { userList, nameTabel, nameGroup } = req.body;
    const groupParams = [
      "groups",
      { nameTabel: nameTabel + "_wp", nameGroup: nameGroup },
    ];

    const result: any = await db.group.addGroup(groupParams);
    await addUserToGroup(result.insertId, userList);
    res.status(201).json({ message: "group added" });
  } catch (err) {
    console.log(err);
    if (err === 1062)
      return res.status(422).json({ message: "Duplicate name" });

    res.status(500).json({ message: "wrong some" });
  }
};

async function addUserToGroup(groupId: number, userList: Array<number>) {
  userList.forEach(async (id: number) => {
    const params = ["users_group", { groupId: groupId, userId: id }];
    const findParams = ["users_group", "userId", id];
    const updateParams = ["users_group", { groupId: groupId }, "userId", id];

    const user = await db.group.findUser(findParams);

    if (!user) await db.group.addUser(params);
    else await db.group.updateUser(updateParams);
  });
}
