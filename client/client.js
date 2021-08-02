$(() => {
    let socket = io('http://localhost:3000');

    socket.on('mensagemInicialClient', (dataFromServer) => {
        $("#contentMessage").html(dataFromServer.mensagem);
        $("#modalConnection").modal("show");
    });

    $("#btnEnviarMsg").click(() => {
        socket.emit('mensagemParaOServidor', { client_id: "ID", mensagem: $("#txtMsg").val() });
        $("#txtMsg").val("");
    })
});