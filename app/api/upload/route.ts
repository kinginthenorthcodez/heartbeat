import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/server";

type Body = {
  imageData: string; // data URL
  description?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    if (!body?.imageData) {
      return NextResponse.json(
        { error: "imageData is required" },
        { status: 400 },
      );
    }

    // parse data URL
    const match = body.imageData.match(
      /^data:(image\/(png|jpeg|jpg|webp));base64,(.+)$/,
    );
    if (!match) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 },
      );
    }

    const mime = match[1];
    const ext = mime.split("/")[1] === "jpeg" ? "jpg" : mime.split("/")[1];
    const b64 = match[3];
    const buffer = Buffer.from(b64, "base64");

    // Upload to Supabase Storage in the user's requested bucket
    const bucket = "profile images"; // bucket name provided by user
    const fileName = `img-${Date.now()}.${ext}`;
    const storagePath = `uploads/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(storagePath, buffer, { contentType: mime });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get a public URL (works if the bucket is public). If private, consider createSignedUrl.
    const { data: publicData } = await supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(storagePath);

    const url = publicData?.publicUrl ?? null;

    const meta = { name: fileName, url, description: body.description ?? null };

    // Optionally persist metadata to a table named `images` if it exists.
    try {
      const { error: insertError } = await supabaseAdmin
        .from("images")
        .insert([
          { name: fileName, url, description: body.description ?? null },
        ]);
      if (insertError) {
        // ignore if table doesn't exist or insertion fails
        console.warn(
          "Could not insert image metadata into images table:",
          insertError.message,
        );
      }
    } catch (e) {
      // ignore any unexpected errors
      console.warn("Error persisting image metadata:", e);
    }

    return NextResponse.json(meta);
  } catch (err: any) {
    return NextResponse.json(
      { error: String(err?.message ?? err) },
      { status: 500 },
    );
  }
}
