import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'
import { redirect } from 'next/navigation'

const page = async() => {
    const { getUser } = getKindeServerSession()
    const user =  await getUser()

    if (!user || !user.id) redirect('/auth-callback?origin=dashboard')
        return <div>{user.email}</div>

    

}

export default page