$(document).ready(function () {
    UserDataTableFill("", "");
    var TxtMedicineNameFlag = false, TxtManufacturerFlag = false, TxtPriceFlag = false, TxtStockFlag = false;

    $(document).on('click', '.EditMedicine', function () {

        UserDataTableFill($(this).attr('data-UserMedicineEdit').trim(), "Where MID=");
    });



    $(document).on('click', '.DeleteCLS', function () {
        if (confirm("Are You Sure To Delete Record..??")) {
            DeleteMedicine(parseInt($(this).attr('data-DeleteMedicineId')));
        }
        else {
            alert("Delete karna nahi tha to click kyu kiya be.....")
        }
    })






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
        var keyCode = e.which ? e.which : e.keyCode
        var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
        $("#TxtPriceValidate").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });



    $("#TxtPrice").bind("blur", function (e) {
        $("#TxtPriceValidate").empty();
        if ($("#TxtPrice").val() == '') {
            TxtPriceFlag = false;
            $("#TxtPrice").html('(*) Price Required..!!');
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





    $("#BtnUpdateRecord").click(function () {
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
            UpdateRecord();



        }
        else {
            alert("Invalid Inputs..!!")
        }
    });



});




function UserDataTableFill(orderby, whereclause) {

    $.ajax({
        type: "GET",
        url: "/Medicine/MedicineManage",
        data: { "orderby": orderby, "whereclause": whereclause },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            if (whereclause == 'Where MID=') {
                $("#TxtMName").val(response.data[0].m_Name);
                $("#TxtMFName").val(response.data[0].m_Manufacturer);
                $("#TxtPrice").val(response.data[0].m_Price);
                $("#TxtDate").val(response.data[0].m_Exp_Date);
                $("#TxtStock").val(response.data[0].m_Stock);
                $("#BtnUpdateRecord").attr('EditMedicineId', response.data[0]["m_Id"]);
            }
            else {
                $("#tbl1 tbody").empty();
                for (var i = 0; i < response.data.length; i++) {
                    var tr_str = '';



                    tr_str = "<tr class='datatable-row' id=" + response.data[i]["m_Id"] + ">" +
                        "<td class='datetable-cell'><span style='width:100px'>" + (i + 1) + "</span></td>" +
                        "<td class='datetable-cell'><span style='width:100px'>" + response.data[i]["m_Name"] + "</span></td>" +
                        "<td class='datetable-cell'><span style='width:70px'>" + response.data[i]["m_Manufacturer"] + "</span></td>" +
                        "<td class='datetable-cell'><span style='width:80px'>" + response.data[i]["m_Price"] + "</span></td>" +
                        "<td class='datetable-cell'><span style='width:80px'>" + response.data[i]["m_Exp_Date"] + "</span></td>" +
                        "<td class='datetable-cell'><span style='width:80px'>" + response.data[i]["m_Stock"] + "</span></td>" +
                        "<td class='datetable-cell'><a data-UserMedicineEdit=" + response.data[i]["m_Id"] + " class='EditMedicine' data-toggle='modal' data-target='#EditMedicineRecord'><i class='fa fa-2x fa-edit'></i></a></td > " +
                        "<td class='datetable-cell'><a data-DeleteMedicineId=" + response.data[i]["m_Id"] + " class='DeleteCLS'><i style='color:red' class='fa fa-2x fa-times-circle'></i></a></td > " +
                        "</tr>";



                    $("#tbl1 tbody").append(tr_str);
                }
            }
        },
        error: function () {
            alert("UnExpected error occured sorry for inconvinience!!!");
        }
    });
}



function UpdateRecord() {

    var medicine = new Object();
    medicine.M_Id = ($("#BtnUpdateRecord").attr('EditMedicineId'));
    medicine.M_Name = $("#TxtMName").val().trim();
    medicine.M_Manufacturer = $("#TxtMFName").val().trim();
    medicine.M_Price = $("#TxtPrice").val().trim();
    medicine.M_Exp_Date = $("#TxtDate").val().trim();
    medicine.M_Stock = $("#TxtStock").val().trim();

    $.ajax({
        type: "POST",
        cache: false,
        dataType: "json",
        url: "/Medicine/UpdateMedicine",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(medicine),
        success: function (response) {
            if (response.success = "success") {
                alert("data Updated Successfully");
                $("input").val("");
                UserDataTableFill("", "");
                $("#EditMedicineRecord .close").click();
            }
        },
        error: function (response) {
            alert("ERROR");
        }



    });



};



function DeleteMedicine(id) {

    var obj = new Object();
    obj.M_Id = id;

    $.ajax({
        url: "/Medicine/DeleteMedicine",
        type: 'POST',
        dataType: "json",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(obj),
        success: function () {
            alert("Data Deleted");
            UserDataTableFill("", "");
        },
        error: function (jqXHR, textStatus, err) {
            alert('text status ' + textStatus + ', err ' + err)
        }
    });



    return true;
}