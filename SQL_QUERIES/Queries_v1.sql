-- Staff Related Queries  --


-- Stored PROCEDURE when registering for Account --
/*
    Gets inserted CUS_ID and increments by 1;
    Inserts into lms.customer table

    Example Usage:

    CALL Insert_Customers('Admin','Password1')
        -> Inserts new Row where Username : Admin and Password : Password

    -> Check if we are to insert email as well******* TODO
*/
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Customers`(
username varchar(256),
password varchar(256)
)
BEGIN
	set @last_id = (
		SELECT cus_id FROM lms.customer ORDER BY cus_id DESC LIMIT 1
		) + 1;
	INSERT INTO `lms`.`customer`
	(`cus_id`,
	`username`,
	`password`)
	VALUES
	(
	@last_id,
	username,
	password
	);

	SELECT cus_id,username,password FROM lms.customer ORDER BY cus_id DESC LIMIT 1;
END

-- Stored PROCEDURE USED for Updating Profile Details
/*
    Updates Values in Customer Table based on CUS_ID which is also the parameter

*/
CREATE DEFINER=`root`@`localhost` PROCEDURE `Update_Customer_Details`(
ID INT(8),
first_name VARCHAR(256),
last_name VARCHAR(256),
email VARCHAR(256),
address VARCHAR(256),
postal CHAR(6),
handphone CHAR(8),
dob DATE,
company VARCHAR(256),
jobtitle VARCHAR(256),
salary DOUBLE
)
BEGIN
	UPDATE `lms`.`customer`
		SET
		`first_name` =  first_name,
		`last_name` = last_name,
		`email` = email,
		`address` = address,
		`postal_code` = postal,
		`handphone` = handphone,
		`date_of_birth` = dob,
		`company` = company,
		`job_title` = jobtitle,
		`annual_salary` = salary
	WHERE `cus_id` = ID;
END

