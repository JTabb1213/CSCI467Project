from flask import Flask, jsonify, request
from flask_cors import CORS
import random, traceback
from sqlalchemy import create_engine, Column, Integer, String, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})# Allow access to all routes(r"/*") from origin localhost

#External database endpoints in this form: dbtype://user:password@host:port/db1
engine1 = create_engine("mysql+pymysql://student:student@blitz.cs.niu.edu:3306/csci467")
engine2 = create_engine("mysql+pymysql://admin:NIUCSCI467@database-1.crkw0uso6xkp.us-east-2.rds.amazonaws.com:3306")
Base = declarative_base()
#establish session connection
SessionLocal1 = sessionmaker(autocommit=False, autoflush=False, bind=engine1)
SessionLocal2 = sessionmaker(autocommit=False, autoflush=False, bind=engine2)

#to generate the random number
def generate_random_string():
    random_number = random.randint(100000, 999999)
    return f"xyz-{random_number}-cba"

#Model for the DB
class Customer(Base):
    __tablename__ = 'customers'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    city = Column(String(50))
    street = Column(String(50))
    contact = Column(String(50))


    def to_dict(self):  # Return the data from the DB in a dict form
        return {
            'id': self.id,
            'name': self.name,
            'city': self.city,
            'street': self.street,
            'contact': self.contact
        }

@app.route('/message', methods=['GET']) # Call this route to get the backend message
def get_message():
    return jsonify(message="Hello from the Flask backend!")

@app.route('/all_customer_info', methods=['GET']) # Call this route from  the frontend to get all customers
def get_all_customer_info():

    session = SessionLocal1() #Use session 1
    try:
        customers = session.query(Customer).all()
        return jsonify([customer.to_dict() for customer in customers])
    except Exception as e:
        error_message = traceback.format_exc()
        return jsonify(error=error_message), 500
    finally:
        session.close()  #Close the session

@app.route('/test_db_connection', methods=['GET'])#This is just used to test if connection to a database is successful
def test_db_connection():
    session = SessionLocal2() #test session 2, 
    try:
        result = session.execute(text('SELECT 1'))
        result.fetchall()
        return jsonify(message="Connection successful to the second database!")
    except Exception as e:
        #error_message = traceback.format_exc()
        return jsonify(str(e)), 500
    finally:
        session.close()  # Close the session

@app.route('/view_all_quotes', methods=['GET'])#This is just used to test if connection to a database is successful
def view_all_quotes():
    session = SessionLocal2() #test session 2, 
    try:
        result = session.execute(text('SELECT * FROM customer_quotes'))
        rows = result.fetchall()
        columns = result.keys()
        results_list = [dict(zip(columns, row)) for row in rows]
        return jsonify(results_list)
    except Exception as e:
        #error_message = traceback.format_exc()
        return jsonify(str(e)), 500
    finally:
        session.close()  # Close the session
        
@app.route('/purchase_order', methods=['POST'])#Endpoint used by sales associate to add/update a quote to our database
def send_purchase_order():
    session = SessionLocal2() #use session 2
    try:
        data = request.get_json()
        order = generate_random_string()
        associate = data['associateID']
        custid = data['custID']
        price = data['price']
        email = data['email']
        description = data['description']
        secrets = data['secretNotes']
        session.execute(text("""
            INSERT INTO customer_quotes (associateID, custID, price, email, description, secretNotes)
            VALUES (:associate, :custid, :price, :email, :description, :secrets)
        """), {
            'associate': associate,
            'custid': custid,
            'price': price,
            'email': email,
            'description': description,
            'secrets': secrets
        })

        session.commit()

        return jsonify({'data recieved, and added to database' : data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        session.close() #close the session

if __name__ == '__main__':
    app.run(debug=True, port=5001)

