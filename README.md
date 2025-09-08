# Rahhal - Your All-in-One Platform to Travel the World

<p align="center">
	<img width="412" height="153" alt="Rahhal" src="https://github.com/user-attachments/assets/0ae035a3-13a0-4179-ba98-511bd7f8d4ab" />
</p>

Rahhal is our project for the seventh semester **Advanced Computer Lab (ACL)** course at the German University in Cairo. The goal was to design a platform that simplifies vacation planning for tourists by combining everything they need in one place - from booking activities, joining fully planned itineraries, and purchasing tickets for historical sites, hotels, flights, and transportation, to even buying souvenirs. Rahhal also provides a space where advertisers, tour guides, sellers, and authorized tourism authorities can manage their businesses. You can find the full list of features we offer in [this sheet](https://docs.google.com/spreadsheets/d/1i6mHStVzos0D9_JLRtFxw-I7yGWB45-E/edit?usp=sharing&ouid=102190922931485059302&rtpof=true&sd=true), which was given to us as the desired list of requirements.

Find it live here: [rahhal-eight.vercel.app](https://rahhal-eight.vercel.app/)

## About this Repo

Rahhal is a **microservices project**, and in this repository you can find the code for the different services, along with guidance on how to use the system, set up the project on your local machine, and important technical details you need to know beforehand.
The client-side (frontend) code of the project can be found separately [here](https://github.com/AhmedHawater2003/rahhal-frontend-vercel).

## Table of Contents
2. [API Reference](#api-reference)
3. [Testing](#testing)
4. [Installation](#installation)
5. [Tech and Frameworks used](#tech-and-frameworks-used)
6. [How To Use](#how-to-use)
   - [Tourist](#tourist-tour)
   - [Admin](#admin-tour)
   - [Seller](#seller-tour)
   - [Tourguide](#tourguide-tour)
   - [Advertiser](#advertiser-tour)
   - [Tourism Governor](#tourismgov-tour)
8. [Build Status](#build-status)
9. [Features](#features)
  - [Guest Features](#as-a-guest-i-can)
  - [Tourist Features](#as-a-tourist-i-can)
  - [Admin Features](#as-an-admin-i-can)
  - [Tour Guide Features](#as-a-tour-guide-i-can)
  - [Advertiser Features](#as-an-advertiser-i-can)
  - [Seller Features](#as-a-seller-i-can)
  - [Tourism Governor Features](#as-a-tourism-governor-i-can)
10. [Code Style](#code-style)
   - [Naming Conventions](#naming-conventions)
   - [RESTful API Conventions](#restful-api-conventions)
11. [Contribute](#contribute)
15. [License](#license)

<a id="api-reference"></a>
## API Reference
![API Reference](https://github.com/user-attachments/assets/f9e9c678-9571-473f-9a37-088ad59a21a1)

### Feel free to check out the entire API <a href="https://app.swaggerhub.com/apis/AmrHegazy/rahhal-api/1.0.0">here</a>

### Note
You can also access the API reference by visiting the following link: `http://localhost:${PORT}/api-docs`
where `${PORT}` is the port number assigned to your api-gateway service.

<a id="testing"></a>
## Testing
We are using `vitest`. To run the tests, execute the following commands in the root directory of the project.

```bash
> chmod +x run-tests.sh
> ./run-tests.sh
```

We also tested the routes manually using postman
#### Feel free to check out the postman collection <a href="https://www.postman.com/dodzii/workspace/rahhal-test-routes/collection/28915840-b8fadf98-b1c6-4d08-882b-ab4bd97364d2?action=share&creator=28915840" target="_blank"> here </a>

<a id="installation"></a>
## Installation
- Clone the repo

```bash
> git clone https://github.com/Advanced-computer-lab-2024/Rahhal.git
> cd Rahhal
```

- Add a `.env` file for the environment variables in the root directory of the project for each service

<a id="client-frontend"></a>
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

<a id="api-gateway"></a>
### API-Gateway
```bash
PORT
GOOGLE_MAPS_API_KEY
EXCHANGE_RATES_API_KEY
STORAGE_BUCKET
```
<a id="authentication"></a>
### Authentication
```bash
SECRETKEY
PORT
MONGODB_URI
```
<a id="user"></a>
### User
```bash
PORT
MONGODB_URI
```
<a id="product"></a>
### Product
```bash
PORT
MONGODB_URI
```
<a id="order"></a>
### Order
```bash
PORT
MONGODB_URI
```
<a id="payment"></a>
### Payment
```bash
PORT
MONGODB_URI
STRIPE_SECRET_KEY
STRIPE_PUBLISH_KEY
```
<a id="notification"></a>
### Notification
```bash
PORT
MONGODB_URI
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
```
<a id="entertainment"></a>
### Entertainment
```bash
PORT
MONGODB_URI
```
<a id="booking"></a>
### Booking
```bash
PORT
MONGODB_URI
```
- Build the containers
```bash
> docker compose up --build
```


<a id="tech-and-frameworks-used"></a>
## Tech and Frameworks used

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [firebase](https://firebase.google.com/)
- [swagger](https://swagger.io/)
- [Stripe](https://stripe.com/)
- [prettier](https://prettier.io/)
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/)
- [VSCode](https://code.visualstudio.com/)
- [JWT](https://jwt.io/)
- [Docker](https://www.docker.com/)
- [ESlint](https://eslint.org/)
- [Husky](https://github.com/typicode/husky/tree/main)
- [RabbitMQ](https://www.rabbitmq.com/)

<a id="how-to-use"></a>
## How To Use
<a id="tourist-tour"></a>
### Tourist Tour

https://github.com/user-attachments/assets/bcfe5f9f-1e8c-4d16-93eb-c358d7b20189

<a id="admin-tour"></a>
### Admin Tour


https://github.com/user-attachments/assets/0df973c0-eefb-450f-8309-a8a55a684a39

<a id="seller-tour"></a>
### Seller Tour


https://github.com/user-attachments/assets/11cdafbf-450e-4093-a28d-3b07cd9b5b0f

<a id="tourguide-tour"></a>
### Tourguide Tour


https://github.com/user-attachments/assets/db0aed47-3fb5-4cfe-880e-72b1e0efa10c

<a id="advertiser-tour"></a>
### Advertiser Tour


https://github.com/user-attachments/assets/242e7f39-e2a4-421a-af27-cf5791b90377

<a id="tourismgov-tour"></a>
### Tourism Governor Tour


https://github.com/user-attachments/assets/d7d3d801-1107-4208-a200-4cb69767b52a


<a id="build-status"></a>
## Build Status

- Our project is currently under active development and not recommended for production environments.
- Preliminary testing completed
- Check Issues for a list of all the reported issues.
- Ongoing enhancements and feature improvements planned.
- Additional automated tests to be implemented.
- Performance and scalability optimizations in progress.

<a id="features"></a>
## Features
Our system serves different types of users (Guest, Tourist, Admin, Seller, Tour Guide, Advertiser, Tourism Governor)

<details>
<summary> As a Guest I can </summary>

- Register as a tourist with essential details.
- Register as a seller/tour guide/advertiser with username, email, and password.
- Upload and submit required documents upon registration as a seller/tour guide/advertiser.
- View step-by-step vacation guide.
- Choose a category of activities.
- Browse all upcoming activities, itineraries, and historical places/museums.
- Filter historical places/museums by tag.
- Sort and filter all upcoming activities/itineraries by various criteria.

</details>

<details>
<summary> As a Tourist I can </summary>

- Register and log in to the platform using username/email and password.
- Update personal profile, including preferences, contact details, wallet, and password.
- Delete my account.
- Reset password by receiving an OTP sent to the registered email address.
- View step-by-step vacation guide.
- Choose a category of activities.
- Browse all upcoming activities, itineraries, and historical places/museums.
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
<summary> As an Admin I can </summary>

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
<summary> As an Advertiser I can </summary>

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

- Create and manage my profile.
- Create, update, and delete museums and historical places.
- Add detailed location information.
- Define ticket prices for different visitor categories (foreigner, native, student).
- Create tags for historical locations.
- Define location types (Monuments, Museums, Religious Sites, Palaces/Castles).
- View list of created museums and historical places.
</details>

<a id="code-style"></a>
## Code Style
<a id="naming-conventions"></a>
### Naming Conventions
- We use camel case for variable names and function names.
- We use kabab case for file names.
- We use Pascal case for class names.
<a id="restful-api-conventions"></a>
### RESTful API Conventions
- Use nouns (not verbs) to represent resources
```typescript
✅ http://api.example.com/v1/store/items/{item-id}
❌ http://api.example.com/v1/store/CreateItems/{item-id}
```

- Use plural nouns for collections
```typescript
✅ http://api.example.com/v1/store/items/{item-id}
❌ http://api.example.com/v1/store/item/{item-id}
```

- Use hyphens (-) to improve readability
```typescript
✅ http://api.example.com/v1/store/inventory-management
❌ http://api.example.com/v1/store/inventory_management
```

- Use forward slashes for hierarchy, avoid trailing slashes
```typescript
✅ http://api.example.com/v1/store/items
❌ http://api.example.com/v1/store/items/
```

- Avoid file extensions in URIs
```typescript
✅ http://api.example.com/v1/store/items
❌ http://api.example.com/v1/store/items.json
```



<a id="contribute"></a>
## Contribute 
We welcome contributions to Rahhal! if you wish to contribute , it's as simple as:

1. Fork the repository
2. Clone the repository
3. Install dependencies
4. Create a new branch (git checkout -b my-new-feature)
5. Make your changes
6. Commit your changes (git commit -am 'Add some feature')
7. Push to the branch (git push origin my-new-feature)
8. Create a pull request
9. Wait for your pull request to be reviewed and merged


<a id="license"></a>
## License

The software is open source under the Apache 2.0 License.

- [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

