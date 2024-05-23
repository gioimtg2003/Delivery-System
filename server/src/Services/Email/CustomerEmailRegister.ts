import { Oauth } from "../../Configs/oauth";
import { Log } from "../../Lib/Utils/Log";
import { EmailProvider } from "../Implements/EmailProvider";
import { SendMailOptions } from "nodemailer";
import { JsonWebToken } from "../JsonWebToken";

export class CustomerEmailRegister extends EmailProvider {
    private options: SendMailOptions;
    private token: JsonWebToken;
    private id_user: string;
    private email: string;
    constructor(
        email: string,
        shop_name: string,
        name: string,
        phone: string,
        id_user: string
    ) {
        super();
        this.token = new JsonWebToken();
        this.id_user = id_user;
        this.email = email;
        this.options = {
            from: "<p>Shippy Smile<>",
            to: email,
            subject: "Shippy Smile - Customer Confirmation",
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
                        Shippy thông báo bạn vừa đăng ký tài khoản thành công.
                        Vui lòng bấm vào xác nhận tài khoản ở bên dưới để sử dụng dịch vụ của chúng tôi.
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
                                                    Số điện thoại
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
                                                ${phone}
                                                </td>
                                                <td
                                                    style="
                                                        width: 16px;
                                                        background-color: #ffffff;
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
                                                    Tên khách hàng
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
                                                ${name}
                                                </td>
                                                <td
                                                    style="
                                                        width: 16px;
                                                        background-color: #ffffff;
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
                                                    "
                                                >
                                                    Tên cửa hàng
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
                                                        color: #071a38;
                                                    "
                                                >
                                                ${shop_name}
                                                </td>
                                                <td
                                                    style="
                                                        width: 16px;
                                                        background-color: #ffffff;
                                                    "
                                                ></td>
                                            </tr>

                                            <tr
                                                valign="top"
                                                height="8px"
                                                style="background: #ffffff"
                                            >
                                                <td
                                                    style="
                                                        border-bottom-left-radius: 12px;
                                                    "
                                                ></td>
                                                <td></td>
                                                <td></td>

                                                <td width="1px"></td>
                                                <td></td>
                                                <td></td>
                                                <td
                                                    style="
                                                        border-bottom-right-radius: 12px;
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
                        Vui lòng cLick vào nút kích hoạt tài khoản bên dưới để
                        kích hoạt tài khoản cho cửa hàng của bạn. 
                    </p>
                    <p>Nếu bạn không
                    thực hiện thao tác này, tài khoản của bạn sẽ không được
                    kích hoạt.</p>
                    <i style="margin-top: 5px;">
                    Lưu ý: Thời gian kích hoạt tài khoản là 15 phút
                    </i>
                </div>
                <div style="margin-top: 50px; text-align: center">
                    <a href="${
                        Oauth.GOOGLE_SUCCESS_REDIRECT_URL
                    }/verify?user=customer&token=${this.getToken()}&id=${id_user}" target="_blank"
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
                Kích hoạt ngay
            </a>
                </div>
            </div>
        </div>
    </body>
            `,
        };
    }
    async sendEmail() {
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
    private getToken(): string {
        let payload = {
            id: this.id_user,
            email: this.email,
            scope: "verify.email",
            role: "customer",
        };

        let token_uri = this.token.signOtherToken<typeof payload>(
            payload,
            60 * 15
        );
        return token_uri;
    }
}
