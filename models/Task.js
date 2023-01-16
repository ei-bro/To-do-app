const userTable = ` CREATE TABLE Users(
	id INT(11) NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY(id)	
) `;


const taskTable = ` CREATE TABLE Task (
	id INT NOT NULL AUTO_INCREMENT,
	uid INT(11) NOT NULL,
	task_name VARCHAR(255),
	completed BOOLEAN DEFAULT false,
	PRIMARY KEY (id),
	FOREIGN KEY (uid) REFERENCES users(id)
) `;

