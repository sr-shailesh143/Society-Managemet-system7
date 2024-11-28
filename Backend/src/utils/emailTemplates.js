exports.ForgotFormatResident = (name, email, password) => `
  <p>Hello ${name},</p>
  <p>Your account has been created successfully. Here are your login details:</p>
  <ul>
    <li>Email: ${email}</li>
    <li>Password: ${password}</li>
  </ul>
  <p>Please log in and change your password for security reasons.</p>
`;