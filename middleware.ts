import { NextResponse, type NextRequest } from "next/server";

// IPを許可するIPアドレスのリスト
const allowedIPs: string[] = [
  process.env.NEXT_PUBLIC_KIIZAN_IP ?? "", // キーザンオフィス
  process.env.NEXT_PUBLIC_VPN ?? "", //VPN
];

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return;
  const clientIP = request.ip || request.headers.get("x-forwarded-host");
  if (!clientIP || !allowedIPs.includes(clientIP)) {
    return NextResponse.redirect(new URL("/not_found", request.url));
  }
}
