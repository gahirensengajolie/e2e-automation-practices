#how to integrate database 
import sqlite3
from contextlib import contextmanager
sqlite_file_name = "school.db"

sqlite_file_name="school.db"

@contextmanager
def get_db_connection():
    connection=sqlite3.connect(sqlite_file_name)

    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    finally:
        connection.close()

def create_table():
    with get_db_connection() as connection:
        connection.execute('''CREATE TABLE IF NOT EXISTS students(
                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                           name TEXT NOT NULL,
                           age INTEGER NOT NULL,
                           email TEXT NOT NULL,
                           country TEXT NOT NULL,
                           id_number INTEGER NOT NULL
                           )''' )
        
def add_student(name, age, email, country, id_number):
    with get_db_connection () as connection:
        connection.execute(
            'INSERT INTO students (name, age, email, country, id_number) VALUES (?,?,?,?,?)',
            (name, age, email, country, id_number),
        )
def get_student():
    with get_db_connection() as connection:
        return connection.execute('SELECT*FROM students').fetchall()
    
def update_student(id_number, name, age, email, country):
     with get_db_connection() as connection:
        connection.execute(
            '''UPDATE students 
               SET name = ?, age = ?, email = ?, country = ? 
               WHERE id_number = ?''',
            (name, age, email, country, id_number)
        )
        connection.commit()

def delete_student(id_number):
    with get_db_connection() as connection:
        connection.execute(
            'DELETE FROM students WHERE id_number = ?',
            (id_number,)  
        )
        connection.commit()

def add_teacher(name, subject, email, years_experience, employee_id):
    with get_db_connection() as connection:
        connection.execute(
            "INSERT INTO teachers (name, subject, email, years_experience, employee_id) VALUES (?, ?, ?, ?, ?)",
            (name, subject, email, years_experience, employee_id)
        )

def get_teachers():
    with get_db_connection() as connection:
        rows = connection.execute("SELECT * FROM teachers").fetchall()
        return [dict(row) for row in rows]

def update_teacher(employee_id, name, subject, email, years_experience):
    with get_db_connection() as connection:
        connection.execute(
            "UPDATE teachers SET name=?, subject=?, email=?, years_experience=? WHERE employee_id=?",
            (name, subject, email, years_experience, employee_id)
        )

def delete_teacher(employee_id):
    with get_db_connection() as connection:
        connection.execute("DELETE FROM teachers WHERE employee_id=?", (employee_id,))

def add_course(title, code, credits, department, description):
    with get_db_connection() as connection:
        connection.execute(
            "INSERT INTO courses (title, code, credits, department, description) VALUES (?, ?, ?, ?, ?)",
            (title, code, credits, department, description)
        )

def get_courses():
    with get_db_connection() as connection:
        rows = connection.execute("SELECT * FROM courses").fetchall()
        return [dict(row) for row in rows]


def update_course(code, title, credits, department, description):
    with get_db_connection() as connection:
        connection.execute(
            "UPDATE courses SET title=?, credits=?, department=?, description=? WHERE code=?",
            (title, credits, department, description, code)
        )

def delete_course(code):
    with get_db_connection() as connection:
        connection.execute("DELETE FROM courses WHERE code=?", (code,))