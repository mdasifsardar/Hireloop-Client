import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.DB_URL);
const db = client.db("hireloop");

export const ROLES = ["seeker", "recruiter", "admin"];

export const auth = betterAuth({
  //        Email & Password
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "seeker",
        input: true,
      },
    },
  },

  //        MongoDB
  database: mongodbAdapter(db, {
    client,
  }),
});
