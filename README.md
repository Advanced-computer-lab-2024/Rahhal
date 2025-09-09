# Rahhal - Your All-in-One Platform to Travel the World

<p align="center">
	<img width="412" height="153" alt="Rahhal" src="https://github.com/user-attachments/assets/0ae035a3-13a0-4179-ba98-511bd7f8d4ab" />
</p>

Rahhal is our project for the seventh semester **Advanced Computer Lab (ACL)** course at the German University in Cairo. The goal was to design a platform that simplifies vacation planning for tourists by combining everything they need in one place - from booking activities, joining fully planned itineraries, and purchasing tickets for historical sites, hotels, flights, and transportation, to even buying souvenirs. Rahhal also provides a space where advertisers, tour guides, sellers, and authorized tourism authorities can manage their businesses. You can find the full list of features we offer in [this sheet](https://docs.google.com/spreadsheets/d/1i6mHStVzos0D9_JLRtFxw-I7yGWB45-E/edit?usp=sharing&ouid=102190922931485059302&rtpof=true&sd=true), which was given to us as the desired list of requirements.

Find it live here: [rahhal-eight.vercel.app](https://rahhal-eight.vercel.app/)

## About this Repo

Rahhal is a **microservices project**, and in this repository you can find the code for the different services, along with guidance on how to use the system, set up the project on your local machine, and important technical details you need to know beforehand.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Hook Form](https://img.shields.io/badge/react%20hook%20form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![React Query](https://img.shields.io/badge/react%20query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/🐻%20Zustand-000000?style=for-the-badge&logoColor=white)
![Zod](https://img.shields.io/badge/zod-3068B7?style=for-the-badge&logo=reacthookform&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Supabase](https://img.shields.io/badge/supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![ESLint](https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Husky](https://img.shields.io/badge/husky-000000?style=for-the-badge&logo=git&logoColor=white)
![Swagger](https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Postman](https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Google Cloud](https://img.shields.io/badge/google%20cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![Google Maps](https://img.shields.io/badge/google%20maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)
![Figma](https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Stripe](https://img.shields.io/badge/stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)


## Table of Contents
1. [API Reference](#api-reference)
2. [Test Suites](#test-suites)
3. [UI Design](#ui-design)
4. [Local Development](#local-development)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

<a id="api-reference"></a>

## API Reference

<img width="2530" height="1346" alt="image" src="https://github.com/user-attachments/assets/b48d1303-e0dc-4855-acaf-166130bb8b47" />

All backend services are running behind an **API Gateway**, which handles requests from the client-side through a **REST API**. You can check the [Swagger OpenAPI Specification](https://swagger.io/specification/) of the entire API [here](https://app.swaggerhub.com/apis/AmrHegazy/rahhal-api/1.0.0).

<a id="test-suites"></a>

## Test Suites

A simple suite of unit tests was written for most of the services. While they do not cover all possible cases, they still provide a good foundation for building more comprehensive test suites in the future. We are using `vitest` for running the unit tests, and you can run the tests for the different services by executing the following commands in the root directory of the project:

```bash
# On a Linux environment (e.g. native linux, wsl, git terminal)
chmod +x run-tests.sh
./run-tests.sh
```

We also tested some of the routes manually using **Postman Collections**. You can check the collection we used [here](https://www.postman.com/dodzii/workspace/rahhal-test-routes/collection/28915840-b8fadf98-b1c6-4d08-882b-ab4bd97364d2?action=share&creator=28915840).

<a id="run-it-locally"></a>

## UI Design

<img width="1681" height="1093" alt="image" src="https://github.com/user-attachments/assets/399013e1-393a-49ae-8313-20f057bf1e87" />

The website’s UI design was created in **Figma**, following a custom design system. The Figma project includes the main color palette, design sketches for different pages of the system, custom-designed logos, and more.
You can view the Figma design system [here](https://www.figma.com/design/Cs0qZl2MJJk4wwUw40lFWr/Rahhal-Website-Design?node-id=0-1&p=f&t=fMssLu5sV32Y0Gas-0).

<a id="local-development"></a>

## Local Development

In the project structure, each directory represents a separate **microservice**. After cloning the repo to your local machine, the first step is to go to each service directory and create a new `.env` file (if required). These `.env` files should contain all the necessary environment variables for the service to operate. You can find a `.env.example` file in each directory to guide you, which specifies the required variables along with brief descriptions.

> Services that do not have a `.env.example` file require no `.env` file to run locally.

After creating and populating the `.env` files, run the following command in the project’s root directory to build all the microservice Docker images and run the containers in the background:

```bash
docker compose up -d
```

Once all containers are up, you can check if they are running properly using `docker ps` and remove all containers using `docker compose down`. On the first run, this process may take some time since all images will be built from scratch. However, subsequent runs will be much faster as only the containers need to be started.

Finally, you can open the client-side frontend locally in your browser at `http://localhost:5173` and monitor the Docker containers using **Docker Desktop**.

<a id="usage"></a>

## Usage

This section includes short videos that briefly illustrate how to navigate and use the system as different stakeholders:

### Tourist Tour

[https://github.com/user-attachments/assets/bcfe5f9f-1e8c-4d16-93eb-c358d7b20189](https://github.com/user-attachments/assets/bcfe5f9f-1e8c-4d16-93eb-c358d7b20189)

### Admin Tour

[https://github.com/user-attachments/assets/0df973c0-eefb-450f-8309-a8a55a684a39](https://github.com/user-attachments/assets/0df973c0-eefb-450f-8309-a8a55a684a39)

### Seller Tour

[https://github.com/user-attachments/assets/11cdafbf-450e-4093-a28d-3b07cd9b5b0f](https://github.com/user-attachments/assets/11cdafbf-450e-4093-a28d-3b07cd9b5b0f)

### Tour Guide Tour

[https://github.com/user-attachments/assets/db0aed47-3fb5-4cfe-880e-72b1e0efa10c](https://github.com/user-attachments/assets/db0aed47-3fb5-4cfe-880e-72b1e0efa10c)

### Advertiser Tour

[https://github.com/user-attachments/assets/242e7f39-e2a4-421a-af27-cf5791b90377](https://github.com/user-attachments/assets/242e7f39-e2a4-421a-af27-cf5791b90377)

### Tourism Governor Tour

[https://github.com/user-attachments/assets/d7d3d801-1107-4208-a200-4cb69767b52a](https://github.com/user-attachments/assets/d7d3d801-1107-4208-a200-4cb69767b52a)

---

<a id="contributing"></a>

## Contributing

We welcome contributions to **Rahhal**! If you wish to contribute, simply fork the repository and create a pull request.
When adding your changes, please make sure to follow these code styling rules to maintain consistency across the codebase:

### Naming Conventions

* Use **camelCase** for variable names and function names.
* Use **kebab-case** for file names.
* Use **PascalCase** for class names.

### RESTful API Conventions

* **Use nouns (not verbs) to represent resources**

```typescript
✅ http://api.example.com/v1/store/items/{item-id}
❌ http://api.example.com/v1/store/CreateItems/{item-id}
```

* **Use plural nouns for collections**

```typescript
✅ http://api.example.com/v1/store/items/{item-id}
❌ http://api.example.com/v1/store/item/{item-id}
```

* **Use hyphens (-) to improve readability**

```typescript
✅ http://api.example.com/v1/store/inventory-management
❌ http://api.example.com/v1/store/inventory_management
```

* **Use forward slashes for hierarchy, avoid trailing slashes**

```typescript
✅ http://api.example.com/v1/store/items
❌ http://api.example.com/v1/store/items/
```

* **Avoid file extensions in URIs**

```typescript
✅ http://api.example.com/v1/store/items
❌ http://api.example.com/v1/store/items.json
```

---

<a id="license"></a>

## License

This software is open source under the **Apache 2.0 License**.

* [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
