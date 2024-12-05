from flask import Flask, jsonify, request
from flask_cors import CORS
import random, traceback
from sqlalchemy import create_engine, Column, Integer, String, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})# Allow access to all routes(r"/*") from origin localhost

#External database endpoints in this form: dbtype://user:password@host:port/db1
# this is for the customer legacy database
engine1 = create_engine("mysql+pymysql://student:student@blitz.cs.niu.edu:3306/csci467")
# This is for the mysql database hosted on aws. We are using it for other tables such as the associate login info
engine2 = create_engine("mysql+pymysql://admin:NIUCSCI467@database-1.crkw0uso6xkp.us-east-2.rds.amazonaws.com:3306/database-1")
Base = declarative_base()
#establish session connection
SessionLocal1 = sessionmaker(autocommit=False, autoflush=False, bind=engine1)
SessionLocal2 = sessionmaker(autocommit=False, autoflush=False, bind=engine2)

#to generate the random number
def generate_random_string():
    random_number = random.randint(100000, 999999)
    return f"xyz-{random_number}-cba"

# function that retrives the customer email from the 'customers' table, given their id
def get_customer_email(custID):
    try:
        session = SessionLocal1()  
        query = text("SELECT contact FROM customers WHERE id = :custID")
        result = session.execute(query, {'custID': custID}).fetchone()
        if result:
            return result[0]
        else:
            return 'No email found'
    except Exception as e:
        return str(e)
    finally:
        session.close()

# function to calculate commision
def get_and_calculate_commission(quoteID, percent):
    try:
        session = SessionLocal2()
        query = text("SELECT price FROM customer_quotes WHERE id = :quoteID")
        result = session.execute(query, {'quoteID': quoteID}).fetchone()
        if result:
            return round(float(result[0]) * (percent/100), 2)
        else:
            return 'No email found'
    except Exception as e:
        return str(e)
    finally:
        session.close()

# function to calculate final price
def get_and_calculate_final_price(quoteID, amount):
    try:
        session = SessionLocal2()
        query = text("SELECT price FROM customer_quotes WHERE id = :quoteID")
        result = session.execute(query, {'quoteID': quoteID}).fetchone()
        if result:
            return round(float(result[0]) - amount, 2)
        else:
            return 'No email found'
    except Exception as e:
        return str(e)
    finally:
        session.close()

# function to update the orders database
def update_orders_db(final_price, quote_id, sales_id, cust_id, processDay):
    try:
        session = SessionLocal2()
        query = text("""
            INSERT INTO orders (final_price, quote_id, sales_id, cust_id, processDay)
            VALUES (:final_price, :quote_id, :sales_id, :cust_id, :processDay)
        """)
        session.execute(query, {
            'final_price': final_price,
            'quote_id': quote_id,
            'sales_id': sales_id,
            'cust_id': cust_id,
            'processDay': processDay
        })
        session.commit()
        return "Order was added to the table"
    except Exception as e:
        return str(e)
    finally:
        session.close()

#Model for the 'customers' table. Makes it easier to query 
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

# endpoint that will send the post request to the 
@app.route('/send_purchase_order', methods=['POST'])
def send_purchase():
    try:
        data = request.get_json()
        quoteID = data["quoteID"]
        amount = str(data['discount'])
        associate = data['AssociateID']
        custID = int(data['custID'])
        email = data['email']
        custid = data['custID']
        order = generate_random_string()
        contact = get_customer_email(custID)
        am = float(data['discount'])

        payload = {
            'order': order, 
            'associate': associate, 
            'custid': custid,
            'amount': amount,  
        }

        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        response = requests.post('http://blitz.cs.niu.edu/PurchaseOrder/', json=payload, headers=headers)

        if response.status_code == 200:
            result = response.json()
            commission_str = result['commission']
            commission_percentage = float(commission_str.replace('%', ''))
            paid = get_and_calculate_commission(quoteID, commission_percentage)
            final_amount = get_and_calculate_final_price(quoteID, am)
            #print("paid: ", paid)
            #print("final_amount: ", final_amount)
            result['paid'] = paid
            result['final_amount'] = final_amount
            update_orders_db(result['final_amount'], result['order'], result['associate'], result['custid'], result['processDay'])
            jsonify(result)
            print(result)
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Failed to process the purchase order', 'details': response.text}), response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/attempt_associate_login', methods=['POST'])
def associate_login():
    session = SessionLocal2()  
    try:
        data = request.get_json()
        user = data['username']
        passwrd = data['passwrd']
        query = session.execute(text(
            """
            SELECT * 
            FROM sales_associates 
            WHERE username = :user AND passwrd = :passwrd
            """),
            {'user': user, 'passwrd': passwrd}
        ).fetchone()

        if query:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        session.close() 


