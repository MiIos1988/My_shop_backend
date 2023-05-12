const htmlActivation = (activationLink) => {
    return `<table style="width: 90%;margin: 0 auto;">
                <tr>
                    <td style="
                        font-size: 16px;
                        text-align: center;"
                    >
                        <p>Thank you for register to our shop.</p>
                        <p>One more step to compleate registration.</p>
                        <p>Just you must verify registration on next link</p>
                        <a href=${activationLink} style="
                            font-weight: 600;
                            padding: 15px 30px;
                            background-color: #0156FF;
                            color: #ffffff;
                            border-radius: 30px;
                            display: inline-block;
                            text-decoration: none;
                        ">Activate your account!</a>
                    </td>
                </tr>
            </table>`.trim()
}

module.exports = htmlActivation 