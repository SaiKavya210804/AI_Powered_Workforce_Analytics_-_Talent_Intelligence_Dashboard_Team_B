from pydantic import BaseModel


class Employee(BaseModel):
    """
    Employee model representing a workforce record.
    Used for validating employee data received through the API.
    """

    # Employee Information
    EmpID: str
    Age: int
    Gender: str
    MaritalStatus: str

    # Organization Information
    Department: str
    JobRole: str
    JobLevel: int

    # Education Information
    Education: int
    EducationField: str

    # Salary Information
    MonthlyIncome: int

    # Experience Information
    YearsAtCompany: int
    YearsWithCurrManager: int
    TrainingTimesLastYear: int

    # Employee Satisfaction Metrics
    EnvironmentSatisfaction: int
    JobSatisfaction: int
    RelationshipSatisfaction: int
    WorkLifeBalance: int

    # Employment Status
    Attrition: str