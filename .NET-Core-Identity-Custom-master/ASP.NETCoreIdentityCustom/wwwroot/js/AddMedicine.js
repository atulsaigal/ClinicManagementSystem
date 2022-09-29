$(document).ready(function () {
    var TxtMedicineNameFlag = false, TxtManufacturerFlag = false, TxtPriceFlag = false, TxtStockFlag = false;

    var specialKeys = new Array();
    specialKeys.push(8);
    specialKeys.push(9);
    specialKeys.push(46);

    specialKeys.push(16);
    specialKeys.push(20);

    specialKeys.push(37);
    specialKeys.push(39);


    //Create New Account - Sign Up.


    $("#TxtMedicineName").bind("blur", function (e) {
        if ($("#TxtMedicineName").val() == "") {
            TxtMedicineNameFlag = false;
            $("#TxtMedicineNameValidate").empty();
            $("#TxtMedicineNameValidate").html('*Please Enter Medicine Name..!!');
        }
        else {

            $("#TxtFNameValidate").empty();
            TxtMedicineNameFlag = true;
        }
    });


    $("#TxtManufacturerName").bind("blur", function (e) {
        if ($("#TxtManufacturerName").val() == "") {
            TxtManufacturerFlag = false;
            $("TxtManufacturerNameValidate").empty();
            $("#TxtManufacturerNameValidate").html('*Please Enter Manufacturer Name..!!');
        }
        else {

            $("#TxtManufacturerNameValidate").empty();
            TxtManufacturerFlag = true;
        }
    });



    $("#TxtPrice").bind("keypress", function (e) {
        var keyCode = e.which;
        var ret = ((keyCode >= 48 && keyCode <= 57));
        $("#TxtPriceValidate").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });

    $("#TxtPrice").bind("blur", function (e) {
        $("#TxtPriceValidate").empty();
        if ($("#TxtPrice").val() == '') {
            TxtPriceFlag = false;
            $("#TxtPriceValidate").html('(*) Price Required..!!');
        }
        else {

            $("#TxtPriceValidate").empty();
            TxtPriceFlag = true;
        }

        return TxtPriceFlag;
    });


    $("#TxtStock").bind("keypress", function (e) {
        var keyCode = e.which ? e.which : e.keyCode
        var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
        $("#TxtStockValidate").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });

    $("#TxtStock").bind("blur", function (e) {
        $("#TxtStockValidate").empty();
        if ($("#TxtStock").val() == '') {
            TxtStockFlag = false;
            $("#TxtStockValidate").html('(*) Price Required..!!');
        }
        else {

            $("#TxtStockValidate").empty();
            TxtStockFlag = true;
        }

        return TxtStockFlag;
    });



    $("#BtnAddMedicine").click(function () {
        if ($("#TxtMedicineName").val() == "") {
            TxtMedicineNameFlag = false;
            $("#TxtMedicineNameValidate").empty();
            $("#TxtMedicineNameValidate").html('*Please Enter Medicine Name..!!');
        }
        else {

            $("#TxtFNameValidate").empty();
            TxtMedicineNameFlag = true;
        }

        if ($("#TxtManufacturerName").val() == "") {
            TxtManufacturerFlag = false;
            $("TxtManufacturerNameValidate").empty();
            $("#TxtManufacturerNameValidate").html('*Please Enter Manufacturer Name..!!');
        }
        else {

            $("#TxtManufacturerNameValidate").empty();
            TxtManufacturerFlag = true;
        }

        if ($("#TxtPrice").val() == '') {
            TxtPriceFlag = false;
            $("#TxtPriceValidate").html('(*) Price Required..!!');
        }
        else {

            $("#TxtPriceValidate").empty();
            TxtPriceFlag = true;
        }

        if ($("#TxtStock").val() == '') {
            TxtStockFlag = false;
            $("#TxtStockValidate").html('(*) Stock Required..!!');
        }
        else {

            $("#TxtStockValidate").empty();
            TxtStockFlag = true;
        }


        if (TxtMedicineNameFlag == true && TxtManufacturerFlag == true && TxtPriceFlag == true && TxtStockFlag == true) {
            alert("this is button click event");
            AddMedicine();

        }
        else {
            alert("Invalid Inputs..!!")
        }
    });

});

function AddMedicine() {

    var medicine = new Object();
    medicine.MID = 0;
    medicine.M_Name = $("#TxtMedicineName").val().trim();
    medicine.M_Manufacturer = $("#TxtManufacturerName").val().trim();
    medicine.M_Price = $("#TxtPrice").val().trim();
    medicine.M_Exp_Date = $("#TxtDateId").val().trim();
    medicine.M_Stock = $("#TxtStock").val().trim();

    $.ajax({
        type: "POST",
        cache: false,
        dataType: "json",
        url: "/Medicine/AddMedicine",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(medicine),
        success: function (response) {

            if (response.success = "success") {
                alert("data Inserted Successfully");
                $("input").val("");
                alert("Done!!!");
            }
        },
        error: function (response) {
            alert("ERROR");
        }

    });

};
