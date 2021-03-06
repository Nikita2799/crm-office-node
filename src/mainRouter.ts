import Router from "express";
import { corsSettings } from "./service/corsSettings/corsSetting";

import { AdminRouter } from "./controller/Admin/router";
import { AuthRouter } from "./controller/Auth/router";
import { UserRouter } from "./controller/User/router";
import { ExcelRouter } from "./ExcelService/router";
import { ClientRouter } from "./controller/Client/router";
import { GroupRouter } from "./controller/Groups/router";
import { TRouter } from "./controller/testsmethodRederect/router";

const router = Router();

router.use(corsSettings);

AuthRouter(router);
UserRouter(router);
AdminRouter(router);
ExcelRouter(router);
ClientRouter(router);
GroupRouter(router);
TRouter(router);

//enable pre-flight
router.options("*", corsSettings);

export default router;
