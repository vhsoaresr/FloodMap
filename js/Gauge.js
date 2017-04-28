(function() {
    window.Main = {};
    Main.Page = (function() {
        var mosq = null;

        function Page() {
            var _this = this;

            var config1 = liquidFillGaugeDefaultSettings();
            config1.circleFillGap = 0.05;
            config1.circleThickness = 0.1;
            config1.textVertPosition = 0.25;
            config1.waveAnimateTime = 3500;
            var gauge1 = loadLiquidFillGauge("fillgauge1", 55, config1);
            gauge1.update(5);

            mosq = new Mosquitto();

            return _this.connect();

            $('#subscribe-button').click(function() {
                return _this.subscribe();
            });
            $('#unsubscribe-button').click(function() {
                return _this.unsubscribe();
            });


            $('#liga-output').click(function() {
                var payload = "L";
                var TopicPublish = $('#pub-topic-text')[0].value;
                mosq.publish(TopicPublish, payload, 0);

                var TopicPublish = $('#pub-topic-text')[0].value;
                var text1 = $('#text1')[0].value;
                mosq.publish(TopicPublish, text1, 0);
            });


            $('#desliga-output').click(function() {
                var payload = "D";
                var TopicPublish = $('#pub-topic-text')[0].value;
                mosq.publish(TopicPublish, payload, 0);
            });

            mosq.onconnect = function(rc) {
                var p = document.createElement("p");
                var topic = $('#pub-subscribe-text')[0].value;
                p.innerHTML = "Conectado ao Broker!";
                $("#debug").append(p);
                mosq.subscribe(topic, 0);

            };
            mosq.ondisconnect = function(rc) {
                var p = document.createElement("p");
                var url = "ws://iot.eclipse.org/ws";

                p.innerHTML = "A conexão com o broker foi perdida";
                $("#debug").append(p);
                mosq.connect(url);
            };
            mosq.onmessage = function(topic, payload, qos) {
                var p = document.createElement("p");
                var acao = payload[0];

                //escreve o estado do output conforme informação recebida
                if (acao == 'L')
                    p.innerHTML = "<center><img src='ligado.png'></center>"
                else
                    p.innerHTML = "<center><img src='desligado.png'></center>"

                $("#status_io").html(p);

                console.debug("payload " + payload);

                for (var i = 0; i < payload.length; i++) {
                    console.debug("for " + payload[i].charCodeAt(0));
                }

                console.debug("direto " + payload.charCodeAt(0));
            };
        }
        Page.prototype.connect = function() {
            var url = "ws://iot.eclipse.org/ws";
            mosq.connect(url);
            var topic = "MQTTRECEBEFLOOD"
            mosq.subscribe(topic, 0);
        };

        return Page;
    })();
    $(function() {
        return Main.controller = new Main.Page;
    });
}).call(this);