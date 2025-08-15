using System.Net.Mail;
using Microsoft.AspNetCore.Identity.UI.Services;

public class PapercutEmailSender : IEmailSender
{
    private readonly SmtpClient _smtp;

    public PapercutEmailSender()
    {
        _smtp = new SmtpClient("localhost", 25) // Papercut default SMTP
        {
            EnableSsl = false // Papercut doesn’t need SSL
        };
    }

    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        var mail = new MailMessage("noreply@localhost", email, subject, htmlMessage)
        {
            IsBodyHtml = true
        };
        return _smtp.SendMailAsync(mail);
    }
}
