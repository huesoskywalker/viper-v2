export function passwordResetHtml(params: {
   username: string
   token: string
   remainingHours: number
}) {
   const { username, token, remainingHours } = params
   return `
<table cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#F5F8FA" width="100%"  dir="ltr" style="padding:0px;line-height:1px;font-size:1px;margin:0px auto">
  <tbody>
    <tr>
      <td style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">
        <table cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#ffffff" width="450"  style="padding:0px;line-height:1px;font-size:1px;margin:0px auto">
          <tbody>
            <tr>
              <td  width="24" style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">&nbsp;</td>
              <td style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">
                <table cellpadding="0" cellspacing="0" border="0" align="center" dir="ltr" style="padding:0px;line-height:1px;font-size:1px;margin:0px auto">
                  <tbody>
                    <tr>
                      <td height="24" style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="right" style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px;font-size:0px;line-height:100%;padding:0px">
                          <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;padding:0px;margin:0px;font-weight:bold;line-height:32px">Viper</p>
                      </td>
                    </tr>
                    <tr>
                      <td height="24" style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="left" dir="ltr" style="padding:0px;margin:0px auto;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;padding:0px;margin:0px;font-weight:bold;line-height:32px">
                        Reset your password?
                      </td>
                    </tr>
                    <tr>
                      <td height="24" style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="left" dir="ltr" style="padding:0px;margin:0px auto;font-family:'Helvetica Neue Light',Helvetica,Arial,sans-serif;font-size:16px;padding:0px;margin:0px;font-weight:normal;line-height:20px;font-family:'Helvetica Neue Light',Helvetica,Arial,sans-serif;font-size:16px;padding:0px;margin:0px;font-weight:normal;line-height:22px">
                      If you requested a password reset for @${username}, use the confirmation code below to complete the process. If you didn&apos;t make this request, ignore this email.
                      </td>
                    </tr>
                    <tr>
                      <td height="24" style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">&nbsp;</td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="left" dir="ltr" style="padding:0px;margin:0px auto;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:20px;padding:0px;margin:0px;font-weight:600;line-height:30px">
                        ${token}
                      </td>
                    </tr>
                    <tr>
                      <td height="6" style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="left" dir="ltr" style="padding:0px;margin:0px auto;font-family:'Helvetica Neue Light',Helvetica,Arial,sans-serif;font-size:14px;padding:0px;margin:0px;font-weight:normal;line-height:18px">
                        Verification codes expire after ${remainingHours} hours.
                      </td>
                    </tr>
                    <tr>
                      <td height="24" style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="left" dir="ltr" style="padding:0px;margin:0px auto;font-family:'Helvetica Neue Light',Helvetica,Arial,sans-serif;font-size:16px;padding:0px;margin:0px;font-weight:normal;line-height:20px;font-family:'Helvetica Neue Light',Helvetica,Arial,sans-serif;font-size:16px;padding:0px;margin:0px;font-weight:normal;line-height:22px">
                        Thanks,<br> Viper
                      </td>
                    </tr>
                    <tr>
                      <td height="32" style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td  width="24" style="padding:0px;margin:0px auto;font-size:0px;line-height:1px;padding:0px">&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <table cellpadding="0" cellspacing="0" border="0" align="center" width="450"  bgcolor="#ffffff" style="padding:0px;line-height:1px;font-size:1px;margin:0px auto">
          <tbody>
            <!-- ... Other rows ... -->
          </tbody>
        </table>
      </td>
    </tr>
    <!-- ... Other rows ... -->
  </tbody>
</table>

  `
}
