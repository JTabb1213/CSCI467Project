from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})# Allow access to all routes(r"/*") from origin localhost

app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mysql+pymysql://student:student@blitz.cs.niu.edu:3306/csci467'
)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Track modifications made to DB

db = SQLAlchemy(app)

#Model for the DB
class YourModel(db.Model):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    city = db.Column(db.String(50))
    street = db.Column(db.String(50))
    contact = db.Column(db.String(50))

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
    customers = YourModel.query.all()
    return jsonify([customer.to_dict() for customer in customers]) 

if __name__ == '__main__':
    app.run(debug=True, port=5001)

