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


