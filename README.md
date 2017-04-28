# Flood Map

Projeto de mapeamento de enchentes

## Front
Gauge de teste: 
- [/front/Gauge.html](https://vhsoaresr.github.io/FloodMap/front/Gauge.html)


Para realizar teste de conexão de MQTT:
```
mosq = new Mosquitto();
var urlBroker = "wss://iot.eclipse.org/ws";
mosq.connect(urlBroker);
mosq.publish("MQTTENVIALIMITE", "48", 0);
```
