import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {router, publicProcedure} from "./trpc"
import { TRPCError } from "@trpc/server";
export const appRouter=router({
    authCallback:publicProcedure.query(async()=>{
        const {getUser}= getKindeServerSession()
        const user= await getUser();
        
        if(user==null)throw new TRPCError({ code: 'UNAUTHORIZED' })
        if (!user.id || !user.email)
            throw new TRPCError({ code: 'UNAUTHORIZED' })
    })
});

export type AppRouter=typeof appRouter