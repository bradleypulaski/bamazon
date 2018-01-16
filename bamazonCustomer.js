var mysql = require("mysql");
var inquirer = require("inquirer");

var choice_ids = [];
var choice_names = [];

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tiberiusAensland17",
    database: "bamazon"
});

con.connect(function(err) {
    if (err) throw err;

    con.query("SELECT department_id, department_name FROM departments", function(err, result) {
        if (err) throw err;

        for (var key in result) {
            choice_ids.push(result[key].department_id);
            choice_names.push(result[key].department_name);
        }

        runInquirer(choice_ids, choice_names);

    });

});

function runInquirer(ids, names) {

    inquirer
        .prompt([

            {
                type: "list",
                message: "please select department",
                choices: names,
                name: "department"
            }

        ]).then(function(result) {

            var name = result.department;
            var index = names.indexOf(name);
            var id = ids[index];


            getProducts(id);
        });

}

function getProducts(department_id) {
    con.query("SELECT * FROM products WHERE department_id = " + department_id, function(err, result) {
        if (err) throw err;
        var product_names = [];
        var product_ids = [];
        var product_stock = [];
        var product_sales = [];
        for (var key in result) {
            product_ids.push(result[key].product_id);
            product_names.push(result[key].product_name + " - $" + result[key].price);
            product_stock.push(result[key].stock_quantity);
            product_sales.push(result[key].product_sales);
        }

        selectProduct(product_ids, product_names, product_sales, product_stock);
    });
}

function selectProduct(ids, names, psales, pstock) {
    inquirer
        .prompt([

            {
                type: "list",
                message: "please select product",
                choices: names,
                name: "product"
            }

        ]).then(function(result) {

            var name = result.product;
            var index = names.indexOf(name);
            var id = ids[index];

            var stock = parseInt(pstock[index]);
            var sales = parseInt(psales[index]);


            if (stock <= 0) {
                console.log("We Apologize for the inconvenience but we are out of " + name + " please check back later");
                askQuit();

            } else {
                buyProduct(id, name, sales + 1, stock - 1)
            }

        });
}

function buyProduct(id, name, sales, stock) {

    var query = con.query("UPDATE products SET ? WHERE ? ", [{
        stock_quantity: stock,
        product_sales: sales
    }, {
        product_id: id
    }], function(err, result) {
        if (err) throw err;
        console.log("congrats! you just bought a/n " + name);
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
                 runInquirer(choice_ids, choice_names);
            } else {
                con.end();
                process.exit();
            }
        });
}
