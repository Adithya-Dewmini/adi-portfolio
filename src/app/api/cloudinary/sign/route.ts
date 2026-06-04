import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { verifyAdminAccess } from "@/lib/require-admin";

function getCloudinaryPublicConfig() {
  return {
    apiKey: process.env.CLOUDINARY_API_KEY ?? "",
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ""
  };
}

export async function GET() {
  const access = await verifyAdminAccess();

  if (!access.allowed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: access.reason === "unauthenticated" ? 401 : 403 });
  }

  return NextResponse.json({
    ...getCloudinaryPublicConfig(),
    timestamp: Math.floor(Date.now() / 1000)
  });
}

export async function POST(request: Request) {
  const access = await verifyAdminAccess();

  if (!access.allowed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: access.reason === "unauthenticated" ? 401 : 403 });
  }

  const body = (await request.json()) as {
    paramsToSign?: Record<string, string | number>;
  };

  const params = {
    ...(body.paramsToSign ?? {})
  };

  if (!("timestamp" in params)) {
    params.timestamp = Math.floor(Date.now() / 1000);
  }

  const signature = cloudinary.utils.api_sign_request(
    params as Record<string, string | number>,
    process.env.CLOUDINARY_API_SECRET ?? ""
  );

  return NextResponse.json({
    signature,
    timestamp: params.timestamp,
    ...getCloudinaryPublicConfig()
  });
}
