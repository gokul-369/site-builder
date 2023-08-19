import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModal";
import { connect } from "@/Database/dbConfig";
import { sendMail } from "@/helpers/mailer";
import { configConstants } from "@/helpers/constants";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { email, purpose } = requestBody;
  try {
    const user = await User.findOne({ email });
    if (user) {
      //   generate token and send mail
      const hashedToken = await bcryptjs.hash(email.toString(), 10);
      const alphanumericHash = hashedToken.replace(/[^a-zA-Z0-9]/g, "");
      const now = new Date();
      const expiry = new Date(now.getTime() + 10 * 60 * 1000);
      if (purpose === configConstants.FORGOT_PASSWORD) {
        await User.findOneAndUpdate(
          { email },
          {
            forgotPasswordToken: alphanumericHash,
            forgotPasswordTokenExpiry: expiry,
          }
        );
      }

      const mailerResponse = await sendMail({
        email: "gokul369@outlook.com",
        emailType: purpose,
        userName: user.userName,
        token: alphanumericHash,
      });
      if (mailerResponse.messageId) {
        return NextResponse.json({
          message: "Mail sent check your mail",
          status: 200,
        });
      } else {
        return NextResponse.json({
          message: "Mail could not be sent",
          status: 500,
        });
      }
    } else {
      return NextResponse.json({
        message: "We could not find any User registered with this Email ID",
        status: 204,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}