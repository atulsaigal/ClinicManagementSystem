$(document).ready(function () {
    UserDataTableFill("", "");

    $(document).on('click', '.EditRecordCLS', function () {
        UserDataTableFill($(this).attr('data-PatientIdEdit').trim(), "Where PID=");
    });

    $(document).on('click', '.AddPrescription', function () {
        PresDataTableFill($(this).attr('data-PatientPrescriptionId').trim(), "Where PID=");
    });

    $(document).on('click', '.DeleteRecordCLS', function () {
        if (confirm("Are You Sure To Change View Status..??")) {
            DeleteRecord(parseInt($(this).attr('data-UserDeleteId')));
        }
    });

    var $FNameLNameRegEx = /^([a-zA-Z]{2,20})$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;
    var $ConNoRegEx = /^([0-9]{10})$/;

    var TxtFNameFlag = false, TxtLNameFlag = false, TxtEmailIdFlag = false, TxtAddressFlag = false, TxtContactNoFlag = false;


    $("#TxtFName").bind("keypress", function (e) {
        var keyCode = e.which;
        var ret = ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122));
        $("#TxtFNameValidate").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    })

    $("#TxtFName").bind("blur", function (e) {
        if ($("#TxtFName").val() == "") {
            TxtFNameFlag = false;
            $("#TxtFNameValidate").empty();
            $("#TxtFNameValidate").html('(*) First Name Required..!!');
        }
        else {
            $("#TxtFNameValidate").empty();
            if (!$("#TxtFName").val().match($FNameLNameRegEx)) {
                $("#TxtFNameValidate").html('Invalid First Name..!!');
                TxtFNameFlag = false;
            }
            else {
                $("#TxtFNameValidate").empty();
                TxtFNameFlag = true;
            }
        }
    });


    $("#TxtLName").bind("keypress", function (e) {
        var keyCode = e.which;
        var ret = ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122));
        $("#TxtLNameValidate").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });

    $("#TxtLName").bind("blur", function (e) {
        if ($("#TxtLName").val() == "") {
            TxtLNameFlag = false;
            $("#TxtLNameValidate").empty();
            $("#TxtLNameValidate").html('(*) Last Name Required..!!');
        }
        else {
            $("#TxtLNameValidate").empty();
            if (!$("#TxtLName").val().match($FNameLNameRegEx)) {
                $("#TxtLNameValidate").html('Invalid Last Name..!!');
                TxtLNameFlag = false;
            }
            else {
                $("#TxtLNameValidate").empty();
                TxtLNameFlag = true;
            }
        }
    });

    $("#TxtEmailId").bind("blur", function (e) {
        $("#TxtEmailIdValidate").empty();
        if ($("#TxtEmailId").val() == "") {
            $("#TxtEmailIdValidate").empty();
            TxtEmailIdFlag = false;
            $("#TxtEmailIdValidate").html('(*) Email Id Required..!!');
        }
        else {
            if (!$("#TxtEmailId").val().match($EmailIdRegEx)) {
                TxtEmailIdFlag = false;
                $("#TxtEmailIdValidate").html('Invalid Email Id..!!');
            }
            else {
                $("#TxtEmailIdValidate").empty();
                TxtEmailIdFlag = true;
            }
        }
        return TxtEmailIdFlag;
    });

    $("#TxtAddress").bind("blur", function (e) {
        $("#TxtAddressValidate").empty();
        if ($("#TxtAddress").val() == "") {
            $("#TxtAddressValidate").empty();
            TxtAddressFlag = false;
            $("#TxtAddressValidate").html('(*) Address Required..!!');
        }
        else {
            if (!$("#TxtAddress").val().match()) {
                TxtAddressFlag = false;
                $("#TxtAddressValidate").html('Invalid Address..!!');
            }
            else {
                $("#TxtAddressValidate").empty();
                TxtAddressFlag = true;
            }
        }
        return TxtAddressFlag;
    });


    $("#TxtContactNo").bind("keypress", function (e) {
        var keyCode = e.which;
        var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
        $("#TxtContactNoValidate").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });

    $("#TxtContactNo").bind("blur", function (e) {
        $("#TxtContactNoValidate").empty();
        if ($("#TxtContactNo").val() == '') {
            TxtContactNoFlag = false;
            $("#TxtContactNoValidate").html('(*) Contact No Required..!!');
        }
        else {
            if (!$("#TxtContactNo").val().match($ConNoRegEx)) {
                TxtContactNoFlag = false;
                $("#TxtContactNoValidate").html('Invalid Contact No..!!');
            }
            else {
                $("#TxtContactNoValidate").empty();
                TxtContactNoFlag = true;
            }
        }
        return TxtContactNoFlag;
    });



    $("#BtnUpdateRecord").click(function () {
        if ($("#TxtFName").val() == "") {
            $("#TxtFNameValidate").empty();
            $("#TxtFNameValidate").html('(*) First Name Required..!!');
        }
        else {
            $("#TxtFNameValidate").empty();
            if (!$("#TxtFName").val().match($FNameLNameRegEx)) {
                $("#TxtFNameValidate").html('Invalid First Name..!!');
                TxtFNameFlag = false;
            }
            else {
                $("#TxtFNameValidate").empty();
                TxtFNameFlag = true;
            }
        }
        if ($("#TxtLName").val() == "") {
            $("#TxtLNameValidate").empty();
            $("#TxtLNameValidate").html('(*) Last Name Required..!!');
        }
        else {
            $("#TxtLNameValidate").empty();
            if (!$("#TxtLName").val().match($FNameLNameRegEx)) {
                $("#TxtLNameValidate").html('Invalid Last Name..!!');
                TxtLNameFlag = false;
            }
            else {
                $("#TxtLNameValidate").empty();
                TxtLNameFlag = true;
            }
        }

        if ($("#TxtEmailId").val() == "") {
            $("#TxtEmailIdValidate").empty();
            $("#TxtEmailIdValidate").html('(*) Email Id Required..!!');
        }
        else {
            $("#TxtEmailIdValidate").empty();
            if (!$("#TxtEmailId").val().match($EmailIdRegEx)) {
                TxtEmailIdFlag = false;
                $("#TxtEmailIdValidate").html('Invalid Email Id..!!');
            }
            else {
                $("#TxtEmailIdValidate").empty();
                TxtEmailIdFlag = true;
            }

            if ($("#TxtAddress").val() == "") {
                $("#TxtAddressValidate").empty();
                TxtAddressFlag = false;
                $("#TxtAddressValidate").html('(*) Email Id Required..!!');
            }
            else {
                if (!$("#TxtAddress").val().match()) {
                    TxtAddressFlag = false;
                    $("#TxtAddressValidate").html('Invalid Email Id..!!');
                }
                else {
                    $("#TxtAddressValidate").empty();
                    TxtAddressFlag = true;
                }
            }


        }
        if ($("#TxtContactNo").val() == "") {
            $("#TxtContactNoValidate").empty();
            $("#TxtContactNoValidate").html('(*) Contact No. Required..!!');
        }
        else {
            $("#TxtContactNoValidate").empty();
            if (!$("#TxtContactNo").val().match($ConNoRegEx)) {
                $("#TxtContactNoValidate").html('Invalid Contact No..!!');
                TxtContactNoFlag = false;
            }
            else {
                $("#TxtContactNoValidate").empty();
                TxtContactNoFlag = true;
            }
        }

        if (TxtFNameFlag == true && TxtLNameFlag == true && TxtEmailIdFlag == true && TxtContactNoFlag == true && TxtAddressFlag == true) {
            UpdateRecord();
        }
        else {
            alert("Invalid Inputs..!!")
        }
    });

    $("#BtnAddPrescription").click(function () {
        AddPrescription();
    });

});

