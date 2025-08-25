using Mailjet.Client;
using Mailjet.Client.TransactionalEmails;
using Microsoft.AspNetCore.Identity.UI.Services;
public class MailjetEmailSender : IEmailSender
{
    private readonly string _apiKey;
    private readonly string _secretKey;

    public MailjetEmailSender(IConfiguration config)
    {
        _apiKey = config["MailjetApiKey"];
        _secretKey = config["MailjetSecretKey"];
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        var client = new MailjetClient(_apiKey, _secretKey);

        var message = new TransactionalEmailBuilder()
            .WithFrom(new SendContact("oleksiy678@gmail.com")) // must match Mailjet verified sender
            .WithSubject(subject)
            .WithHtmlPart(htmlMessage)
            .WithTo(new SendContact(email))
            .Build();

        await client.SendTransactionalEmailAsync(message);
    }
}
