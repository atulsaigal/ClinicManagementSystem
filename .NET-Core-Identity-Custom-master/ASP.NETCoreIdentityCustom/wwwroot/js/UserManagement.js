$(document).ready(function () {
    alert("HEllo");
    var $FNameLNameRegEx = /^([a-zA-Z]{2,20})$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;

    UserDataTableFill("", "");


    $("#FirstNameSortingLink").click(function () {
        UserDataTableFill("Order By FirstName", "");
    });

    $("#LastNameSortingLink").click(function () {
        UserDataTableFill("Order By LastName", "");
    });

    $("#EmailIdSortingLink").click(function () {
        UserDataTableFill("Order By Email", "");
    });

    $(document).on('click', '.EditStatusCLS', function () {
        if (confirm("Are You Sure To Change View Status..??")) {
            if ($(this).attr('data-UserStatus') == "N") {

                $(this).find("i").removeClass("fa-times-circle");
                $(this).find("i").addClass("fa-check-square");
                $(this).find("i").css("color", "#228B22");
                $(this).attr("data-UserStatus", "Y");
                UpdateUserStatus(parseInt($(this).attr('data-UserStatusId')), "Y");
            } else {
                $(this).find("i").removeClass("fa-check-square");
                $(this).find("i").addClass("fa-times-circle");
                $(this).find("i").css("color", "#ff0000");
                $(this).attr("data-UserStatus", "N");
                UpdateUserStatus(parseInt($(this).attr('data-UserStatusId')), "N");
            }
        }
    });



    $(document).on('click', '.EditRecord', function () {
        UserDataTableFill($(this).attr('data-UserIdEdit').trim(), "Where UID=");
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
        }

        if (TxtFNameFlag == true && TxtLNameFlag == true && TxtEmailIdFlag == true) {
            UpdateRecord();

        }
        else {
            alert("Invalid Inputs..!!")
        }
    });

})





function UserDataTableFill(orderby, whereclause) {
    $.ajax({
        type: "GET",
        url: "/UserManagement/GetAllUserData",
        data: { "orderby": orderby, "whereclause": whereclause },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var tr_str = '';

            if (response.data.length > 0) {
                if (whereclause == 'Where UID=') {
                    $("#TxtFName").val(response.data[0].firstName);
                    $("#TxtLName").val(response.data[0].lastName);
                    $("#TxtEmailId").val(response.data[0].email);
                    $("#DDL_Role").val(response.data[0].userRole);
                    $("#BtnUpdateRecord").attr('EditUserId', response.data[0].uid);
                }

                else {
                    $("#tbl1 tbody").empty();
                    for (var i = 0; i < response.data.length; i++) {

                        var StatusIcon = null, RoleIcon = null;

                        if (response.data[i]["isActive"] == 'Y') {
                            StatusIcon = "<i style='color:#228B22' class='fa fa-2x fa-check-square'></i>";
                        }
                        else {
                            StatusIcon = "<i style='color:#ff0000' class='fa fa-2x fa-times-circle'></i>";
                        }
                        if (response.data[i]["userRole"] == 'U') {
                            RoleIcon = "<i class='fa fa-2x fa-user'></i>";
                        }
                        else {
                            RoleIcon = "<i class='fa fa-2x fa-user-circle'></i>";
                        }

                        tr_str = "<tr class='datatable-row' id=" + response.data[i]["uid"] + ">" +
                            "<td class='datatable-cell'><span style='width:100px'>" + (i + 1) + "</span></td>" +
                            "<td class='datatable-cell'><span style='width:100px'>" + response.data[i]["firstName"] + "</span></td>" +
                            "<td class='datatable-cell'><span style='width:70px'>" + response.data[i]["lastName"] + "</span></td>" +
                            "<td class='datatable-cell'><span style='width:80px'>" + response.data[i]["email"] + "</span></td>" +
                            "<td class='datatable-cell'><a data-UserRoleId=" + response.data[i]["uid"] + " data-UserRole=" + response.data[i]["userRole"] + " class='EditRoleCLS'>" + RoleIcon + "</a></td>" +
                            "<td class='datatable-cell'><a data-UserStatusId=" + response.data[i]["uid"] + " data-UserStatus=" + response.data[i]["isActive"] + " class='EditStatusCLS'>" + StatusIcon + "</a></td>" +
                            //"<td class='datatable-cell'><a data-UserIdEdit=" + response.data[i]["uid"] + " class='EditRecord' data-toggle='modal' data-target='#EditUserRecord'><i class='fa fa-2x fa-edit'></i></a></td>" +
                            "<td class='text-center'><a data-UserIdEdit=" + response.data[i]["uid"] + " class='EditRecord' data-toggle='modal' data-target='#EditUserRecord'><i class='fa fa-2x fa-edit'></i></a></td > " +
                            "</tr>";



                        $("#tbl1 tbody").append(tr_str);
                    }
                }
            }
        },

        error: function () {
            alert("UnExpected error occured sorry for inconvinience!!!");
        }
    });
}

function UpdateUserStatus(Id, Status) {
    var obj = new Object();
    obj.UID = Id;
    obj.isActive = Status;
    $.ajax({
        type: 'POST',
        url: "/UserManagement/UpdateUserStatus",
        //data: '{ UID:"' + Id + '", IsActive:"' + Status + '"}',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Status Updated");
            UserDataTableFill("", "");

        },
        error: function (jqXHR, textStatus, err) {
            alert('text status ' + textStatus + ', err ' + err)
        }
    });

    return true;
}

function UpdateRecord() {

    var user = new Object();
    user.UID = parseInt($("#BtnUpdateRecord").attr('EditUserId'));
    user.FirstName = $("#TxtFName").val().trim();
    user.LastName = $("#TxtLName").val().trim();
    user.Email = $("#TxtEmailId").val().trim();
    user.UserRole = $("#DDL_Role").val().trim();

    $.ajax({
        type: "POST",
        url: "/UserManagement/UpdateRecord",
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("Record Updated Successfully..!!");
            $("input").val('');
            UserDataTableFill("", "");
            $("#EditUserRecord .close").click();
        },
        error: function () {
            alert("Unexpected Error Sorry For The Inconvinience..!!");
        }
    });
}