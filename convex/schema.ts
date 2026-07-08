import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    WorkSpace: defineTable({
        Name: v.string(),
        UserId: v.string(),
        description:v.string(),
    }),
    Files:defineTable({
        Name:v.string(),
        UserId:v.string(),
        workSpaceId:v.id('WorkSpace'),
        body:v.string(),
        type:v.string(),
    })
});