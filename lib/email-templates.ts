export const getOTPEmailTemplate = (otp: string, email: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Your SMILEY Verification Code 🔐</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .mobile-center {
                text-align: center !important;
            }
            .mobile-padding {
                padding: 20px !important;
            }
            .mobile-font-large {
                font-size: 24px !important;
            }
            .mobile-font-medium {
                font-size: 18px !important;
            }
            .mobile-font-small {
                font-size: 14px !important;
            }
            .mobile-otp {
                font-size: 28px !important;
                letter-spacing: 4px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6;">
    <!-- Preheader text -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Your SMILEY verification code is: ${otp}
    </div>
    
    <!-- Main container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #FF6B9D 0%, #FFD93D 50%, #6BCF7F 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                🦷 SMILEY
                            </h1>
                            <p style="color: #ffffff; font-size: 16px; margin: 10px 0 0 0; opacity: 0.95; font-weight: 500;">
                                Your Colorful Oral Care Journey Starts Here!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;" class="mobile-padding">
                            <h2 style="color: #6C63FF; font-size: 28px; margin: 0 0 20px 0; text-align: center; font-weight: 600;" class="mobile-font-large">
                                Verify Your Email Address 🔐
                            </h2>
                            
                            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0; text-align: center;" class="mobile-font-medium">
                                Hi there! We're excited to have you join the SMILEY family. To complete your account setup, please verify your email address using the code below.
                            </p>
                            
                            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 30px 0; text-align: center;" class="mobile-font-medium">
                                This verification code will expire in <strong style="color: #FF6B9D;">10 minutes</strong> for your security.
                            </p>
                            
                            <!-- OTP Code Display -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center; padding: 30px 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; border: 3px dashed #6C63FF;">
                                        <p style="color: #666; font-size: 14px; margin: 0 0 15px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                            Your verification code:
                                        </p>
                                        <div style="font-size: 36px; font-weight: 700; color: #6C63FF; letter-spacing: 8px; font-family: 'Courier New', monospace; margin: 15px 0; text-shadow: 0 2px 4px rgba(108, 99, 255, 0.2);" class="mobile-otp">
                                            ${otp}
                                        </div>
                                        <p style="color: #999; font-size: 12px; margin: 15px 0 0 0; font-style: italic;">
                                            Enter this code on the verification page
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Security Notice -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); border: 1px solid #ffd93d; border-radius: 12px; padding: 20px;">
                                        <p style="color: #856404; font-size: 14px; margin: 0; line-height: 1.5; font-weight: 500;">
                                            <strong style="color: #6C63FF;">🔒 Security Notice:</strong> Never share this code with anyone. SMILEY will never ask for your verification code via phone, email, or text message.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Features -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 25px;">
                                        <h3 style="color: #6C63FF; font-size: 20px; margin: 0 0 20px 0; font-weight: 600; text-align: center;">
                                            What's waiting for you after verification:
                                        </h3>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                                                    🍓 Delicious fruity toothpastes
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                                                    🦷 Fun and colorful toothbrushes
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                                                    💧 Refreshing mouthwashes
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                                                    📦 Convenient subscription options
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                                                    🎁 Exclusive member benefits
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="font-size: 14px; color: #666; line-height: 1.5; margin: 30px 0 0 0; text-align: center;" class="mobile-font-small">
                                If you didn't request this verification code, you can safely ignore this email.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4;">
                                © 2025 SMILEY. This email was sent to ${email}
                            </p>
                            <p style="color: #999; font-size: 11px; margin: 5px 0 0 0;">
                                If you have any questions, please contact our support team.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
}

export const getWelcomeEmailTemplate = (name?: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Welcome to SMILEY 🎉</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .mobile-center {
                text-align: center !important;
            }
            .mobile-padding {
                padding: 20px !important;
            }
            .mobile-font-large {
                font-size: 24px !important;
            }
            .mobile-font-medium {
                font-size: 18px !important;
            }
            .mobile-font-small {
                font-size: 14px !important;
            }
            .mobile-button {
                display: block !important;
                width: 100% !important;
                text-align: center !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6;">
    <!-- Preheader text -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Welcome to SMILEY! Your account is now active and ready to use.
    </div>
    
    <!-- Main container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #FF6B9D 0%, #FFD93D 50%, #6BCF7F 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                🦷 SMILEY
                            </h1>
                            <p style="color: #ffffff; font-size: 16px; margin: 10px 0 0 0; opacity: 0.95; font-weight: 500;">
                                Your Colorful Oral Care Journey Starts Here!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;" class="mobile-padding">
                            <h2 style="color: #6C63FF; font-size: 28px; margin: 0 0 20px 0; text-align: center; font-weight: 600;" class="mobile-font-large">
                                Welcome to SMILEY! 🎉
                            </h2>
                            
                            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0; text-align: center;" class="mobile-font-medium">
                                ${name ? `Hi ${name}! ` : ''}Thanks for joining the SMILEY family! We're excited to have you on board for your colorful oral care journey.
                            </p>
                            
                            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 30px 0; text-align: center;" class="mobile-font-medium">
                                Your email has been successfully verified and your account is now active! You can start exploring our amazing collection of fruity toothpastes, fun toothbrushes, and refreshing mouthwashes.
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/shop" 
                                           style="display: inline-block; background: linear-gradient(135deg, #FF6B9D 0%, #FFD93D 100%); color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 30px; font-weight: 700; font-size: 16px; box-shadow: 0 6px 20px rgba(255, 107, 157, 0.3); transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;" class="mobile-button">
                                            🛍️ Start Shopping
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Features -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 25px;">
                                        <h3 style="color: #6C63FF; font-size: 20px; margin: 0 0 20px 0; font-weight: 600; text-align: center;">
                                            What's waiting for you:
                                        </h3>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                                                    🍓 Delicious fruity toothpastes
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                                                    🦷 Fun and colorful toothbrushes
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                                                    💧 Refreshing mouthwashes
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                                                    📦 Convenient subscription options
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                                                    🎁 Exclusive member benefits
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="font-size: 14px; color: #666; line-height: 1.5; margin: 30px 0 0 0; text-align: center;" class="mobile-font-small">
                                Thank you for choosing SMILEY for your oral care needs!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.4;">
                                © 2025 SMILEY. 
                            </p>
                            <p style="color: #999; font-size: 11px; margin: 5px 0 0 0;">
                                If you have any questions, please contact our support team.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
}
