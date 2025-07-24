// app/api/v1/upload/route.ts
import { NextResponse } from "next/server";
import Busboy from "busboy";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const uploadDir = path.join(process.cwd(), "public/uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  const busboy = Busboy({
    headers: Object.fromEntries(req.headers),
  });

  const tmpFilePath = await new Promise<string>((resolve, reject) => {
    let filePath = "";

    busboy.on("file", (fieldname, file, info) => {
      const { filename } = info;
      const saveTo = path.join(uploadDir, filename);
      file.pipe(fs.createWriteStream(saveTo));

      file.on("end", () => {
        resolve(saveTo);
      });
    });
    busboy.on("error", (err) => reject(err));
    busboy.on("finish", () => {
      if (!filePath) reject(new Error("No file uploaded"));
    });

    const reader = req.body?.getReader();
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    const nodeStream = streamToNodeReadable(stream);
    nodeStream.pipe(busboy);
  });

  const fileUrl = `/uploads/${path.basename(tmpFilePath)}`;
  return NextResponse.json({ url: fileUrl });
}

import { Readable } from "stream";
function streamToNodeReadable(webStream: ReadableStream<Uint8Array>): Readable {
  const reader = webStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      this.push(done ? null : value);
    },
  });
}
