import { NextRequest, NextResponse } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
 

function checkPathRole(req: NextRequest, path: string, role: string) {
    if (req.nextUrl.pathname.startsWith(path) && req.nextUrl.token?.role !== role) {
        return new NextResponse("You are not authorized")
    }
}
 
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
    // checkPathRole(req, )
})

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|home|test/*).*)',
    ],
  };