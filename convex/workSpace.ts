import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

export const createWorkSpace= mutation({
    args:{Name:v.string(),description:v.string()},
    handler:async(ctx,args)=>{
        const user= await authComponent.safeGetAuthUser(ctx);
          if (!user) throw new Error('Not Authorized')
        const newWorkSpace=await ctx.db.insert('WorkSpace',
            {
              Name: args.Name,
              UserId: user._id,
              description:args.description
            },
         )
         return newWorkSpace;
    }
})

export const getWorkSpaces=query({
    args:{},
    handler:async(ctx)=>{
        const user=await authComponent.safeGetAuthUser(ctx);
          if(!user) return [];
        const WorkSpaces= await ctx.db.query('WorkSpace')
        .filter((q)=>q.eq(q.field('UserId'),user._id))
        .collect();
        return WorkSpaces;
    },

})

export const deleteWorkSpace=mutation({
    args:{id:v.id('WorkSpace')},
    handler:async(ctx,args)=>{
       ctx.db.delete('WorkSpace',args.id);
        return 'Success deleting'
    }
})

export const createFile= mutation({
    args:{
    Name:v.string(),
    body:v.string(),
    workSpaceId:v.id('WorkSpace'),
    type:v.string(),        
    },
    handler:async(ctx,args)=>{
        const user =await authComponent.safeGetAuthUser(ctx);
          if(!user) throw new Error('Not authorized')
      const newFile=  ctx.db.insert('Files',
            {
             Name:args.Name, 
             body:args.body,
             type:args.type,
             workSpaceId:args.workSpaceId,
             UserId:user._id
            }
        )
        return newFile;
    }
})

export const getFilesByWorkSpaceId= query({
    args:{workSpaceId:v.id('WorkSpace')},
    handler:async (ctx,args)=>{
       const Files=await ctx.db
       .query('Files')
       .filter((q)=>q.eq(q.field('workSpaceId'),args.workSpaceId))
       .collect();

       return Files;
       
    }
})

export const deleteFile=mutation({
    args:{FileId:v.id('Files')},
    handler:async(ctx,args)=>{
       ctx.db.delete('Files',args.FileId);

       return 'Deliting File Successfully'
    }
})

export const updateFileName=mutation({
    args:{FileId:v.id('Files'),FileName:v.string()},
    handler:async (ctx,args)=>{
          ctx.db.patch('Files',args.FileId,{
            Name:args.FileName,
            type:
                        (/^.*\.html$/).test(args.FileName)
                        ?'html'
                        :(/^.*\.css$/).test(args.FileName)
                        ?'css'
                        :(/^.*\.js$/).test(args.FileName)
                        ?'js'
                        :'txt'})
    }
})

export const getFileById=query({
    args:{FileId:v.optional(v.id('Files'))},
    handler:async(ctx,args)=>{
        if(args.FileId===undefined) return null
        const File=ctx.db.get('Files',
            args.FileId)

       return File
    }

})



export const updateFileBodyById=mutation({
    args:{FileId:v.optional(v.id('Files')),body:v.string()},
    handler:async(ctx,args)=>{
    if(args.FileId===undefined) return null
      ctx.db.patch('Files',args.FileId,{body:args.body})
    }
})