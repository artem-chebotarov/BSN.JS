
document.getElementById("confirm").onclick = async function() {
    let r = await $gn.bsn.confirm({
title: "File manager",
message: "Are you sure you want to delete this file?",
ok_text: "Yes",
no_text: "No",
app: "File Manager 0.1.5"
    });
$gn.bsn.toast({
title: "File manager",
message: r ? "File deleted successfully" : "Error! File was not deleted"
});
}
document.getElementById("prompt").onclick = async function() {
    let value = await $gn.bsn.prompt({
title: "Authentication",
message: "PIN",
ok_text: "Connect",
no_text: "Cancel",
app: "Login center"
    });
    $gn.bsn.toast({
title: "Login center",
message: value ? "Result: "+value : value
    });
}
document.getElementById("toast").onclick = function() {
    $gn.bsn.toast({
        title: "Bank system",
        message: "+5500 coins"
    })
}
document.getElementById("alert").onclick = function() {
    $gn.bsn.alert({
        title: "System",
        message: "System is ready to install",
        ok_text: "OK",
        app: "System center"
    })
}
document.getElementById("html").onclick = function() {
    let data = document.body.innerHTML;
    let t = document.getElementById("text");
    t.value = data;
    t.focus();
}

