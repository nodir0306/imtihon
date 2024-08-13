


CREATE DATABASE e_commerce_imtihon;




CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    phone VARCHAR,
    address VARCHAR
);



CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    image_url VARCHAR
);



CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    price DECIMAL NOT NULL,
    quantity INT,
    category_id SMALLINT,
    image_url VARCHAR,
    FOREIGN KEY (category_id) REFERENCES category(id)
);





CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id BIGINT,
    order_date TIMESTAMP NOT NULL,
    status VARCHAR(255),
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);



CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id SMALLINT,
    product_id SMALLINT,
    quantity INT NOT NULL,
    price BIGINT,
    isCredit BOOLEAN,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);



CREATE TABLE payment (
    id  SERIAL PRIMARY KEY,
    order_id SMALLINT,
    payment_date DATE NOT NULL,
    amount BIGINT,
    status VARCHAR,
    contract_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (contract_id) REFERENCES contracts(id)
);


CREATE TABLE contract_type (
    id SERIAL PRIMARY KEY,
    duration BIGINT,
    percentage INT
);


CREATE TYPE payment_enum AS ENUM ('5', '10', '15');
CREATE TYPE contract_status_enum AS ENUM ('finished', 'notFinished');

CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    order_id SMALLINT,
    customer_id SMALLINT,
    contract_type_id SMALLINT,
    monthly_payment payment_enum,
    contract_status contract_status_enum,
    starting_payment_percent INT,
    total_payment BIGINT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (contract_type_id) REFERENCES contract_type(id)
);