@app.route('/attempt_finalized_login', methods=['POST'])
def finalized_login():
    session = SessionLocal2() 
    try:
        data = request.get_json()
        user = data['username']
        passwrd = data['passwrd']

        query = session.execute(text(
            """
            SELECT * 
            FROM finalized 
            WHERE username = :user AND passwrd = :passwrd
            """),
            {'user': user, 'passwrd': passwrd}
        ).fetchone()

        if query:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        session.close() 

@app.route('/attempt_admin_login', methods=['POST'])
def admin_login():
    session = SessionLocal2()  
    try:
        data = request.get_json()
        user = data['username']
        passwrd = data['passwrd']

        query = session.execute(text(
            """
            SELECT * 
            FROM adminDB 
            WHERE username = :user AND passwrd = :passwrd
            """),
            {'user': user, 'passwrd': passwrd}
        ).fetchone()

        if query:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        session.close()  


@app.route('/attempt_purchaseOrder_login', methods=['POST'])
def purcharOrder_login():
    session = SessionLocal2()  
    try:
        data = request.get_json()
        user = data['username']
        passwrd = data['passwrd']

        query = session.execute(text(
            """
            SELECT * 
            FROM purchaseOrder 
            WHERE username = :user AND passwrd = :passwrd
            """),
            {'user': user, 'passwrd': passwrd}
        ).fetchone()

        if query:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        session.close()  



@app.route('/message', methods=['GET']) 
def get_message():
    return jsonify(message="Hello from the Flask backend!")

@app.route('/all_customer_info', methods=['GET'])
def get_all_customer_info():

    session = SessionLocal1()
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

