$(document).ready(function () {
    var $FNameLNameRegEx = /^([a-zA-Z]{2,20})$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;
    var $PasswordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,12}$/;

    $("#TxtFName").bind("keypress", function (e) {
        var keyCode = e.which;
        var ret = ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122));
        $("#TxtFNameValidate").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });
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

    $("#Email").bind("blur", function (e) {
        $("#TxtEmailIdValidate").empty();
        if ($("#Email").val() == "") {
            $("#TxtEmailIdValidate").empty();
            TxtEmailIdFlag = false;
            $("#TxtEmailIdValidate").html('(*) Email Id Required..!!');
        }
        else {
            if (!$("#Email").val().match($EmailIdRegEx)) {
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

    $("#TxtPassword").bind("blur", function (e) {
        $("#TxtPasswordValidate").empty();
        if ($("#TxtPassword").val() == "") {
            $("#TxtPasswordValidate").empty();
            TxtEmailIdFlag = false;
            $("#TxtPasswordValidate").html('(*) Password Required..!!');
        }
        else {
            if (!$("#TxtPassword").val().match($PasswordRegEx)) {
                TxtEmailIdFlag = false;
                $("#TxtPasswordValidate").html('Invalid Password..!!');
            }
            else {
                $("#TxtPasswordValidate").empty();
                TxtEmailIdFlag = true;
            }
        }
        return TxtEmailIdFlag;
    });

    $("#BtnSignUp").click(function () {

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

        if ($("#Email").val() == "") {
            $("#TxtEmailIdValidate").empty();
            TxtEmailIdFlag = false;
            $("#TxtEmailIdValidate").html('(*) Email Id Required..!!');
        }
        else {
            if (!$("#Email").val().match($EmailIdRegEx)) {
                TxtEmailIdFlag = false;
                $("#TxtEmailIdValidate").html('Invalid Email Id..!!');
            }
            else {
                $("#TxtEmailIdValidate").empty();
                TxtEmailIdFlag = true;
            }
        }

        if ($("#TxtPassword").val() == "") {
            $("#TxtPasswordValidate").empty();
            TxtPasswordFlag = false;
            $("#TxtPasswordValidate").html('(*) Password Required..!!');
        }
        else {
            if (!$("#TxtPassword").val().match($PasswordRegEx)) {
                TxtPasswordFlag = false;
                $("#TxtPasswordValidate").html('Invalid Password..!!');
            }
            else {
                $("#TxtPasswordValidate").empty();
                TxtPasswordFlag = true;
            }
        }

        if (TxtFNameFlag == true && TxtLNameFlag == true && TxtEmailIdFlag == true && TxtPasswordFlag == true) {
            SignUp();
        }
        else {
            alert("Invalid Inputs..!!")
        }

    });

});



function SignUp() {
    var user = new Object();
    user.Id = 0;
    user.FirstName = $("#TxtFName").val().trim();
    user.LastName = $("#TxtLName").val().trim();
    user.Email = $("#Email").val().trim();
    user.Password = $("#TxtPassword").val().trim();
    user.UserRole = $("#DDL_Role").val().trim();
    user.IsActive = 'Y';

    $.ajax({
        type: "POST",
        cache: false,
        dataType: "json",
        url: "/UserManagement/AddUser",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user),
        success: function (response) {
            if (response.success = "success") {
                alert("data Inserted Successfully");
                $("input").val("");
                $("DDL_User").val("U");
            }
        },
        error: function (response) {
            alert("ERROR");
        }



    });



};