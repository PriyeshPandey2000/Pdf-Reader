import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: any
): Promise<void | NextResponse<unknown>> {
  const endpoint = params.kindeAuth
  await handleAuth(request, endpoint)
  return new NextResponse(null, { status: 200 }) // Or any appropriate response
}
