from flask import Flask, request, jsonify
import mysql.connector 

app = Flask(__name__)

# cnx = mysql.connector.connect(user='root', password='',
#                               host='localhost',
#                               database='plus')
                              
cnx = mysql.connector.connect(user='root', password='plus1234',
                              host='104.154.107.248',
                              database='plus')
                              
try:
   cursor = cnx.cursor()
   cursor.execute("""
      SELECT * FROM user
   """)
   result = cursor.fetchall()
   cursor = cnx.cursor()
   cursor.execute("""
      SELECT * FROM apartment
   """)
   result1 = cursor.fetchall()
   print(result)
finally:
    cnx.close()
    
# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return result

@app.route('/apt')
# ‘/’ URL is bound with hello_world() function.
def apt():
    return result1

@app.route('/addUnit', methods=['POST'])
def add_unit():
    _json = request.json
    _unitnumber = _json['unitNumber']
    _apartmentid = _json['apartmentId']
    _area = _json['area']
    _numbedrooms = _json['numBedrooms']
    _rentalcost = _json['rentalCost']

	# save edits
    sql = "INSERT INTO unit(unitnumber, apartmentid, area, numbedrooms, rentalcost, availablity) VALUES(%s, %s, %s, %s, %s, %s)"
    data = (_unitnumber, _apartmentid, _area, _numbedrooms, _rentalcost, 'yes')
    try:	
        cursor = cnx.cursor()
        cursor.execute(sql, data)
        cnx.commit()

        resp = jsonify('User added successfully!')
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
 
@app.route('/updateUnitCost', methods=['POST'])
def update_unit_cost():
    _json = request.json
    _apartmentid = _json['apartmentId']
    _numbedrooms = _json['numBedrooms']
    _rentalcost = _json['rentalCost']

	# save edits
    sql = "UPDATE unit SET rentalcost = %s WHERE apartmentid = %s AND numbedrooms = %s AND availablity = 'yes'"
    data = (_rentalcost, _apartmentid, _numbedrooms)
    try:	
        cursor = cnx.cursor()
        cursor.execute(sql, data)
        cnx.commit()

        resp = jsonify('Rental cost updated successfully!')
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)

# main driver function
if __name__ == '__main__':
 
    #  run() method of Flask class runs the application
    # on the local development server.
    app.run()
