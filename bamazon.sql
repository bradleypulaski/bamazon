DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE departments (  department_id int(11) primary key auto_increment ,     department_name varchar(256) DEFAULT NULL,     over_head_costs int(11)  DEFAULT NULL  );

CREATE TABLE products (  product_id int(11) primary key auto_increment ,     product_name varchar(256) DEFAULT NULL,     department_id int(11) DEFAULT NULL,     price DECIMAL(11,2) DEFAULT NULL,     stock_quantity int(11) DEFAULT NULL,     product_sales int(11) DEFAULT NULL,          index(department_id)  );

INSERT INTO departments (department_name, over_head_costs) values ("electronics", 10000);

INSERT INTO departments (department_name, over_head_costs) values ("clothing", 20000);

INSERT INTO departments (department_name, over_head_costs) values ("furniture", 30000);

INSERT INTO departments (department_name, over_head_costs) values ("sundries", 3000);

INSERT INTO departments (department_name, over_head_costs) values ("mobile", 5000);

INSERT INTO departments (department_name, over_head_costs) values ("food", 8000);

INSERT INTO departments (department_name, over_head_costs) values ("hygiene", 2000);

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("ipod", 1, 249.99, 12, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("ipad", 1, 349.99, 9, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("lg oled b8 tv", 1, 2999.99, 3, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("iwatch", 1, 149.99, 39, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("t shirt", 2, 9.99, 120, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("kakis", 2, 29.99, 88, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("jeans", 2, 49.99, 35, 0);

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("jacket", 2, 39.99, 26, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("hardwood table", 3, 129.99, 12, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("steel chair with lumbar", 3, 49.99, 23, 0); 
insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("oak cabinet", 3, 239.99, 40, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("toothpaste pack 12", 4, 9.99, 45, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("soap pack 35", 4, 19.99, 250, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("toilet paper 45 ct", 4, 29.99, 230, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("bmobile smartphone", 5, 199.99, 23, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("bmobile contract", 5, 299.99, 999, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("bagguette", 6, 5.99, 119, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("donuts", 6, 9.99, 45, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("head brocolli", 6, 1.09, 34, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("mustard", 6, 1.99, 39, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("ketchup", 6, 2.99, 45, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("tv dinner", 6, 3.99, 78, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("deoderant", 7, 0.99, 128, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("axe spray", 7, 2.99, 139, 0); 

insert into products (product_name, department_id, price, stock_quantity, product_sales) values ("antiseptic wash", 7, 1.99, 245, 0); 





