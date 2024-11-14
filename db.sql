CREATE TABLE IF NOT EXISTS customer_quotes (
    associateID VARCHAR(255) NOT NULL,   
    custID INT NOT NULL,                  
    price DECIMAL(10, 2) NOT NULL,       
    email VARCHAR(255),                   
    description TEXT,                    
    secretNotes TEXT,
    PRIMARY KEY (custID)                  
);
