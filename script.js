var guestList = [
    {
        "id": "ZG8FSTT",
        "name": "Sample Guest 1",
        "nick": "ATTENDEE",
        "tier": "VIP",
    },
    {
        "id": "G41456J",
        "name": "Sample Guest 2",
        "nick": "ATTENDEE",
        "tier": "VIP",
    },
    {
        "id": "3BT57FT",
        "name": "Sample Guest 3",
        "nick": "ATTENDEE",
        "tier": "VIP",
    },
    {
        "id": "0WSTV4Q",
        "name": "Sample Guest 4",
        "nick": "ATTENDEE",
        "tier": "VIP",
    },
    {
        "id": "GBY7HVJ",
        "name": "Sample Guest 5",
        "nick": "ATTENDEE",
        "tier": "VIP",
    },
    {
        "id": "2337977",
        "name": "Sample Guest",
        "nick": "ATTENDEE",
        "tier": "REG",
    },
    {
        "id": "0000000",
        "name": "",
        "nick": "Please scan QR code.",
        "tier": "",
    }
];
$(document).ready(function(){
    $("#resultText").text("Text is: ");
    function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    send(decodedText);
    }

    function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    }

    var input = document.getElementById("searchinput");

    document.getElementById("sendbutton").addEventListener ("click", sendInput);

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendInput();
        }
    });

    function sendInput(){
        var inputBuffer = input.value;
        send(inputBuffer);
    }

    function send(searchterm){
        if(searchterm != ""){
            index = guestList.findIndex(x => x.id.toString() === searchterm.toString());
            input.value = null;
            if(index == -1){
                $("#id").html(null);
              $("#nick").html(null);
              $("#name").html(null);
              $("#tier").html(null);
              $("#table").html(null);
                $("#error").text("No guest found!");
            }
            else{
                $("#id").text("ID: " + guestList[index].id);
                $("#nick").text(guestList[index].nick);
            $("#name").text(guestList[index].name);
            $("#tier").text(guestList[index].tier);
            //$("#table").text("Table " + guestList[index].table);
            $("#error").text("Thank you for using ticget!");
            if(index == 6){
                $.get("http://localhost:3000/print", (data, status) => {
                    console.log(data);
                  });
            }
            }
        }             
    }

    

    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 20, qrbox: {width: 250, height: 250} },
        /* verbose= */ false);
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});