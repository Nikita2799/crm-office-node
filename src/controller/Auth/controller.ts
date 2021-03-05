import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { IUser } from "./type";
import { dbQueryInsert, dbQuerySelect } from "../../dbService/dbQuery";
import { MysqlError } from "mysql";
import { DatabaseApi } from "../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const LogIn = async (req: Request, res: Response) => {
  try {
    const { login, password } = <IUser>req.body;
    const paramsQuery = ["users", "login", login];

    db.auth
      .login(paramsQuery)
      .then(async (result: any) => {
        const isMatch = await bcrypt.compare(
          password,
          result.result[0].password
        );

        if (!isMatch) res.status(412).json({ message: "incorrect password" });

        res.status(200).json({ token: result.token });
      })
      .catch((err: any) => {
        if (err.length) {
          res.status(204).json({ message: "user not found" });
        }
        res.status(500).json({ message: err.message });
      });

    // await dbQuerySelect(paramsQuery,async (err:any,result:any)=>{
    //     if(err) return res.status(503).json({message: "db error"});

    //     if(result){
    //         const isMatch = await bcrypt.compare(password,result.password)
    //         if(!isMatch) return res.status(412).json({message: 'incorrect password'})

    //         const token = jwt.sign({userId: result.id},config.SECURITY.TOKEN!, {expiresIn: '5h'});

    //         res.status(200).json({token: token});
    //     }
    //     else{
    //         res.status(204).json({message:"user not found"})
    //     }
    // },false);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const Regestry = async (req: Request, res: Response) => {
  try {
    const { login, name, lastName, password } = <IUser>req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const paramsQuery = [
      "users",
      {
        login: login,
        name: name,
        lastName: lastName,
        password: hashPassword,
        role: "user",
        balance: "0",
      },
    ];

    db.auth
      .create(paramsQuery)
      .then(() => res.status(201).json({ message: "user created" }))
      .catch(() => res.status(400).json({ message: "user exist" }));

    // await dbQueryInsert(paramsQuery, (err: MysqlError, result: any) => {
    //   if (err) return res.status(400).json({ message: "user exist" });
    //   return res.status(201).json({ message: "user created" });
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "bad request" });
  }
};
