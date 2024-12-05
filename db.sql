DROP TABLE IF EXISTS customer_quotes;

CREATE TABLE customer_quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,   
    isFinalized BOOLEAN DEFAULT FALSE,
    associateID VARCHAR(255) NOT NULL,   
    custID INT NOT NULL,                 
    price DECIMAL(10, 2) NOT NULL,       
    email VARCHAR(255),                   
    description TEXT,                    
    secretNotes TEXT
);

DROP TABLE IF EXISTS sales_associates;

CREATE TABLE sales_associates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    passwrd VARCHAR(255) NOT NULL
);

CREATE TABLE finalized (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    passwrd VARCHAR(255) NOT NULL
);

CREATE TABLE purchaseOrder (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    passwrd VARCHAR(255) NOT NULL
);

CREATE TABLE adminDB(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    passwrd VARCHAR(255) NOT NULL
);

CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    final_price DECIMAL (20,2),
    quote_id VARCHAR(50),
    sales_id VARCHAR(10),
    cust_id VARCHAR(10),
    processDay VARCHAR(20)
)


