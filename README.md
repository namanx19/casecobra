# CaseCobra - A NextJs based e-Commerce Application

## Overview
This project is a full-stack e-commerce application built using Next.js, TailwindCSS, PostgreSQL, KindeAuth (for authentication), and UploadThing (for image uploading). The platform allows users to customize phone cases by uploading their own images, previewing their designs, and securely purchasing the personalized products via Stripe payment integration. The application ensures secure payment processing through webhooks provided by Stripe, safeguarding transactions and ensuring a smooth customer experience.

## Key Features
1. Created a **NextJs 14** app.
2. Responsive design built with **TailwindCSS** ensuring a seamless user experience on both desktop and mobile devices.
3. Implemented user authentication and authorization using **KindeAuth**, ensuring that only registered users can upload images, customize products, and make purchases.
4. Users can upload their photos using **UploadThing** to design and preview customized phone cases.
5. Real-time **customization** tools allowing users to position, resize, and apply filters to their photos on the phone case mockup.
6. A dynamic product catalog where users can select their preferred phone model and type of phone case.
7. **Stripe integration** to handle payments, providing a trusted and secure payment gateway for users.
8. **Stripe Webhooks** ensure secure and reliable payment processing. The webhooks are used to verify successful transactions, trigger order confirmation emails, and manage failed or incomplete payments.
9. **PostgreSQL** is used for managing user data, orders, and product information.
10. Efficient database management using **Prisma** ensures smooth order tracking, user preferences, and case design data storage.
11. **Admin** functionality to manage and process orders, including generating shipping labels and tracking information.
15. Code available on [GitHub](https://github.com/namanx19/casecobra).
16. Website deployed on Vercel. [Link](https://casecobra-amber.vercel.app/).

## Setup Instructions
To set up the project locally, follow these steps:

1. Clone the repository:
`https://github.com/namanx19/casecobra`

2. Navigate to the project directory: `cd <PATH_OF_DIRECTORY>`

4. Install dependencies: `npm install`
    
11. Add a `.env` file inside the root directory with the following details:

| Key                              | Value                        |
|-----------------------------------|------------------------------|
| KINDE_CLIENT_ID                   | `<KINDE_CLIENT_ID>`          |
| KINDE_CLIENT_SECRET               | `<KINDE_CLIENT_SECRET>`      |
| KINDE_ISSUER_URL                  | `<KINDE_ISSUER_URL>`         |
| KINDE_SITE_URL                    | `<KINDE_SITE_URL>`           |
| KINDE_POST_LOGOUT_REDIRECT_URL    | `<KINDE_POST_LOGOUT_REDIRECT_URL>` |
| KINDE_POST_LOGIN_REDIRECT_URL     | `<KINDE_POST_LOGIN_REDIRECT_URL>`  |
| ADMIN_EMAIL                       | `<ADMIN_EMAIL>`              |
| UPLOADTHING_SECRET                | `<UPLOADTHING_SECRET>`       |
| UPLOADTHING_APP_ID                | `<UPLOADTHING_APP_ID>`       |
| UPLOADTHING_TOKEN                 | `<UPLOADTHING_TOKEN>`        |
| DATABASE_URL                      | `<DATABASE_URL>`             |
| STRIPE_SECRET_KEY                 | `<STRIPE_SECRET_KEY>`        |
| STRIPE_WEBHOOK_SECRET             | `<STRIPE_WEBHOOK_SECRET>`    |
| EXCHANGE_RATE_KEY                 | `<EXCHANGE_RATE_KEY>`        |
| NEXT_PUBLIC_SERVER_URL            | `<NEXT_PUBLIC_SERVER_URL>`   |


11. Admin Panel is only accessible when you login with the admin email id which is present in the env.

## Screenshots
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2137d9ce-1571-40fa-a2f4-b95e7a7c3b8d" alt="1 landingpage" width="450" height="auto"></td>
    <td><img src="https://github.com/user-attachments/assets/32bae385-f42c-4f31-866d-62592b148802" alt="2 upload" width="450" height="auto"></td>
  </tr>

  <tr>
    <td><img src="https://github.com/user-attachments/assets/983dd1e4-2633-4bce-90a2-1cffb5bcbc66" alt="4 design" width="450" height="auto"></td>
    <td><img src="https://github.com/user-attachments/assets/31d55424-319e-4d29-ac4e-6e0d02797e1f" alt="5 preview" width="450" height="auto"></td>
  </tr>
</table>

### Questions or Issues?
Feel free to reach out to ```naman.mw4@gmail.com``` if you have any questions or encounter any issues while setting up or using CaseCobra. Happy coding!