function UserDataTableFill(orderby, whereclause) {


    $.ajax({
        type: "GET",
        url: "/Patient/GetPatientData",
        data: { "orderby": orderby, "whereclause": whereclause },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (whereclause == 'Where PID=') {
                $("#TxtFName").val(response.data[0].firstname);
                $("#TxtLName").val(response.data[0].lastname);
                $("#TxtEmailId").val(response.data[0].emailID);
                $("#TxtAddress").val(response.data[0].address);
                $("#TxtSymptoms").val(response.data[0].symptoms);
                $("#TxtContactNo").val(response.data[0].contactNo);
                $("#DDL_IsFollowUp").val(response.data[0].isFollowUp);


                //$("#DDL_User").val(response.data[0].);
                $("#BtnUpdateRecord").attr('EditUserId', response.data[0]["patientId"]);
            }
            else {

                $("#table14 tbody").empty();
                for (var i = 0; i < response.data.length; i++) {
                    var tr_str = '';
                    var Status = null;
                    Status = "<i style='color:red' class='fa fa-2x fa-times-circle'></i>";


                    tr_str = "<tr class='datatable-row' id=" + response.data[i]["patientId"] + ">" +
                        "<td class='text-center'><span style='width:100px'>" + (i + 1) + "</span></td>" +
                        "<td class='text-center'><span style='width:100px'>" + response.data[i]["firstname"] + "</span></td>" +
                        "<td class='text-center'><span style='width:70px'>" + response.data[i]["lastname"] + "</span></td>" +
                        "<td class='text-center'><span style='width:80px'>" + response.data[i]["emailID"] + "</span></td>" +
                        "<td class='text-center'><span style='width:80px'>" + response.data[i]["address"] + "</span></td>" +
                        "<td class='text-center'><span style='width:80px'>" + response.data[i]["symptoms"] + "</span></td>" +
                        "<td class='text-center'><span style='width:80px'>" + response.data[i]["contactNo"] + "</span></td>" +
                        "<td class='text-center'><span style='width:80px'>" + response.data[i]["isFollowUp"] + "</span></td>" +


                        /* "<td class='datatable-cell'><span style='width:80px'>" + response.data[i]["isActive"] + "</span></td>" +*/
                        //"<td class='text-center'><a data-UserRoleId=" + response.data[i]["userId"] + " data-UserStatus=" + response.data[i]["userRole"] + " class='EditRoleCLS'>" + userrole + "</a></td>" +


                        "<td class='text-center'><a data-PatientIdEdit=" + response.data[i]["patientId"] + " class='EditRecordCLS' data-toggle='modal' data-target='#EditPatientRecord'><i class='fa fa-2x fa-pencil-square-o'></i></a></td>" +

                        "<td class='text-center'><a data-UserDeleteId=" + response.data[i]["patientId"] + " class='DeleteRecordCLS'>" + Status + "</a></td>" +
                        "<td class='text-center'><a data-PatientPrescriptionId=" + response.data[i]["patientId"] + " class='AddPrescription' data-toggle='modal' data-target='#AddPatientPrescription'><i class='fa fa-2x fa-pencil-square-o'></i></a></td>" +
                        "</tr>";

                    $("#table14 tbody").append(tr_str);
                }
            }



        },
        error: function () {
            alert("UnExpected error occured sorry for inconvinience!!!");
        }
    });
}

