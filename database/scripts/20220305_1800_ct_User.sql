CREATE TABLE [dbo].[User] (
    id int identity(1,1) PRIMARY KEY,
    firstname varchar(255),
    lastname varchar(255),
    username varchar(255),
    password varchar(255),
	roleId int FOREIGN KEY REFERENCES Role(id)
)