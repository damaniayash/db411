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

# Get submitted applications
# GET
# /submittedApplications/<int:id>
# [
#     {
#         "apartmentId": 3,
#         "applicationId": 1,
#         "agencyName": "Predovic, Cormier and Champlin",
#         "apartmentName": "Imprint",
#         "emailId": "agress0@goodreads.com",
#         "firstName": "Arel",
#         "gender": "Male",
#         "lastName": "Gress",
#         "status": "Submitted",
#         "unitNumber": 1
#     }
# ]

# Reject Application
# POST
# http://127.0.0.1:8000/acceptApplication/1

# Accept Application
# POST 
# http://127.0.0.1:8000/acceptApplication
# {
#     "body": {
#         "applicationId": 1,
#         "unitNumber": 1,
#         "apartmentId": 3
#     }
# }

# Add review
# POST
# http://127.0.0.1:8000/addReview
# {
#     "body": {
#         "userId": 2,
#         "unitNumber": 1,
#         "apartmentId": 3,
#         "review": "review !!",
#         "rating": 5
#     }
# }

# Analytics
# GET
# http://127.0.0.1:8000/getAnalytics?bedrooms=3&zipcode=61820&min=1000&max=3000
# [
#     {
#         "label": "O'Reilly-Trantow",
#         "y": [
#             1596,
#             2942,
#             3
#         ]
#     }
# ]

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

@app.route('/unit', methods =['GET'])
def get_unit_id():
    unitid = request.args.get('unitid')
    aptid = request.args.get('aptid')
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM unit WHERE unitnumber = %s AND apartmentid = %s"
    cursor.execute(query, (unitid, aptid))
    result = cursor.fetchall()
    return result

@app.route('/user/<int:user_id>', methods =['GET'])
def get_user_id(user_id):
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM user WHERE userid = %s"
    cursor.execute(query, (user_id,))
    result = cursor.fetchall()
    return result

@app.route('/application/<int:application_id>', methods =['GET'])
def get_application_id(application_id):
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM application WHERE applicationid = %s"
    cursor.execute(query, (application_id,))
    result = cursor.fetchall()
    return result

# {
#         "apartmentid": 5,
#         "applicationid": 34,
#         "applicationtimestamp": null,
#         "groupnumber": null,
#         "lastupdatedtimestamp": null,
#         "status": "",
#         "unitnumber": 1,
#         "userid": 4
# }

@app.route('/application', methods =['POST'])
def post_application():
    _json = request.json
    _applicationid = _json['applicationid']
    _unitnumber = _json['unitnumber']
    _apartmentid = _json['apartmentid']
    _status = _json['status']
    _groupnumber = _json['groupnumber']
    _applicationtimestamp = _json['applicationtimestamp']
    _lastupdatedtimestamp = _json['lastupdatedtimestamp']
    _userid = _json['userid']
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM application WHERE apartmentid = %s AND unitnumber = %s AND userid = %s"
    cursor.execute(query, (_apartmentid,_unitnumber,_userid))
    result1 = cursor.fetchall()
    if not result1:
        sql = "INSERT INTO application VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
        data = (_applicationid, _userid, _unitnumber, _apartmentid, _status, _groupnumber, _applicationtimestamp, _lastupdatedtimestamp)
        try:    
            cursor = cnx.cursor()
            cursor.execute(sql, data)
            cnx.commit()

            resp = jsonify('application added successfully!')

            # resp.status_code = 200
            return resp
        except Exception as e:
            
            return str("Apartment not available for Lease OR " + str(e))
    query = "SELECT * FROM application WHERE apartmentid = %s AND unitnumber = %s AND userid = %s AND status <> \"Leased\""
    cursor.execute(query, (_apartmentid,_unitnumber,_userid))
    result2 = cursor.fetchall()
    if result2:
        sql = "INSERT INTO application VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
        data = (_applicationid, _userid, _unitnumber, _apartmentid, _status, _groupnumber, _applicationtimestamp, _lastupdatedtimestamp)
        try:    
            cursor = cnx.cursor()
            cursor.execute(sql, data)
            cnx.commit()

            resp = jsonify('application added successfully!')

            # resp.status_code = 200
            return resp
        except Exception as e:
            
            return str("Apartment not available for Lease OR " + str(e))

    else:
        return jsonify('Could not create application')


@app.route('/auth', methods =['GET'])
def get_password():
    email = request.args.get('email')
    password = request.args.get('password')
    print(email, password)
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM user WHERE email = %s AND passwordhash = %s"
    cursor.execute(query, (email,password))
    result = cursor.fetchall()
    if result:
        return jsonify('Success')
    else:
        return jsonify('Failure')

@app.route('/application_userid', methods = ['GET'])
def application_userid():
    userid = request.args.get('userid')
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM application WHERE userid = %s"
    cursor.execute(query, (userid,))
    result = cursor.fetchall()
    return result

#http://127.0.0.1:8000/review?apartmentid=3&unitnumber=1
@app.route('/review', methods = ['GET'])
def review():
    aptid = request.args.get('apartmentid')
    unitid = request.args.get('unitnumber')
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM review NATURAL JOIN unit u JOIN apartment a ON u.apartmentid = a.apartmentid WHERE a.apartmentid = %s AND u.unitnumber = %s"
    cursor.execute(query, (aptid,unitid))
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

