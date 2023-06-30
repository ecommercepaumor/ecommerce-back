const request = require("supertest");
const app = require("../app");
require("../models");
const Category = require("../models/Category");

const BASE_URL = "/api/v1/products";
const BASE_URL_USER = "/api/v1/users/login";
let TOKEN;
let category;
let productId;

beforeAll(async () => {
  const user = {
    email: "paumor271@hotmail.com",
    password: "1234",
  };
  const res = await request(app).post(BASE_URL_USER).send(user);
  TOKEN = res.body.token;
});

test("POST -> 'BASE_URL', should status code 201 and res.body.title === body.title", async () => {
  const categoryBody = {
    name: "tech",
  };
  category = await Category.create(categoryBody);

  const product = {
    title: "Macbook 14",
    description: "lorem ipsum",
    price: "200.30",
    categoryId: category.id,
  };

  const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`);

  productId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.title).toBe(product.title);
});

test("GET -> 'BASE_URL', should return status code 200 and res.body to have length 1", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> 'BASE_URL/:id', should return status code 200 and res.body to have length 1", async () => {
  const res = await request(app).get(`${BASE_URL}/${productId}`);

  expect(res.status).toBe(200);
  expect(res.body.title).toBe("Macbook 14");
});

test("PUT -> 'BASE_URL/:id', should return status code 200 res.body.title === body.title", async () => {
  const product = {
    title: "Macbook 14",
  };
  const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body.title).toBe(product.title);
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);
  await category.destroy();
});
