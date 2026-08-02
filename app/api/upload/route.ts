import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const BUCKET = "product-logos";
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: "Unsupported file type. Use PNG, JPEG, WEBP, or SVG." },
                { status: 400 }
            );
        }

        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "File too large (max 2MB)." }, { status: 400 });
        }

        const ext = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        const { error: uploadError } = await supabaseAdmin.storage
            .from(BUCKET)
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabaseAdmin.storage
            .from(BUCKET)
            .getPublicUrl(fileName);

        return NextResponse.json({ url: publicUrlData.publicUrl });
    } catch (err) {
        console.error("[POST /api/upload] Failed to upload file:", err);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}