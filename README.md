# Rahhal

## Testing
We are using `vitest`. To run the tests.
Execute the following commands in the root directory of the project.
  

```bash
> chmod +x run-tests.sh
>./run-tests.sh
```

## Installation
```bash
> git clone https://github.com/Advanced-computer-lab-2024/Rahhal.git
> cd Rahhal
> docker compose up --build
```

## Credits
- [shadcn](https://ui.shadcn.com)
- [RabbitMQ Docs](https://www.rabbitmq.com/docs)
- [Stripe docs](https://stripe.com/docs)
- [TypeScript Crash Course](https://www.youtube.com/watch?v=BCg4U1FzODs)
- [React Crash Course](https://www.youtube.com/watch?v=LDB4uaJ87e0&pp=ygUbcmVhY3QgY291cnNlIHRyYXZlcnN5IG1lZGlh)
- [Tailwind CSS Crash Course](https://www.youtube.com/watch?v=dFgzHOX84xQ)
- [Vite Crash Course](https://www.youtube.com/watch?v=89NJdbYTgJ8&pp=ygUEVml0ZQ%3D%3D)
- [React Query Hook + Zod](https://www.youtube.com/watch?v=u6PQ5xZAv7Q)
- [MongoDB Crash Course](https://www.youtube.com/watch?v=DZBGEVgL2eE&pp=ygUUTW9uZ29zZSBjcmFzaCBjb3Vyc2U%3D)
- [How to build NodeJS Microservice - NodeJS Monolithic to Microservice Architecture](https://www.youtube.com/watch?v=EXDkgjU8DDU&list=PLaLqLOj2bk9ZV2RhqXzABUP5QSg42uJEs&index=1&pp=iAQB)




## Motivation

Welcome to Rahhal, your all-in-one travel planner! We created Rahhal to simplify vacation planning by offering personalized itineraries, seamless bookings, and budget-friendly suggestions all in one platform. Whether you’re exploring historic sites, relaxing on beaches, or discovering local gems, Rahhal makes it easy to plan and enjoy your perfect trip. Stay organized with real-time updates, expert tours, and exclusive local experiences. Start your journey stress-free with Rahhal!


## Tech and Frameworks used

-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [React](https://reactjs.org/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [firebase](https://firebase.google.com/)
-   [swagger](https://swagger.io/)
-   [Stripe](https://stripe.com/)
-   [prettier](https://prettier.io/)
-   [Git](https://git-scm.com/)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
-   [Postman](https://www.postman.com/)
-   [VSCode](https://code.visualstudio.com/)
-   [JWT](https://jwt.io/)
-   [Docker](https://www.docker.com/)
-   [ESlint](https://eslint.org/)
-   [Husky](https://github.com/typicode/husky/tree/main)


## How To Use


- Add a `.env` file for the environment variables in the root directory of the project each service

### Client (Frontend)
```bash

PORT
GOOGLE_MAPS_API_KEY
EXCHANGE_RATES_API_KEY
AMADEUS_AUTH_URL
AMADEUS_TRANSFER_URL
AMADEUS_API_KEY
AMADEUS_API_SECRET
STORAGE_BUCKET
GOOGLE_MAPS_API_KEY
```

### API-Gateway
```bash
PORT
GOOGLE_MAPS_API_KEY
EXCHANGE_RATES_API_KEY
STORAGE_BUCKET
```

### Authentication
```bash
SECRETKEY
PORT
MONGODB_URI
```
### User
```bash

PORT
MONGODB_URI
```

### Product
```bash

PORT
MONGODB_URI
```
### Order
```bash
PORT
MONGODB_URI
```
### Payment
```bash
PORT
MONGODB_URI
STRIPE_SECRET_KEY
STRIPE_PUBLISH_KEY
```

### Notification
```bash
PORT
MONGODB_URI
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
```

### Entertainment
```bash
PORT
MONGODB_URI
```
### Booking
```bash
PORT
MONGODB_URI
```


## License

The software is open source under the Apache 2.0 License.

-   [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)




## Build Status

- Our project is currently under active development and not recommended for production environments.
- Preliminary testing completed
- Check Issues for a list of all the reported issues.
- Ongoing enhancements and feature improvements planned.
- Additional automated tests to be implemented.
- Performance and scalability optimizations in progress.


## Features
Our system serves different type of users (Guest,Tourist, Admin, Seller, Tour Guide, Advertiser,Tourism Governor)

<summary> As a Guest I can </summary>

- Register as a tourist with essential details.
- Register as a seller/tour guide/advertiser with username, email and password
- upload and submit required documents upon registrationas as a seller/tour guide/advertiser.
- View step-by-step vacation guide.
- Choose a category of activities.
- Browse all upcoming activities, itineraries and historial places/museums.
- Filter historical places/museums by tag.
- Sort and filter all upcoming activities/itineraries by various criteria.

</details>


<details>

<summary> As a Tourist I can </summary>

- Register and log in to the platform using username/email and password.
- Update personal profile, including preferences, contact details, wallet and password.
- Delete my account.
- Reset password by receiving an OTP sent to the registered email address.
- View step-by-step vacation guide.
- Choose a category of activities.
- Browse all upcoming activities, itineraries and historial places/museums.
- Filter historical places/museums by tag.
- Sort and filter all upcoming activities/itineraries.
- Receive personalized recommendations based on my preferences.
- Book tickets for events, activities, and itineraries.
- Pay online using credit/debit card or wallet.
- Cancel bookings within 48 hours.
- Receive payment receipts via email.
- View upcoming and past bookings.
- Select vacation preferences.
- Choose currency for viewing prices.
- Bookmark and save events.
- Request event booking notifications.
- Receive event reminders via app and email.
- Rate and comment on tour guides, itineraries, and activities.
- Share activities and itineraries.
- Book complementary services (flights, hotels, transportation).
- Earn loyalty points on payments.
- Receive badges based on point levels.
- Redeem points for wallet credit.
- Browse and search products.
- Manage wishlist.
- Add items to cart.
- Checkout with multiple payment options.
- Manage orders.
- Rate and review purchased products.
- File and track complaints.

</details>



<details>

<summary> As a Admin I can </summary>

- Add tourism governors and admins.
- View and manage user registrations.
- Delete user accounts.
- Monitor user statistics.
- Manage activity categories and tags.
- Create and manage preference tags.
- Flag inappropriate events.
- View sales reports.
- View and manage user complaints.
- Respond to and resolve complaints.
- Add new products with comprehensive details.
- View product details including available quantity and sales.
- Search and filter products.
- Create promotional codes.
- Manage product listings (add, edit, archive).

</details>



<details>

<summary> As a Tour Guide I can </summary>

- Create and manage professional profile.
- Upload profile picture.
- Manage itinerary creation and management.
- Activate/deactivate itineraries.
- Receive notifications about flagged content.
- View a list of all created itineraries.
- View sales reports.
- Filter sales data.
- Track tourist engagement.

</details>

<details>

<summary> As a Advertiser I can </summary>

- Create and manage company profile.
- Upload company logo.
- Manage activity listings.
- Receive notifications about flagged content.
- View sales reports.
- Filter sales data.
- Track tourist engagement.
- View a list of all created activities.

</details>

<details>

<summary> As a Seller I can </summary>

- Create and manage seller profile.
- View sales reports.
- Add new products with full details.
- Upload product images.
- Edit product details and pricing.
- Search products by name.
- Filter products by price.
- Sort products by ratings.
- View product inventory and sales.
- Archive and unarchive products.
- Receive notifications when a product goes out of stock.

</details>

<details>

<summary> As a Tourism Governor I can </summary>

- create and manage my profile.
- Create, update, and delete museums and historical places.
- Add detailed location information.
- Define ticket prices for different visitor categories (foreigner, native, student).
- Create tags for historical locations.
- Define location types (Monuments, Museums, Religious Sites, Palaces/Castles).
- View list of created museums and historical places.

</details>