function UpdateRecord() {


    var patient = new Object();
    patient.PatientId = $("#BtnUpdateRecord").attr('EditUserId');
    patient.firstname = $("#TxtFName").val().trim();
    patient.lastname = $("#TxtLName").val().trim();
    patient.emailID = $("#TxtEmailId").val().trim();
    patient.address = $("#TxtAddress").val().trim();
    patient.symptoms = $("#TxtSymptoms").val().trim();
    patient.contactNo = $("#TxtContactNo").val().trim();
    patient.isFollowUp = $("#DDL_IsFollowUp").val().trim();

    $.ajax({
        type: "POST",
        cache: false,
        dataType: "json",
        url: "/Patient/UpdateRecord",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(patient),
        success: function (response) {
            if (response.success = "success") {
                alert("data Updated Successfully");
                $("input").val("");

                UserDataTableFill("", "");
                $("#EditPatientRecord .close").click();

                alert("Done!!!");
            }
        },
        error: function (response) {
            alert("ERROR");
        }

    });

};


function DeleteRecord(id) {

    var obj = new Object();
    obj.PatientId = id;

    $.ajax({
        url: "/Patient/DeleteRecord",
        type: 'POST',
        dataType: "json",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(obj),
        success: function () {
            UserDataTableFill("", "");
            alert("Data Deleted");

        },
        error: function (jqXHR, textStatus, err) {
            alert('text status ' + textStatus + ', err ' + err)
        }
    });

    return true;
}


function PresDataTableFill(orderby, whereclause) {


    $.ajax({
        type: "GET",
        url: "/Patient/GetPatientData",
        data: { "orderby": orderby, "whereclause": whereclause },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (whereclause == 'Where PID=') {
                $("#TxtPFName").val(response.data[0].firstname);
                $("#TxtPLName").val(response.data[0].lastname);
                $("#TxtSymptoms1").val(response.data[0].symptoms);
                $("#BtnAddPrescription").attr('PatientPrescriptionId', response.data[0]["patientId"]);
            }
            else {

                $("#table14 tbody").empty();
                for (var i = 0; i < response.data.length; i++) {
                    var tr_str = '';
                    var Status = null;
                    Status = "<i style='color:red' class='fa fa-2x fa-times-circle'></i>";


                    tr_str = "<tr class='datatable-row' id=" + response.data[i]["patientId"] + ">" +
                        "<td class='text-center'><span style='width:100px'>" + (i + 1) + "</span></td>" +
                        "<td class='text-center'><span style='width:100px'>" + response.data[i]["firstname"] + "</span></td>" +
                        "<td class='text-center'><span style='width:70px'>" + response.data[i]["lastname"] + "</span></td>" +
                        "<td class='text-center'><span style='width:80px'>" + response.data[i]["symptoms"] + "</span></td>" +
                        "<td class='text-center'><a data-PatientPrescriptionId=" + response.data[i]["patientId"] + " class='AddPrescription' data-toggle='modal' data-target='#AddPatientPrescription'><i class='fa fa-2x fa-pencil-square-o'></i></a></td>" +
                        "</tr>";

                    $("#table14 tbody").append(tr_str);
                }
            }



        },
        error: function () {
            alert("UnExpected error occured sorry for inconvinience!!!");
        }
    });
}

function AddPrescription() {

    var P = new Object();
    P.PatientId = $("#BtnAddPrescription").attr('PatientPrescriptionId');
    P.medicineName = $("#TxtMedName").val().trim();
    P.Quantity = $("#TxtMedQuantity").val().trim();
    debugger
    $.ajax({
        type: "POST",
        cache: false,
        dataType: "json",
        url: "/Prescription/AddPrescription",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(P),
        success: function (response) {
            if (response.success = "success") {
                alert("data Added Successfully");
                $("#TxtMedName").val("");
                $("#TxtMedQuantity").val("");
            }
        },
        error: function (response) {
            alert("ERROR");
        }

    });

}