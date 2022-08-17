import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import z, { string } from "zod";
import cors from "cors";
import peopleModel from "./people.model";

const app = express();
const appRouter = trpc.router().query("get_contacts", {
    async resolve(){
        return await peopleModel.findAllContacts();
    }
}).mutation("post_contacts", {
    input: z.object({
        name: z.string(),
        valueContact: z.object({
            type: z.string(),
            value: z.string()
        })
    }),
    async resolve({ input }) {
       const resultModel = await peopleModel.newPeopleContact(input);
       console.log(resultModel);
       return {}
    }
});

export type AppRouter = typeof appRouter;

app.use(cors());

app.use("/api/v1/", trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext:() => null
}));

app.listen(3100, () => {
    console.log("Serve connect in port 3100");
})