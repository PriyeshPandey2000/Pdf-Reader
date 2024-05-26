"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'

const Page = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  const { data,isLoading, isError, isSuccess } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  })

  if (isSuccess) {
    // User is synced to the database
    router.push(origin ? `/${origin}` : '/dashboard')
  }

  if (isError) {
    // const err = trpc.authCallback.error
    // if (err.data?.code === 'UNAUTHORIZED') {
    //   router.push('/sign-in')
    // }
    router.push('/sign-in');
  }


  return (
    <Suspense>
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          Setting up your account...
        </h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
    </Suspense>
  )
}

export default Page