var connToken = "90938165|-31949273025261292|90955211";
var dbName = "project";
var relName = "project-rel";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var jpdbBaseURL = "http://api.login2explore.com:5577";

$("#ProjectID").focus();


function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getProjectIdAsJsonObj() {
    var ProjectID = $("#ProjectID").val();
    var jsonStr = {
        ID: ProjectID
    };
    return JSON.stringify(jsonStr);
}







function resetForm() {
    $("#ProjectID").val("");
    $("#ProjectName").val("");
    $("#Assignedto").val("");
    $("#AssignmentDate").val("");
    $("#Deadline").val("");
    $("#ProjectID").prop("disabled", false);
    $("#save").prop("disabled", false);
    $("#update").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#ProjectID").focus();

}

function SaveProject() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, dbName, relName);
    alert(putRequest);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#ProjectID").focus();
}



function validateData() {
    var ProjectID, ProjectName, Assignedto, AssignmentDate, Deadline;
    ProjectID = $("#ProjectID").val();
    ProjectName = $("#ProjectName").val();
    Assignedto = $("#Assignedto").val();
    AssignmentDate = $("#AssignmentDate").val();
    Deadline = $("#Deadline").val();

    if (ProjectID === "") {
        alert("Please enter the Project ID");
        $("#ProjectID").focus();
        return "";
    }


    if (ProjectName === "") {
        alert("Please enter the Project Name");
        $("#ProjectName").focus();
        return "";
    }


    if (Assignedto === "") {
        alert("Enter the name of the person to which the project is assigned");
        $("#Assignedto").focus();
        return "";
    }


    if (AssignmentDate === "") {
        alert("Enter the Assignment Date");
        $("#AssignmentDate").focus();
        return "";
    }


    if (Deadline === "") {
        alert("Enter the Deadline");
        $("#Deadline").focus();
        return "";
    }


    var jsonStrObj = {

        ID: ProjectID,
        name: ProjectName,
        Assigned: Assignedto,
        assigndate: AssignmentDate,
        deadline: Deadline

    };

    return JSON.stringify(jsonStrObj);
}


function UpdateProject() {
    $("#update").prop("disabled", false);
    jsonUpd = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonUpd, dbName, relName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resultObj);
    resetForm();
    $("#ProjectID").focus();

}

function getProject() {
    var ProjectIdjsonObj = getProjectIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, dbName, relName, ProjectIDJsonObj);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resultObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#ProjectName").focus();
    } else if (resultObj.status === 200) {
        $("#ProjectID").prop("disabled", true);
        fillData(resultObj);
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#ProjectName").focus();
    }
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;2
    $("#ProjectName").val(record.name);
    $("#Assignedto").val(record.Assigned);
    $("#AssignmentDate").val(record.assigndate);
    $("#Deadline").val(record.deadline);

}





        