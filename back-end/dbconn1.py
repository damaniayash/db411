
# GET

# /apt/<int:apt_id  - get specific apartment based on id

# /apt - get all apartment

# /apt?bedrooms=4&zipcode=60606&min=70&max=9000
# parameters:
# bedrooms - No of bedrooms
# zipcode - one zipcode
# min - min rental cost
# max - max rental cost

# CREATE
# /addUnit
# JSON:
# {
#     "unitNumber":900,
#     "apartmentId":1050,
#     "area":566,
#     "numBedrooms":3,
#     "rentalCost":800
# }

# UPDATE
# /updateUnitCost
# {
#     "apartmentId":1050,
#     "numBedrooms":3,
#     "rentalCost":800
# }

# DELETE
# /removeApartment/<int:id>

# QUERY1
# /area?min=600&max=800

# QUERY2
# /getCheapestApartments
# {
#     "numBedrooms":3
#     "zipcode":['61820', '61801']
# }




from flask import Flask, request, jsonify
import mysql.connector 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
                              
cnx = mysql.connector.connect(user='root', password='plus1234',
                              host='104.154.107.248',
                              database='plus')
                              

@app.route('/')
def hello_world():
    return 'hello'

@app.route('/apt/<int:apt_id>')
def get_apt_id(apt_id):
    aptid = apt_id
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM unit where apartmentid = %s"
    cursor.execute(query, (aptid,))
    result = cursor.fetchall()
    return result

@app.route('/apt', methods =['GET'])
def get_apt():

    if request.method == 'GET':
        bedrooms = request.args.get('bedrooms')
        zipcode = request.args.get('zipcode')
        min_price = request.args.get('min')

        # if not min_price:
        #   cursor = cnx.cursor(dictionary=True)
        #   query = "SELECT min(rentalcost) as min_rentalcost FROM unit"
        #   cursor.execute(query)
        #   min_price = cursor.fetchall()[0]

        max_price = request.args.get('max')

        # if not max_price:
        #   cursor = cnx.cursor(dictionary=True)
        #   query = "SELECT max(rentalcost) as max_rentalcost FROM unit"
        #   cursor.execute(query)
        #   max_price = cursor.fetchall()[0]
        #   #return max_price


        base = "select * FROM apartment natural join unit "

        where_start = False

        if bedrooms:
            if not where_start:
                base += 'WHERE '
                where_start = True
            else:
                base += 'AND '
            base +=  "numbedrooms = %s " % int(bedrooms)


        if zipcode:
            if not where_start:
                base += 'WHERE '
                where_start = True
            else:
                base += 'AND '
            base += "zipcode = %s " % int(zipcode)

        if min_price:
            if not where_start:
                base += 'WHERE '
                where_start = True
            else:
                base += 'AND '
            base += "rentalcost between %s and %s " % (int(min_price), int(max_price))

        cursor = cnx.cursor(dictionary=True)
        cursor.execute(base)
        result1 = cursor.fetchall()
        return result1


# Insert a new unit in an existing apartment.
@app.route('/addUnit', methods=['POST'])
def add_unit():
    

    _json = request.json['body']
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

        resp = jsonify('Unit added successfully!')

        # resp.status_code = 200
        return resp
    except Exception as e:
        
        return str(e)

@app.route('/area', methods =['GET'])
def area():
    min_area = int(request.args.get('min'))
    max_area = int(request.args.get('max'))

    query = """
    SELECT la.name, AVG(r.rating) as 'average rating', COUNT(u.unitnumber) as 'Number of units rated', la.agencyid, la.address, la.zipcode
    FROM leasingagency la JOIN apartment a USING(agencyid) NATURAL JOIN unit u NATURAL JOIN review r
    WHERE u.area BETWEEN %s AND %s
    GROUP BY la.agencyid
    HAVING COUNT(u.unitnumber) >= 2
    ORDER BY AVG(r.rating) DESC, COUNT(u.unitnumber) DESC, la.name ASC
    """
    data = (min_area, max_area)
    cursor = cnx.cursor(dictionary=True)
    cursor.execute(query,data)
    result1 = cursor.fetchall()
    return result1
    

# API to update rental cost of available units of specific bed configuration from a given apartment.
@app.route('/updateUnitCost', methods=['POST'])
def update_unit_cost():
    _json = request.json['body']
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
        return str(e)
    finally:
        cursor.close()

# API to remove apartment from apartment table. the change will be cascaded to all the tables having apartmentid as foreign key.
@app.route("/removeApartment/<int:id>", methods=["DELETE"])
def remove_apartment(id):

    # save edits
    sql = "DELETE FROM apartment WHERE apartmentid = " + str(id)
    try:    
        cursor = cnx.cursor()
        cursor.execute(sql)
        cnx.commit()

        resp = jsonify('Apartment removed successfully!')
        resp.status_code = 200
        return resp
    except Exception as e:
        return str(e)
    finally:
        cursor.close()

# Get the cheapest units  per leasing agency in specific zipcodes and having specific bed configurations
@app.route('/getCheapestApartments', methods=['GET'])
def get_cheapest_units():

    _numbedrooms = request.args.get('bedrooms')
    _zipcode = request.args.get('zipcode')

    sql = "SELECT *\
            FROM unit u NATURAL JOIN apartment a JOIN leasingagency la USING(agencyid) \
            WHERE u.numbedrooms = "+str(_numbedrooms)+" AND u.availablity = 'yes' \
            AND a.zipcode = "+str(_zipcode)+ " \
            AND u.rentalcost = ( SELECT MIN(rentalcost) \
                FROM unit u2 NATURAL JOIN apartment a2 JOIN leasingagency la2 USING(agencyid) \
                WHERE u2.numbedrooms = "+str(_numbedrooms)+" AND u2.availablity = 'yes' \
                AND a2.zipcode = "+ str(_zipcode) + " \
                    AND la.agencyid = la2.agencyid) ORDER BY rentalcost ASC "
    # return [_zipcode,_numbedrooms]

    try:    
        cursor = cnx.cursor(dictionary=True)
        cursor.execute(sql)
        cheapUnits = cursor.fetchall()
        return cheapUnits
    except Exception as e:
        return str(e)
    finally:
        cursor.close()

if __name__ == '__main__':
 
    app.run(port=8000,debug = True)