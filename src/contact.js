const form = document.querySelector("section.contact form");

const getEmailMessage = ({ from_name, email, subject, message } = {}) => {
  return `
      <p>You have received a new message from your contact form website:</p>
      <div style="background-color: #101010; color: #fbfbfb; padding: 12px">
          <p style="margin: 0;">Name: ${from_name}</p>
          <p style="margin: 12px 0;">Email: ${email}</p>
          <p style="margin: 0 0 12px;">Subject: ${subject}</p>
          <p style="margin: 0;">Message: ${message}</p>
      </div>
  `;
};

const sendEmail = async (emailMessage) => {
  const res = await fetch("https://sendmail-api-docs.vercel.app/api/send", {
    method: "POST",
    body: JSON.stringify({
      to: form?.email?.value,
      subject: form?.subject?.value,
      message: emailMessage,
    }),
  });

  return await res.json();
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    from_name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value,
  };

  const emailMessage = getEmailMessage(data);

  const res = await sendEmail(emailMessage);

  if (res.success) {
    window.open("success.html", "_self");
  }
};

addEventListener("submit", handleSubmit);
