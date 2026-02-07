import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/server";

export async function GET() {
  try {
    const bucket = "profile images";
    // list files under uploads/
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .list("uploads", { limit: 100, offset: 0 });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const items = (data || []).map((obj) => {
      const storagePath = `uploads/${obj.name}`;
      const { data: publicData } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(storagePath);
      return {
        name: obj.name,
        url: publicData?.publicUrl ?? null,
        description: null,
      };
    });

    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json(
      { error: String(err?.message ?? err) },
      { status: 500 },
    );
  }
}
