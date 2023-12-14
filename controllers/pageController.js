const nodemailer = require("nodemailer")

exports.getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getBlogPage = (req, res) => {
  res.status(200).render("blog", {
    page_name: "blog",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.sendMail = async (req, res) => {
  console.log(req.body);
  try {
    const outputMessage = ` 
    <h1>Mail Details</h1> 
    <ul> 
        <li>Name: ${req.body.name}</li> 
        <li>Email: ${req.body.email}</li> 
    </ul> 
    <h1>Message</h1> 
    <p>${req.body.message}</p> 
    `;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", //  gmaile yönlendiriyoruz.
      port: 465, //  portu 465 e ayarlıyoruz.
      secure: true, //  true for 465, false for other ports
      auth: {
        user: "drmuratgokduman@gmail.com", //  gmail accont: maili gönderecek olan adres
        pass: "eqocuuyuqcrxxyhc", //  gmail password yerine google account içinde güvenlik kısmında uygulama şifrelerine girilir ve uygulama şifresi oluşturulur. uygulama: posta cihaz: windows bilgisayar
      },
    });

    let info = await transporter.sendMail({
      from: '"Fixtures" <drmuratgokduman@gmail.com>', //  gönderen adres
      to: "drmuratgokduman@gmail.com", //  alan adres
      subject: "Fixtures Form New Message ✔", //  konu
      html: outputMessage, // mesajın gövdesi: yukarıda oluşturmuştuk
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).redirect("contact");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
