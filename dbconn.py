# from flask import Flask, request, render_template
# import pymysql
# 
# db = pymysql.connect(host="localhost", user="root", password="", database="")
# 
# app = Flask(__name__)
# api = dbconn(app)
# 
# @app.route('/')
# def someName():
#     cursor = db.cursor()
#     sql = "SELECT * FROM apartment"
#     cursor.execute(sql)
#     results = cursor.fetchall()
#     return render_template('index.html', results=results)
# 
# if __name__ == '__main__':
# 	app.run(debug=True)

# from flask import Flask
# from flaskext.mysql import MySQL
# 
# app = Flask(__name__)
# mysql = MySQL()
# app.config['MYSQL_DATABASE_USER'] = 'root'
# app.config['MYSQL_DATABASE_PASSWORD'] = ''
# app.config['MYSQL_DATABASE_DB'] = 'plus'
# app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# mysql.init_app(app)
# conn = mysql.connect()
# cursor =conn.cursor()
# 
# cursor.execute("SELECT * from apartment")
# data = cursor.fetchone()
# print(data)

from flask import Flask
import mysql.connector 
# Flask constructor takes the name of
# current module (__name__) as argument.
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
 
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()

   


