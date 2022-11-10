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

# Insert a new unit in an existing apartment.
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
    finally:
        cursor.close()

# API to update rental cost of available units of specific bed configuration from a given apartment.
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
    finally:
        cursor.close()

# API to remove apartment from apartment table. the change will be cascaded to all the tables having apartmentid as foreign key.
@app.route("removeApartment/<id>", methods=["DELETE"])
def remove_apartment(id):

	# save edits
    sql = "DELETE FROM apartment WHERE apartmentid = %s"
    data = (id)
    try:	
        cursor = cnx.cursor()
        cursor.execute(sql, data)
        cnx.commit()

        resp = jsonify(cursor.rowcount + ' apartment removed successfully!')
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()

# Get the cheapest units  per leasing agency in specific zipcodes and having specific bed configurations
@app.route('/getCheapestApartments', methods=['GET'])
def get_cheapest_units():
    _json = request.json
    _numbedrooms = _json['numBedrooms']
    _zipcode = "\"" + "\", \"".join(_json['zipcode']) + "\""

	# save edits
    sql = """SELECT u.unitnumber AS Unit, a.apartmentname AS ApartmentName, a.apartmentid AS ApartmentId, u.rentalcost AS rentalCost,
            la.name AS LeasingAgency, a.address AS Address, a.zipcode AS ZipCode
            FROM unit u NATURAL JOIN apartment a JÖIN leasingagency la USING(agencyid)
            WHERE u.numbedrooms = %s AND u.availablity = "yes" AND a.zipcode IN (%s) AND
            u.rentalcost = (
                SELECT MIN(rentalcost)
                FROM unit u2 NATURAL JOIN apartment a2 JOIN leasingagency la2 USING(agencyid)
                WHERE u2.numbedrooms = %s AND u2.availablity = "yes" AND a2.zipcode IN (%s) AND la.agencyid = la2.agencyid
            )
            ORDER BY rentalcost ASC"""
    data = (_numbedrooms, _zipcode, _numbedrooms, _zipcode)
    try:	
        cursor = cnx.cursor()
        cursor.execute(sql, data)
        cheapUnits = cursor.fetchall()
        return cheapUnits
    except Exception as e:
        print(e)
    finally:
        cursor.close()

# main driver function
if __name__ == '__main__':
 
    #  run() method of Flask class runs the application
    # on the local development server.
    app.run()
