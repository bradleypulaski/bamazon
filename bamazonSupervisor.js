var mysql = require("mysql");
var inquirer = require("inquirer");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR_PASSWORD",
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
                message: "please select command",
                choices: ["view-sales-by-department", "add-department"],
                name: "choice"
            }


        ]).then(function(result) {
            if (result.choice == "add-department") {
                addDepartment();
            } else {
                viewSales();
            }
        });
}


function addDepartment() {
    inquirer
        .prompt([{
                name: "name",
                type: "input",
                message: "name of department?"
            },
            {
                name: "overhead",
                type: "input",
                message: "overhead costs of department?",
                validate: function validateOverhead(overhead) {
                    if (isNaN(parseInt(overhead))) {
                        console.log(" enter a number!");
                        return false;
                    } else {
                        return true;
                    }
                }
            }

        ]).then(function(result) {

            var name = result.name;
            var overhead = result.overhead;

            var query = con.query("insert into departments SET ?", {
                department_name: name,
                over_head_costs: overhead
            }, function(err, result) {
                if (err) throw err;
                console.log("congrats! you just added a " + name + " department");
                askQuit();
            });

        });
}


function viewSales() {

    con.query("SELECT *, SUM(products.product_sales * products.price) as product_sales, (SUM(products.product_sales * products.price) - over_head_costs) as total FROM departments LEFT JOIN products ON departments.department_id = products.department_id GROUP BY departments.department_id", function(err, result) {
        if (err) throw err;
        for (var key in result) {
            var product = "department id: " + result[key].department_id + " department_name: " + result[key].department_name + " overhead costs: $" + result[key].over_head_costs + " product sales: " + result[key].product_sales + " total profit: " + result[key].total;
            console.log(product);
        }
        askQuit();
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