@app.route('/view_all_quotes', methods=['GET'])
def view_all_quotes():
    session = SessionLocal2()
    try:
        associate_id = request.args.get('associateID')
        query = text("SELECT * FROM customer_quotes WHERE associateID = :associate_id")
        result = session.execute(query, {'associate_id': associate_id})
        rows = result.fetchall()
        columns = result.keys()
        results_list = [dict(zip(columns, row)) for row in rows]
        return jsonify(results_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()  

# this endpoint gets called when you want to add changes to the 'customer_quotes' table, which keeps
# track of all customer orders. It firts searches to see if there is already a quote that exists and is not finalized, if there is
# then it will update it with the info. If not (quote for custID doesnt exist or there are none that arent finalized),
# then it will create a new quote
@app.route('/purchase_order', methods=['POST']) 
def send_purchase_order():
    session = SessionLocal2()  
    try:
        data = request.get_json()
        associate = data['associateID']
        custid = data['custID']
        price = data['price']
        email = data['email']
        description = data['description']
        secrets = data['secretNotes']
        isFinalized = data['isFinalized']

        # I dont know why, but isFinalized is being sent as a string value, so i had to manually change it to a bool
        #if isFinalized.lower() == 'true':
        #    isFinalized = True
        #elif isFinalized.lower() == 'false':
        #    isFinalized = False

        print(f"Received isFinalized value: {isFinalized} (Type: {type(isFinalized)})")

        existing_quote = session.execute(text("""
            SELECT * FROM customer_quotes 
            WHERE custID = :custid AND isFinalized = FALSE
        """), {'custid': custid}).fetchone()

        if existing_quote:
            session.execute(text("""
                UPDATE customer_quotes 
                SET associateID = :associate, price = :price, email = :email, 
                    description = :description, secretNotes = :secrets, isFinalized = :isFinalized
                WHERE custID = :custid AND isFinalized = FALSE
            """), {
                'associate': associate,
                'custid': custid,
                'price': price,
                'email': email,
                'description': description,
                'secrets': secrets,
                'isFinalized': isFinalized
            })

            action = "updated"

        else:
            session.execute(text("""
                INSERT INTO customer_quotes (associateID, custID, price, email, description, secretNotes, isFinalized)
                VALUES (:associate, :custid, :price, :email, :description, :secrets, :isFinalized)
            """), {
                'associate': associate,
                'custid': custid,
                'price': price,
                'email': email,
                'description': description,
                'secrets': secrets,
                'isFinalized': isFinalized
            })

            action = "created"

        session.commit()

        return jsonify({
            'message': f"Quote successfully {action}.",
            'isFinalized': isFinalized
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        session.close()  
@app.route('/get_finalized_quotes', methods=['GET'])
def get_finalized_quotes():
    session = SessionLocal2()
    try:
        query = text("SELECT * FROM customer_quotes WHERE isFinalized = :isFinalized;")
        result = session.execute(query, {'isFinalized': True})
        rows = result.fetchall()
        columns = result.keys()
        results_list = [dict(zip(columns, row)) for row in rows]
        return jsonify(results_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close() 

@app.route('/api/sales-associates', methods=['GET'])
def get_sales_associates():
    session = SessionLocal2()
    try:
        query = session.execute(text("SELECT * FROM sales_associates"))
        associates = [dict(row) for row in query.fetchall()]
        return jsonify(associates)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@app.route('/api/sales-associates', methods=['POST'])
def add_sales_associate():
    session = SessionLocal2()
    try:
        data = request.json
        query = text("""
            INSERT INTO sales_associates (name, username, commission, address) 
            VALUES (:name, :username, :commission, :address)
        """)
        session.execute(query, data)
        session.commit()
        return jsonify({'message': 'Sales associate added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@app.route('/api/sales-associates/<int:id>', methods=['PUT'])
def edit_sales_associate(id):
    session = SessionLocal2()
    try:
        data = request.json
        query = text("""
            UPDATE sales_associates 
            SET name = :name, username = :username, commission = :commission, address = :address
            WHERE id = :id
        """)
        session.execute(query, {**data, 'id': id})
        session.commit()
        return jsonify({'message': 'Sales associate updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@app.route('/api/sales-associates/<int:id>', methods=['DELETE'])
def delete_sales_associate(id):
    session = SessionLocal2()
    try:
        query = text("DELETE FROM sales_associates WHERE id = :id")
        session.execute(query, {'id': id})
        session.commit()
        return jsonify({'message': 'Sales associate deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@app.route('/api/get-quote', methods=['GET'])
def get_quote():
    session = SessionLocal2()  
    try:
        cust_id = request.args.get('custID')  
        print(f"Received custID: {cust_id}") 

        if not cust_id:
            return jsonify({'error': 'custID is required'}), 400

        query = session.execute(text(
            """
            SELECT 
                description AS item, 
                price, 
                email, 
                secretNotes
            FROM customer_quotes
            WHERE custID = :custID
            """
        ), {'custID': cust_id})

        rows = query.fetchall()

        columns = query.keys()  
        results = [dict(zip(columns, row)) for row in rows]

        if results:
            print(f"Query Results: {results}") 
            return jsonify(results), 200
        else:
            print("Quote not found")  
            return jsonify({'message': 'Quote not found'}), 404

    except Exception as e:
        error_message = traceback.format_exc()
        print(f"Error occurred: {error_message}")  
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500

    finally:
        session.close()


@app.route('/getAllAssociates', methods=['GET'])
def view_all_associates():
    session = SessionLocal2() 
    try:
        query = text("SELECT * FROM sales_associates")
        result = session.execute(query)
        rows = result.fetchall()
        columns = result.keys()
        results_list = [dict(zip(columns, row)) for row in rows]
        return jsonify(results_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()   


if __name__ == '__main__':
    app.run(debug=True, port=5001)

