IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ContactForm')
BEGIN
    
    CREATE TABLE dbo.ContactForm (
        Id int identity(1,1),
        Name varchar(500),
        Email varchar(500),
        Message varchar(500)
    );
END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Department')
BEGIN
    
    CREATE TABLE dbo.Department (
        DepartmentId INT PRIMARY KEY IDENTITY,
        DepartmentName NVARCHAR(100) NOT NULL
    );
END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Employee')
BEGIN
    
    CREATE TABLE dbo.Employee (
        EmployeeId INT PRIMARY KEY IDENTITY,
        EmployeeName NVARCHAR(100) NOT NULL,
        Departament NVARCHAR(100),
        DateOfJoining DATE,
        PhotoFileName NVARCHAR(100)
    );
END
