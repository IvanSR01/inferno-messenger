import next from 'next'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get('refresh-token')
	const isDashboardPage = request.nextUrl.pathname.includes('/dashboard')

	if (!refreshToken && isDashboardPage) {
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}

	if (refreshToken && !isDashboardPage) {
		return NextResponse.redirect(new URL('/dashboard/chats', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/:path*'],
}
