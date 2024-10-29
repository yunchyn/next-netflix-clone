import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);

    return NextResponse.json(currentUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method != "GET") {
//     return res.status(405).end();
//   }

//   try {
//     const { currentUser } = await serverAuth(req);

//     return res.status(200).json(currentUser);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).end();
//   }
// }
