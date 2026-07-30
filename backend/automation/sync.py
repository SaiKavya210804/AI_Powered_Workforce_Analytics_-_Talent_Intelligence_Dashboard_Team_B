"""
sync.py

MongoDB -> Snowflake synchronization.

Handles:

INSERT
UPDATE
DELETE
"""


from app.database import employees_collection
from app.snowflake_client import get_snowflake_connection


from automation.logger import (
    log_info,
    log_error
)


from automation.sync_history import save_sync_history



def get_mongodb_employees():

    return list(
        employees_collection.find(
            {},
            {
                "_id":0
            }
        )
    )



def get_snowflake_employees():

    conn = get_snowflake_connection()


    try:

        cursor = conn.cursor()


        cursor.execute(
            """
            SELECT *
            FROM employees
            """
        )


        rows = cursor.fetchall()


        columns = [
            col[0].upper()
            for col in cursor.description
        ]


        employees=[]


        for row in rows:

            employees.append(
                dict(zip(columns,row))
            )


        return employees


    finally:

        conn.close()




def normalize_employee(employee):

    """
    Converts MongoDB format
    to Snowflake format.
    """


    return {

        "EMPID": employee["EmpID"],

        "AGE": employee["Age"],

        "GENDER": employee["Gender"],

        "DEPARTMENT": employee["Department"],

        "JOBROLE": employee["JobRole"],

        "EDUCATION": employee["Education"],

        "EDUCATIONFIELD": employee["EducationField"],

        "MARITALSTATUS": employee["MaritalStatus"],

        "MONTHLYINCOME": employee["MonthlyIncome"],

        "JOBLEVEL": employee["JobLevel"],

        "YEARSATCOMPANY": employee["YearsAtCompany"],

        "TRAININGTIMESLASTYEAR": employee["TrainingTimesLastYear"],

        "ENVIRONMENTSATISFACTION": employee["EnvironmentSatisfaction"],

        "JOBSATISFACTION": employee["JobSatisfaction"],

        "RELATIONSHIPSATISFACTION": employee["RelationshipSatisfaction"],

        "WORKLIFEBALANCE": employee["WorkLifeBalance"],

        "YEARSWITHCURRMANAGER": employee["YearsWithCurrManager"],

        "ATTRITION": employee["Attrition"]

    }




def insert_employee(employee):


    conn=get_snowflake_connection()


    try:

        cursor=conn.cursor()


        columns=",".join(employee.keys())


        placeholders=",".join(
            ["%s"]*len(employee)
        )


        query=f"""

        INSERT INTO employees

        ({columns})

        VALUES

        ({placeholders})

        """


        cursor.execute(
            query,
            list(employee.values())
        )


        conn.commit()


    finally:

        conn.close()





def update_employee(employee):


    conn=get_snowflake_connection()


    try:

        cursor=conn.cursor()


        emp_id=employee["EMPID"]


        update_columns=[
            f"{key}=%s"
            for key in employee.keys()
            if key!="EMPID"
        ]


        values=[
            value
            for key,value in employee.items()
            if key!="EMPID"
        ]


        values.append(emp_id)



        query=f"""

        UPDATE employees

        SET {",".join(update_columns)}

        WHERE EMPID=%s

        """



        cursor.execute(
            query,
            values
        )


        conn.commit()



    finally:

        conn.close()




def delete_employee(emp_id):


    conn=get_snowflake_connection()


    try:

        cursor=conn.cursor()


        cursor.execute(
            """
            DELETE FROM employees
            WHERE EMPID=%s
            """,
            (emp_id,)
        )


        conn.commit()


    finally:

        conn.close()




def has_changed(mongo_emp, snow_emp):

    for key, value in mongo_emp.items():

        if key == "EMPID":
            continue

        if snow_emp.get(key) != value:
            return True

    return False





def sync_all():


    inserted=0
    updated=0
    deleted=0



    try:


        mongo_data=get_mongodb_employees()

        snowflake_data=get_snowflake_employees()



        mongo_map={
            emp["EmpID"]:normalize_employee(emp)
            for emp in mongo_data
        }



        snowflake_map={
            emp["EMPID"]:emp
            for emp in snowflake_data
        }




        # INSERT / UPDATE


        for emp_id,employee in mongo_map.items():


            if emp_id not in snowflake_map:


                insert_employee(employee)

                inserted+=1



            else:


                if has_changed(
                    employee,
                    snowflake_map[emp_id]
                ):


                    update_employee(employee)

                    updated+=1





        # DELETE


        for emp_id in snowflake_map:


            if emp_id not in mongo_map:


                delete_employee(emp_id)

                deleted+=1




        save_sync_history(
            inserted,
            updated,
            deleted,
            "SUCCESS"
        )



        log_info(
            f"""
            Sync Completed

            Inserted: {inserted}

            Updated: {updated}

            Deleted: {deleted}
            """
        )



        return {

            "inserted":inserted,

            "updated":updated,

            "deleted":deleted,

            "status":"SUCCESS"

        }



    except Exception as e:


        log_error(
            f"Sync Failed: {str(e)}"
        )


        save_sync_history(
            inserted,
            updated,
            deleted,
            "FAILED"
        )


        raise e
