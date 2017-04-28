(function () {
    window.Main = {};
    Main.Page = (function () {
        var mosq = null;
        var urlBroker = "ws://iot.eclipse.org/ws";

        function Page() {
            var _this = this;

            var config1 = liquidFillGaugeDefaultSettings();
            config1.circleFillGap = 0.05;
            config1.circleThickness = 0.1;
            config1.textVertPosition = 0.25;
            config1.waveAnimateTime = 3500;
            var gauge1 = loadLiquidFillGauge("fillgauge1", 0, config1);

            mosq = new Mosquitto();

            _this.connect();

            mosq.ondisconnect = function (rc) {
                console.info("A conexão com o broker foi perdida");
                mosq.connect(urlBroker);
            };
            mosq.onmessage = function (topic, payload, qos) {
                if (topic == "MQTTENVIALIMITE")
                    gauge1.update(payload);
            };
        }
        Page.prototype.connect = function () {
            mosq.connect(urlBroker);
            console.info("Conectado ao " + urlBroker);
            var topic = "MQTTENVIALIMITE"
            mosq.subscribe(topic, 0);
            console.log("Inscrito no topico " + topic);
        };

        return Page;
    })();
    $(function () {
        return Main.controller = new Main.Page;
    });
}).call(this);