# API to fetch pending applications for a specific agency.
@app.route("/submittedApplications/<int:id>", methods=["GET"])
def get_submitted_applications_for_agency(id):

    sql = "select a.applicationid as applicationId, a2.apartmentid as apartmentId, a2.apartmentname as apartmentName, a.unitnumber as unitNumber, u.firstname as firstName, \
            u.lastname as lastName, u.email as emailId, u.gender as gender, a.status as status, l.name as agencyName \
            from user u natural join application a natural join apartment a2 join leasingagency l using(agencyid) \
            where a2.agencyid = " + str(id) + " and a.status = 'Submitted'"
    try:   
        cursor = cnx.cursor(dictionary = True)
        cursor.execute(sql)
        result = cursor.fetchall()
        cnx.commit()
        return result
    except Exception as e:
        return str(e)
    finally:
        cursor.close()
 
# API to reject an application of id by agency.
@app.route("/rejectApplication/<int:id>", methods=["POST"])
def reject_application(id):
    sql = "UPDATE application SET status = 'Rejected' where applicationid = " + str(id) + " AND status = 'Submitted'"
    try:   
        cursor = cnx.cursor()
        cursor.execute(sql)
        res = cursor.rowcount
        cnx.commit()
        
        if res != 0:
            resp = jsonify('Application rejected successfully!')
            resp.status_code = 200
            return resp
        else:
            resp = jsonify('Application already leased or rejected!')
            resp.status_code = 200
            return resp

    except Exception as e:
        return str(e)
    finally:
        cursor.close()
 
# API to accept an application of id by agency.
# first check if the unit is available and if not then return the message
# If the unit is available, it will set the status of application as Leased and change the availablity of unit to no.
# It will also execute a trigger that will automatically reject all the other applications for that unit.
@app.route("/acceptApplication", methods=["POST"])
def accept_application():
 
    _json = request.json['body']
    _applicationid = _json['applicationId']
    _unitnumber = _json['unitNumber']
    _apartmentid = _json['apartmentId']

    sql = "SELECT * from unit WHERE unitnumber = " + str(_unitnumber) + " AND apartmentid = " + str(_apartmentid)  + " AND availablity = 'yes'"

    try:   
        cursor = cnx.cursor()
        cursor.execute(sql)
        unitInfo = cursor.fetchone()
        if unitInfo != None:
            sql = "UPDATE application SET status = 'Leased' where applicationid = " + str(_applicationid) + " AND status = 'Submitted';"
            cursor.execute(sql)
            sql = "UPDATE unit SET availablity = 'no' where unitnumber = " + str(_unitnumber) + " AND apartmentid = " + str(_apartmentid)  + " AND availablity = 'yes';"
            cursor.execute(sql)
            cnx.commit()
            resp = jsonify('Application accepted successfully!')
            resp.status_code = 200
            return resp
        else:
            cnx.commit()
            resp = jsonify('Unit Not Found or Not Available!')
            resp.status_code = 404
            return resp
    except Exception as e:
        return str(e)
    finally:
        cursor.close()
 
# API to submit a review (userid, unitnumber, apartmentid, rating, review)
@app.route("/addReview", methods=["POST"])
def add_review():

    _json = request.json['body']
    _userid = _json['userId']
    _unitnumber = _json['unitNumber']
    _apartmentid = _json['apartmentId']
    _review = _json['review']
    _rating = _json['rating']

    # save edits
    sql = "INSERT INTO review(reviewid, userid, unitnumber, apartmentid, review, rating) VALUES(%s, %s, %s, %s, %s, %s)"
    try:   
        cursor = cnx.cursor()
        cursor.execute('SELECT MAX(reviewid) FROM review')
        _maxReviewId = cursor.fetchone()
        print(_maxReviewId)
        data = (_maxReviewId[0] + 1, _userid, _unitnumber, _apartmentid, _review, _rating)
        cursor.execute(sql, data)
        cnx.commit()

        resp = jsonify('Review added successfully!')
        resp.status_code = 200
        return resp
    except Exception as e:
        
        return str(e)
 
# Get the analytics for different agencies based on their prices for specific zipcodes and bed configurations
@app.route('/getAnalytics', methods=['GET'])
def get_agency_analytics():
 
    _numbedrooms = request.args.get('bedrooms')
    _zipcode = request.args.get('zipcode')
    _minPrice = request.args.get('min')
    _maxPrice = request.args.get('max')

    sql = "CALL GetPricesOfAgencies(" + str(_numbedrooms) + ", " + str(_zipcode) + ", " + str(_minPrice) + ", " + str(_maxPrice) + ");"
    result = []
    data = []
    try:   
        cursor = cnx.cursor(dictionary = True)
        cursor.execute(sql)
        result = cursor.fetchall()
        for res in result:
            d = { "y" : [res['minRentalCost'], res['maxRentalCost'], res['unitsAvailable']], "label" : res['agencyName']}
            data.append(d)
        return data
        cnx.commit()
    except Exception as e:
        return str(e)
    finally:
        cursor.close()

if __name__ == '__main__':
 
    app.run(port=8000,debug = True)