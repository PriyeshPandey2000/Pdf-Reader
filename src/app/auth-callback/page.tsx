"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { Loader2 } from 'lucide-react'
import { Suspense, useEffect } from 'react'

const PageContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  const { data, isLoading, isError, isSuccess } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  })

  useEffect(() => {
    if (isSuccess) {
      // User is synced to the database
      router.push(origin ? `/${origin}` : '/dashboard')
    }

    if (isError) {
      // const err = trpc.authCallback.error
      // if (err.data?.code === 'UNAUTHORIZED') {
      //   router.push('/sign-in')
      // }
      router.push('/sign-in')
    }
  }, [isSuccess, isError, router, origin])

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          Setting up your account...
        </h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

const Page = () => (
  <Suspense fallback={<div className='w-full mt-24 flex justify-center'><Loader2 className='h-8 w-8 animate-spin text-zinc-800' /></div>}>
    <PageContent />
  </Suspense>
)

export default Page
