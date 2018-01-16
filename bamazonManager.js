var mysql = require("mysql");
var inquirer = require("inquirer");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tiberiusAensland17",
    database: "bamazon"
});

con.connect(function(err) {
    if (err) throw err;
    runInquirer();
});


function runInquirer() {
    inquirer
        .prompt([{
                type: "list",
                message: "please select option",
                choices: ["view-products", "low-inventory", "add-inventory", "add-product"],
                name: "choice"
            }

        ]).then(function(result) {

            var choice = result.choice;

            switch (choice) {
                case "view-products":
                    viewProducts();
                    break;
                case "low-inventory":
                    lowInventory();
                    break;
                case "add-inventory":
                    addInventory();
                    break;
                case "add-product":
                    addProduct();
                    break;
            }
        });
}

function askQuit() {
    inquirer
        .prompt([{
                type: "list",
                message: "would you like to run another command?",
                choices: ["yes", "no"],
                name: "choice"
            }


        ]).then(function(result) {
            if (result.choice == "yes") {
                runInquirer();
            } else {
                con.end();
                process.exit();
            }
        });
}

function viewProducts() {
    con.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;
        for (var key in result) {
            var product = "ID: " + result[key].product_id + " Name: " + result[key].product_name + " Price: $" + result[key].price + " Stock: " + result[key].stock_quantity;
            console.log(product);
        }
        askQuit();
    });
}

function lowInventory() {
    con.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, result) {
        if (err) throw err;
        for (var key in result) {
            var product = "ID: " + result[key].product_id + " Name: " + result[key].product_name + " Price: $" + result[key].price + " Stock: " + result[key].stock_quantity;
            console.log(product);
        }
        askQuit();
    });
}

function addInventory() {
    con.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;
        var product_names = [];
        var product_stock = [];
        var product_ids = [];
        var names = [];
        for (var key in result) {
            product_ids.push(result[key].product_id);
            product_stock.push(result[key].stock_quantity);
            product_names.push(result[key].product_name + " - " + result[key].stock_quantity);
            names.push(result[key].product_name);
        }

        inquirer
            .prompt([

                {
                    type: "list",
                    choices: product_names,
                    message: "please select a product",
                    name: "product"
                },

                {
                    type: "input",
                    message: "how much stock are you adding?",
                    name: "stock",
                    validate: function validateStock(stock) {
                    if (isNaN(parseInt(stock))) {
                        console.log(" enter a number!");
                        return false;
                    }
                }

                }

            ]).then(function(result) {
                var product = result.product;
                var index = product_names.indexOf(product);
                var id = product_ids[index];
                var name = names[index];
                var stock = product_stock[index];
                var newstock = parseInt(result.stock) + stock;
                var addedstock = result.stock;

                var query = con.query("UPDATE products SET ? WHERE ? ", [{
                    stock_quantity: newstock,
                }, {
                    product_id: id
                }], function(err, result) {
                    if (err) throw err;
                    console.log("congrats! you just added  " + addedstock + " to " + name + "'s stock");
                    askQuit();
                });

            });

    });
}

function addProduct() {

    con.query("SELECT * FROM departments", function(err, result) {
        if (err) throw err;
        var ids = [];
        var names = [];
        for (var key in result) {
            ids.push(result[key].department_id);
            names.push(result[key].department_name);
        }

        inquirer
            .prompt([{
                    type: "list",
                    message: "which department?",
                    choices: names,
                    name: "department"
                }

            ]).then(function(result) {

                var department = result.department;
                var index = names.indexOf(department);
                var id = ids[index];

                inquirer
                    .prompt([{
                            type: "input",
                            message: "product name?",
                            name: "name"
                        },
                        {
                            type: "input",
                            message: "price?",
                            name: "price",
                            validate: function validatePrice(price) {
                                if (isNaN(parseFloat(price))) {
                                    console.log(" enter a number or decimal!");
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                        {
                            type: "input",
                            message: "product stock?",
                            name: "stock",
                            validate: function validateStock(stock) {
                                if (isNaN(parseInt(stock))) {
                                    console.log(" enter a number!");
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }

                    ]).then(function(result) {
                        var name = result.name;
                        var price = result.price;
                        var stock = result.stock;

                        var query = con.query("insert into products SET ?", {
                            product_name: name,
                            department_id: id,
                            price: price,
                            stock_quantity: stock,
                            product_sales: 0
                        }, function(err, result) {
                            if (err) throw err;
                            console.log("congrats! you just added a " + name);
                            askQuit();
                        });
                    });
            });

    });




}