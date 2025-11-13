// app/api/upload-url/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server"; // util yg pakai SUPABASE_SERVICE_ROLE_KEY

export async function POST(req: Request) {
  try {
    const { bucket = "ticket-proofs", path } = await req.json();
    if (!path) return NextResponse.json({ error: "path required" }, { status: 400 });
    const supabase = await createClient(cookies());
    // expiresIn in seconds (e.g. 120 = 2 minutes)
    const expiresIn = 120;
    // createSignedUploadUrl exists in Supabase JS reference
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(path, { upsert: false });

    if (error) {
      console.error("createSignedUploadUrl err:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // data.signedUrl (or token) - check SDK version: response contains token/url
    return NextResponse.json({ signedUploadUrl: data.signedUrl ?? data.token ?? data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected" }, { status: 500 });
  }
}
