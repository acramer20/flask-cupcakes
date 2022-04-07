"""Flask app for Cupcakes"""
from flask import Flask, request, jsonify, render_template

from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "oh-so-secret"

connect_db(app)


@app.route('/api/cupcakes')
def get_cupcakes():
    """Shows a list of all the cupcakes and their information"""
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    # using a list comprehension to be able to serialize and then jsonify each cupcake
    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<int:id>')
def get_one_cupcake(id):
    """shows the information for one cupcake"""
    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake.serialize())

@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    """Allows us to create a new cupcake with flavor, size, rating, and image"""
    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    image = request.json['image']

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()

    response_json = jsonify(cupcake=new_cupcake.serialize())

    return (response_json, 201)