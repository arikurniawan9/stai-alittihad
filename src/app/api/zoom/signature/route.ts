import { NextResponse } from 'next/server';
import { KJUR } from 'jsrsasign';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const meetingNumber = searchParams.get('meetingNumber');
  const role = searchParams.get('role') || '0'; // 0 for participant, 1 for host

  if (!meetingNumber) {
    return NextResponse.json({ error: 'Meeting number is required' }, { status: 400 });
  }

  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;

  const oHeader = { alg: 'HS256', typ: 'JWT' };
  const oPayload = {
    sdkKey: process.env.ZOOM_SDK_KEY,
    mn: meetingNumber,
    role: parseInt(role as string, 10),
    iat: iat,
    exp: exp,
    appKey: process.env.ZOOM_SDK_KEY,
    tokenExp: iat + 60 * 60 * 2,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_SDK_SECRET!);

  return NextResponse.json({ signature });
}