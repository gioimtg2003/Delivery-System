import { SendMailOptions } from "nodemailer";
import { EmailProvider } from "../Implements/EmailProvider";
import { Log } from "../../Lib/Utils/Log";
import { Oauth } from "../../Configs/oauth";

export class WelcomeCustomerLogin extends EmailProvider {
    private options: SendMailOptions;

    constructor(email: string, name: string) {
        super();
        this.options = {
            from: "<p>Shippy Smile<>",
            to: email,
            subject: "Shippy Smile - Welcome",
            html: `
            <body>
        <style>
            #btn-verify:hover {
                background-color: #55a7ff;
                cursor: pointer;
            }
        </style>
        <div
            class="container-content-email"
            style="
                display: flex;
                justify-content: center;
                align-items: start;
                width: 100%;
                background-color: #c5e3f0;
                padding-top: 30px;
                padding-bottom: 20px;
            "
        >
            <div
                class="body-content-email"
                style="
                    width: 50%;
                    background-color: #f7f9fa;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 40px;
                    margin:auto;
                "
            >
                <div class="img-container">
                    <img
                        src="https://i.imgur.com/1QgrNNw.png"
                    />
                </div>
                <div style="margin-top: 10px">
                    <p
                        style="
                            color: #333333;
                            font-family: 'Segoe UI', Arial, sans-serif;
                            font-size: 22px;
                        "
                    >
                        Chào
                        <span style="font-weight: bold; color: #55a7ff"
                            >${name}</span
                        >
                    </p>
                </div>
                <div style="margin-top: 20px">
                    <p
                        style="
                            color: #333333;
                            font-family: 'Segoe UI', Arial, sans-serif;
                            font-size: 20px;
                        "
                    >
                        Chào mừng bạn đến với dịch vụ giao hàng Shippy Smile
                    </p>
                </div>
                <div style="margin-top: 10px">
                    <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                    >
                        <tbody>
                            <tr>
                                <td
                                    align="left"
                                    style="
                                        font-size: 0px;
                                        padding: 12px 16px;
                                        word-break: break-word;
                                    "
                                >
                                    <div
                                        style="
                                            font-family: Be Vietnam Pro 2022,
                                                sans-serif;
                                            font-size: 18px;
                                            font-weight: bold;
                                            line-height: 20px;
                                            text-align: left;
                                            color: #394860;
                                        "
                                    >
                                        Thông tin tài khoản
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    align="left"
                                    style="
                                        font-size: 0px;
                                        padding: 0;
                                        word-break: break-word;
                                    "
                                >
                                    <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        border="0"
                                        style="
                                            color: #666f80;
                                            font-family: Be Vietnam Pro 2022,
                                                sans-serif;
                                            font-size: 16px;
                                            line-height: 20px;
                                            table-layout: auto;
                                            width: 100%;
                                            border: none;
                                        "
                                    >
                                        <tbody>
                                            <tr
                                                valign="top"
                                                height="8px"
                                                style="background: #ffffff"
                                            >
                                                <td
                                                    style="
                                                        border-top-left-radius: 12px;
                                                    "
                                                ></td>
                                                <td></td>
                                                <td></td>

                                                <td width="1px"></td>
                                                <td></td>
                                                <td></td>
                                                <td
                                                    style="
                                                        border-top-right-radius: 12px;
                                                    "
                                                ></td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="
                                                        width: 16px;
                                                        background-color: #ffffff;
                                                    "
                                                ></td>
                                                <td
                                                    style="
                                                        width: 30%;
                                                        padding: 8px 0;
                                                        background-color: #ffffff;
                                                        border-bottom: 1px solid
                                                            #f2f1f7;
                                                    "
                                                >
                                                    Email
                                                </td>

                                                <td
                                                    style="
                                                        width: 16px;
                                                        background-color: #ffffff;
                                                    "
                                                ></td>
                                                <td width="1px"></td>

                                                <td
                                                    style="
                                                        width: 16px;
                                                        background-color: #ffffff;
                                                    "
                                                ></td>
                                                <td
                                                    style="
                                                        padding: 8px 0;
                                                        background-color: #ffffff;
                                                        border-bottom: 1px solid
                                                            #f2f1f7;
                                                        color: #071a38;
                                                    "
                                                >
                                                    ${email}
                                                </td>
                                                <td
                                                    style="
                                                        width: 16px;
                                                        background-color: #ffffff;
                                                    "
                                                ></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    style="
                        color: #333333;
                        font-family: 'Segoe UI', Arial, sans-serif;
                        font-size: 18px;
                    "
                >
                    <p>
                        Click nút dưới để quay về trang chủ
                    </p>
                    
                </div>
                <div style="margin-top: 50px; text-align: center">
                    <a href="${Oauth.GOOGLE_SUCCESS_REDIRECT_URL}" target="_blank"
                    style="
                    background-color: #55a7ff;
                    color: #ffffff;
                    padding: 15px 30px;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 20px;
                    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3);
                "
            >
                Shippy Smile
            </a>
                </div>
            </div>
        </div>
    </body>
            `,
        };
    }
    async sendEmail(): Promise<void> {
        this.transport.sendMail(this.options, (err, info) => {
            if (err) {
                Log.Error(new Date(), err, "SendEmail");
            } else {
                Log.Info(
                    new Date(),
                    "Success",
                    `Send Email okeee`,
                    "SendEmail"
                );
            }
        });
    }
}
