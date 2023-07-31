import { NextResponse, type NextRequest } from "next/server";
const allowedVpn = [];
for (let i = 0; i < 10; i++) {
  allowedVpn.push(process.env[`NEXT_PUBLIC_VPN_${i + 1}`]);
}
// IPを許可するIPアドレスのリスト
const allowedIPs: string[] = [
  process.env.NEXT_PUBLIC_KIIZAN_IP ?? "", // キーザンオフィス
  ...allowedVpn.map((VPN) => {
    return VPN ?? "";
  }),
];
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return;
  const clientIP = request.ip || request.headers.get("x-forwarded-host");
  if (!clientIP || !allowedIPs.includes(clientIP)) {
    return NextResponse.redirect(new URL("/not_found", request.url));
  }
}
