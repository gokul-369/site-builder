// import { NextRequest, NextResponse } from "next/server";

// import User from "@/models/userModal";
// import { getDataFromToken } from "@/helpers/getUserById";
// import { connect } from "@/Database/dbConfig";

// connect();

// export async function GET(request: NextRequest) {
//   try {
//     // get userID from token
//     const userID = await getDataFromToken(
//       request.cookies.get("token")?.value || ""
//     );

//     // get user info based on ID
//     const userInfo = await User.findById(userID).select("-password -isAdmin");
//     if (userInfo) {
//       return NextResponse.json({
//         data: userInfo,
//         status: 200,
//         message: "success",
//       });
//     } else {
//       return NextResponse.json({
//         message: "user doesnt exist",
//         status: 204,
//       });
//     }
//   } catch (error: any) {
//     console.log(error);

//     return NextResponse.json({
//       message: error.message,
//       status: 500,
//     });
//   }
// }
import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModal";
import { connect } from "@/Database/dbConfig";

connect();

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log(userId);

    const id = request.nextUrl.searchParams.get("id");
    const user = await User.findOne({ _id: userId }).select(
      "-password -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry"
    );
    return NextResponse.json({
      mesaaage: "User found",
      data: user,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 400,
    });
  }
}
